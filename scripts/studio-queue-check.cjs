// scripts/studio-queue-check.cjs — the Studio's sending, checked in Chromium against a fake Google Drive (22 October 2026).
//
//   node scripts/studio-queue-check.cjs [out dir]
//
// The Studio (public/studio/index.html) keeps each take on the phone and sends the kept takes to Drive one at a
// time behind him. This films takes with Chromium's fake camera and sends them to a fake Drive that is slow, drops
// the connection mid-take, loses a session and is reloaded part-way through, then checks that every take arrived
// byte for byte, in order, numbered right, and that nothing is left on the phone. Since 26 October it also starts the
// next lesson's take while the last is still sending (that take's seconds stay on the phone until Drive holds all of
// it), has Drive refuse one take over and over (it goes behind the others), brings back a take kept before that day
// and one whose seconds are gone (named, to film again), and renews a sign-in with under twenty minutes left at Send.
// It serves the page itself and
// pastes made-up lessons, so it needs no scripts and no Google account. Needs Chromium and playwright-core (the
// paths below are the cloud container's; PLAYWRIGHT_CORE and CHROMIUM override them).
const { chromium } = require(process.env.PLAYWRIGHT_CORE || '/opt/node-tools/node_modules/playwright-core');
const fs = require('fs');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const OUT = process.argv[2] || fs.mkdtempSync(path.join(require('os').tmpdir(), 'studio-queue-'));
fs.mkdirSync(OUT, { recursive: true });
// Made-up lessons in the teleprompter's shape: five seminars, eight short lessons each.
const NAMES = { sales: 'S', time: 'T', communication: 'C', leadership: 'L', quitting: 'Q' };
const SCRIPTS = JSON.stringify(Object.fromEntries(Object.entries(NAMES).map(([k, p]) => [k, Array.from({ length: 8 }, (_, i) => ({
  id: `${p}1.${i}`, title: `Lesson ${i}`, clips: [{ said: ['A short line to read out loud, then another short line after it.'] }],
}))])));
const PAGE = fs.readFileSync(path.join(__dirname, '..', 'public', 'studio', 'index.html'), 'utf8')
  .replace('const CHUNK = 8 * 1024 * 1024;', 'const CHUNK = 64 * 1024;'); // small pieces, so a short take has several

const drive = { folders: [], files: [], sessions: {}, seq: 0, texts: [], log: [], errors: [], dropAt: new Set(), expire: new Set(), delay: 120, paused: false, full: false,
  failNext: false, failing: new Set() };
// Google's reply when the Drive has no room left.
const FULL = { error: { code: 403, message: "The user's Drive storage quota has been exceeded.", errors: [{ domain: 'usageLimits', reason: 'storageQuotaExceeded' }] } };
const cors = { 'access-control-allow-origin': '*', 'access-control-expose-headers': 'Location, Range', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST, PUT, PATCH, OPTIONS' };
const json = (r, body, status = 200, extra = {}) => r.fulfill({ status, headers: { ...cors, 'content-type': 'application/json', ...extra }, body: JSON.stringify(body) });
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function googleApi(route) {
  const req = route.request();
  const url = new URL(req.url());
  if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
  const who = (req.headers().authorization || '').replace(/^Bearer /, '');
  const mine = (f) => f.owner === who;
  if (url.pathname === '/drive/v3/files' && req.method() === 'GET') {
    const q = url.searchParams.get('q');
    const m = /^name='(.+?)' and mimeType='application\/vnd.google-apps.folder' and trashed=false(?: and '(.+?)' in parents)?$/.exec(q);
    if (m) return json(route, { files: drive.folders.filter((f) => mine(f) && f.name === m[1] && (f.parent || null) === (m[2] || null)).map((f) => ({ id: f.id })) });
    const p = /^'(.+?)' in parents and trashed=false$/.exec(q);
    if (p) return json(route, { files: drive.files.filter((f) => mine(f) && f.parent === p[1]).map((f) => ({ id: f.id, name: f.name, appProperties: f.appProperties })) });
    // The Studio's log, looked for by name in the top folder.
    const named = /^name='(.+?)' and '(.+?)' in parents and trashed=false$/.exec(q);
    if (named) return json(route, { files: drive.texts.filter((f) => f.name === named[1] && f.parent === named[2]).map((f) => ({ id: f.id })) });
    return json(route, { error: q }, 400);
  }
  if (url.pathname === '/drive/v3/files' && req.method() === 'POST') {
    const body = JSON.parse(req.postData());
    const f = { id: `folder${++drive.seq}`, name: body.name, parent: (body.parents || [])[0] || null, owner: who };
    drive.folders.push(f);
    return json(route, { id: f.id });
  }
  if (url.pathname.startsWith('/drive/v3/files/')) {
    const f = drive.folders.find((x) => x.id === url.pathname.split('/').pop());
    return f && mine(f) ? json(route, { id: f.id, trashed: false }) : json(route, { error: { code: 404, message: 'File not found.' } }, 404);
  }
  // The Studio's log: made once (a multipart upload), then written over (PATCH).
  if (url.pathname === '/upload/drive/v3/files' && req.method() === 'POST' && url.searchParams.get('uploadType') === 'multipart') {
    const body = req.postData() || '';
    const meta = JSON.parse(/application\/json[^\r\n]*\r\n\r\n([\s\S]*?)\r\n--/.exec(body)[1]);
    const text = /text\/plain[^\r\n]*\r\n\r\n([\s\S]*)\r\n--[^\r\n]*--$/.exec(body)[1];
    const f = { id: `text${drive.texts.length + 1}`, name: meta.name, parent: (meta.parents || [])[0], text, writes: 1 };
    drive.texts.push(f);
    return json(route, { id: f.id });
  }
  if (url.pathname.startsWith('/upload/drive/v3/files/') && req.method() === 'PATCH') {
    const f = drive.texts.find((x) => x.id === url.pathname.split('/').pop());
    if (!f) return json(route, { error: { code: 404, message: 'File not found.' } }, 404);
    f.text = req.postData() || ''; f.writes++;
    return json(route, { id: f.id });
  }
  if (url.pathname === '/upload/drive/v3/files' && req.method() === 'POST') {
    if (!/^tok2?$/.test(who)) return json(route, { error: 'auth' }, 401);
    if (drive.full) { drive.log.push('full at a new session'); return json(route, FULL, 403); }
    const meta = JSON.parse(req.postData());
    const into = drive.folders.find((x) => x.id === meta.parents[0]);
    if (!into || !mine(into)) { drive.log.push(`no such folder for ${who}`); return json(route, { error: { code: 404, message: 'File not found.' } }, 404); }
    const sid = `s${++drive.seq}`;
    drive.sessions[sid] = { meta, owner: who, size: Number(req.headers()['x-upload-content-length']), got: [], received: 0, puts: 0 };
    if (drive.failNext) { drive.failNext = false; drive.failing.add(sid); }
    drive.log.push(`session ${sid} ${meta.name}`);
    return route.fulfill({ status: 200, headers: { ...cors, location: `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&upload_id=${sid}` }, body: '' });
  }
  if (url.pathname === '/upload/drive/v3/files' && req.method() === 'PUT') {
    const sid = url.searchParams.get('upload_id');
    const s = drive.sessions[sid];
    if (!s || drive.expire.has(sid)) { drive.log.push(`gone ${sid}`); return json(route, { error: 'gone' }, 404); }
    while (drive.paused) await wait(50);
    if (drive.failing.has(sid)) { drive.log.push(`503 ${sid}`); return json(route, { error: { code: 503, message: 'Backend Error' } }, 503); }
    const range = req.headers()['content-range'];
    const status = /^bytes \*\/(\d+)$/.exec(range);
    const has = () => (s.received ? { range: `bytes=0-${s.received - 1}` } : {});
    if (status) {
      drive.log.push(`ask ${sid} at ${s.received}`);
      if (s.file) return json(route, s.file, 200);
      return route.fulfill({ status: 308, headers: { ...cors, ...has() }, body: '' });
    }
    if (drive.full) { drive.log.push(`full at ${sid}`); return json(route, FULL, 403); }
    const m = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(range);
    const body = req.postDataBuffer() || Buffer.alloc(0);
    s.puts++;
    const key = `${sid}#${s.puts}`;
    await wait(drive.delay);
    if (drive.dropAt.has(key)) { drive.dropAt.delete(key); drive.log.push(`drop ${key}`); return route.abort('connectionreset'); }
    const from = Number(m[1]);
    if (from !== s.received) { drive.errors.push(`${sid}: piece from ${from}, Drive had ${s.received}`); return route.fulfill({ status: 308, headers: { ...cors, ...has() }, body: '' }); }
    if (body.length !== Number(m[2]) - from + 1) drive.errors.push(`${sid}: piece of ${body.length} said ${Number(m[2]) - from + 1}`);
    s.got.push(body); s.received += body.length;
    if (s.received >= s.size) {
      const data = Buffer.concat(s.got);
      const f = { id: `file${++drive.seq}`, name: s.meta.name, parent: s.meta.parents[0], owner: s.owner, appProperties: s.meta.appProperties, size: data.length, sha: crypto.createHash('sha256').update(data).digest('hex') };
      drive.files.push(f); s.file = { id: f.id, name: f.name };
      drive.log.push(`done ${sid} ${f.name} ${f.size}`);
      return json(route, s.file, 200);
    }
    return route.fulfill({ status: 308, headers: { ...cors, ...has() }, body: '' });
  }
  return json(route, { error: 'unknown' }, 404);
}

(async () => {
  const server = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(PAGE); }).listen(0, '127.0.0.1');
  await new Promise((done) => server.once('listening', done));
  const URL_ = `http://127.0.0.1:${server.address().port}/studio/index.html`;
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
  const context = await browser.newContext({ viewport: { width: 932, height: 430 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await context.addInitScript(() => {
    Object.defineProperty(ScreenOrientation.prototype, 'angle', { get: () => 90, configurable: true });
    if (!localStorage.getItem('studio:clientId')) {
      localStorage.setItem('studio:clientId', JSON.stringify('test-client'));
      localStorage.setItem('studio:settings', JSON.stringify({ quality: 'hd', paced: true, countdown: 3, autostop: false }));
    }
    window.__signIn = 'yes';
    window.google = { accounts: { oauth2: { initTokenClient(cfg) {
      return { requestAccessToken(o) {
        (window.__prompts = window.__prompts || []).push((o && o.prompt) || '');
        setTimeout(() => (window.__signIn === 'yes' ? cfg.callback({ access_token: sessionStorage.getItem('test:account') || 'tok', expires_in: window.__expiresIn || 3600 }) : cfg.error_callback({ type: 'popup_closed' })), 20);
      } };
    } } } };
    // A fingerprint of each take as its review plays it, across reloads, so the test can check Drive got each one exactly.
    const url = URL.createObjectURL;
    URL.createObjectURL = function (v) {
      if (v instanceof Blob && /^video\//.test(v.type)) {
        v.arrayBuffer().then((b) => crypto.subtle.digest('SHA-256', b)).then((d) => {
          const all = JSON.parse(localStorage.getItem('test:kept') || '[]');
          all.push({ size: v.size, sha: [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, '0')).join('') });
          localStorage.setItem('test:kept', JSON.stringify(all));
        });
      }
      return url.call(URL, v);
    };
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  // The fake Drive's refusals on purpose (a session gone, a dropped piece, a full Drive, a 503) show in the console too.
  page.on('console', (m) => { if (m.type() === 'error' && !/ERR_CONNECTION_RESET|net::ERR_FAILED|status of 40[34]|status of 503/.test(m.text())) errors.push(m.text()); });
  await page.route('https://accounts.google.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/javascript', body: '' }));
  await page.route('https://www.googleapis.com/**', googleApi);
  await page.goto(URL_);
  await page.waitForSelector('#setup:not([hidden]), #home:not([hidden])');
  await page.evaluate((t) => { const box = document.getElementById('pasteBox'); const dt = new DataTransfer(); dt.setData('text/plain', t); box.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })); }, SCRIPTS);
  await page.waitForFunction(() => /lessons, on this phone/.test(document.getElementById('scriptsState').textContent));
  await page.click('#signIn');
  await page.waitForFunction(() => /Signed in/.test(document.getElementById('googleState').textContent));
  await page.click('#toLessons');
  await page.waitForSelector('#home:not([hidden])');
  // The scripts' check code, the same six letters the teleprompter page shows for these scripts, and when they were
  // pasted (26 October: after a reload the Studio had gone back to older scripts, and nothing on screen said so).
  const code = require('crypto').createHash('sha256').update(SCRIPTS).digest('hex').slice(0, 6).toUpperCase();
  await page.waitForFunction((c) => document.getElementById('scriptsLine').textContent.includes(`check code ${c}, pasted`), code);
  if (!(await page.textContent('#scriptsState')).includes(`Check code ${code}`)) throw new Error('the setup page does not show the check code');

  const report = { steps: [] };
  const step = (name, data) => { report.steps.push({ name, ...data }); console.log(name, JSON.stringify(data)); };
  async function film(nth, seconds) {
    await page.click(`.lesson >> nth=${nth}`);
    await page.waitForSelector('#camera:not([hidden])');
    await page.click('#rec');
    await page.waitForFunction(() => document.getElementById('rec').classList.contains('on'), null, { timeout: 15000 });
    await page.waitForTimeout(seconds * 1000);
    await page.click('#rec');
    await page.waitForSelector('#review:not([hidden])', { timeout: 15000 });
    return page.$eval('#reviewTitle', (e) => e.textContent);
  }
  async function sendAndTime() {
    const t0 = Date.now();
    await page.click('#send');
    // Send opens the next lesson's camera (the last lesson of a seminar goes home): back to the lessons from there.
    await page.waitForSelector('#camera:not([hidden]), #home:not([hidden])', { timeout: 10000 });
    const ms = Date.now() - t0;
    if (await page.isVisible('#camera')) await page.click('#camBack');
    await page.waitForSelector('#home:not([hidden])', { timeout: 10000 });
    return ms;
  }
  const card = () => page.$eval('#sending', (e) => (e.hidden ? '(hidden)' : e.innerText.replace(/\s+/g, ' ').trim()));
  const driveLine = () => page.$eval('#driveLine', (e) => (e.hidden ? '(hidden)' : `${e.textContent}${e.classList.contains('bad') ? ' [red]' : e.classList.contains('ok') ? ' [green]' : ''}`));
  const allSent = (timeout = 120000) => page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout });
  // Each take waiting in the queue, and how many of its seconds are on the phone.
  const queued = () => page.evaluate(() => new Promise((resolve) => {
    const r = indexedDB.open('studio');
    r.onsuccess = () => {
      const db = r.result;
      const t = db.transaction(['queue', 'live']);
      const recs = t.objectStore('queue').getAll();
      const keys = t.objectStore('live').getAllKeys();
      t.oncomplete = () => {
        const ks = keys.result || [];
        resolve((recs.result || []).map((x) => ({ lesson: x.lesson, parts: x.parts, have: x.liveKey ? ks.filter((k) => k[0] === x.liveKey).length : -1 })));
        db.close();
      };
    };
  }));

  // 1. Two lessons back to back while the first is still sending; the second take of a lesson is take 2.
  drive.delay = 300;
  const t1 = await film(1, 4);
  const back1 = await sendAndTime();
  const during = await card();
  await page.screenshot({ path: path.join(OUT, 'sending-home.png') });
  const t2 = await film(2, 3);
  const back2 = await sendAndTime();
  const t3 = await film(2, 3);
  const back3 = await sendAndTime();
  const listed = await page.$$eval('.lesson', (els) => els.slice(0, 4).map((e) => e.innerText.replace(/\s+/g, ' ')));
  step('three takes kept', { t1, t2, t3, backMs: [back1, back2, back3], during, listed });
  await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 120000 });
  step('all sent', { card: await card(), files: drive.files.map((f) => `${f.name} ${f.size} ${JSON.stringify(f.appProperties)}`) });
  await page.screenshot({ path: path.join(OUT, 'sent-home.png') });

  // 1b. The next lesson's take starts while the last is still sending (26 October: when the phone's second copy of a
  // take failed, starting the next one threw that take's seconds away, and five takes never reached Drive). Drive is
  // held so the first take is still waiting: its seconds must all be on the phone while the next records, and both go.
  const beforeB = drive.files.length;
  await film(3, 4);
  drive.paused = true;
  await page.click('#send');
  await page.waitForSelector('#camera:not([hidden])', { timeout: 10000 });
  await page.click('#rec');
  await page.waitForFunction(() => document.getElementById('rec').classList.contains('on'), null, { timeout: 15000 });
  await page.waitForTimeout(3000);
  const whileB = await queued();
  const lineB = await driveLine();
  await page.screenshot({ path: path.join(OUT, 'drive-line-recording.png') });
  await page.click('#rec');
  await page.waitForSelector('#review:not([hidden])', { timeout: 15000 });
  drive.paused = false;
  await sendAndTime();
  await allSent(180000);
  step('next take while sending', { whileB, lineB, files: drive.files.length - beforeB, lineAfter: await driveLine(), left: await queued() });

  // 1c. A take Drive keeps refusing (503) goes behind the others, so it never holds them up (26 October: one take stuck
  // at 0% kept five waiting behind it), and goes once Drive takes it.
  const beforeC = drive.files.length;
  drive.failNext = true;
  await film(5, 3);
  await sendAndTime();
  await film(6, 3);
  await sendAndTime();
  for (let i = 0; i < 600 && !drive.files.some((f) => f.appProperties.lesson === 'S1.6'); i++) await wait(100);
  const passed = drive.files.some((f) => f.appProperties.lesson === 'S1.6') && !drive.files.some((f) => f.appProperties.lesson === 'S1.5');
  const card503 = await card();
  drive.failing.clear();
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await allSent();
  step('a refused take goes behind', { passed, card503, files: drive.files.length - beforeC, order: drive.log.filter((l) => /^done/.test(l)).slice(-2), refused: drive.log.filter((l) => /^503/.test(l)).length });

  // 2. The connection drops in the middle of a take: it picks up where Drive got to.
  const before = drive.files.length;
  await film(3, 4);
  const sid2 = `s${drive.seq + 3}`; // the folder lookups are cached, so the next session is the next number
  for (let i = 3; i <= 4; i++) drive.dropAt.add(`s${drive.seq + 1}#${i}`);
  await sendAndTime();
  await page.waitForFunction((n) => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 120000 });
  step('dropped twice, then sent', { files: drive.files.length - before, log: drive.log.filter((l) => /drop|ask/.test(l)).slice(-6), sid2 });

  // 2b. After the update: a take kept the old way (a whole copy, before 26 October) still goes, and a take whose
  // seconds are gone from the phone is named, to film again. Until Drive is read, the seminar says what waits on the
  // phone, never "filmed" (26 October: "6 of 80 filmed" with 58 lessons in Drive).
  await page.evaluate(async () => {
    const bytes = new Uint8Array(300 * 1024);
    for (let i = 0; i < bytes.length; i += 65536) crypto.getRandomValues(bytes.subarray(i, Math.min(bytes.length, i + 65536)));
    const blob = new Blob([bytes], { type: 'video/mp4' });
    const d = await crypto.subtle.digest('SHA-256', await blob.arrayBuffer());
    const all = JSON.parse(localStorage.getItem('test:kept') || '[]');
    all.push({ size: blob.size, sha: [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, '0')).join('') });
    localStorage.setItem('test:kept', JSON.stringify(all));
    const db = await new Promise((res) => { const r = indexedDB.open('studio'); r.onsuccess = () => res(r.result); });
    const now = Date.now();
    const rec = { key: 'old-1', made: now - 60000, sem: 'sales', lesson: 'S1.7', title: 'Lesson 7', n: 1, type: 'video/mp4', size: blob.size, a: 0.5, b: 2.5, duration: 3,
      recorded: new Date(now - 60000).toISOString(), session: null, sent: 0, rewinds: [] };
    const gone = { ...rec, key: 'gone-1', made: now - 30000, lesson: 'S1.6', title: 'Lesson 6', liveKey: 'no-such-take', parts: 3, size: 123456 };
    await new Promise((res, rej) => {
      const t = db.transaction(['queue', 'blobs'], 'readwrite');
      t.objectStore('blobs').put(blob, rec.key); t.objectStore('queue').put(rec, rec.key); t.objectStore('queue').put(gone, gone.key);
      t.oncomplete = res; t.onerror = rej;
    });
    db.close();
  });
  await page.reload();
  await page.waitForSelector('#home:not([hidden]), #setup:not([hidden])');
  if (await page.isVisible('#setup')) await page.click('#toLessons');
  await page.waitForFunction(() => !document.getElementById('sendingRow').hidden, null, { timeout: 20000 });
  const oldCard = await card();
  const semBefore = await page.$eval('.sem', (e) => e.innerText.replace(/\s+/g, ' ').trim());
  const lostLine = await driveLine();
  await page.click('#sendingSignIn');
  await allSent();
  await page.waitForFunction(() => /filmed/.test(document.querySelector('.sem').innerText), null, { timeout: 10000 });
  const semAfter = await page.$eval('.sem', (e) => e.innerText.replace(/\s+/g, ' ').trim());
  step('old take and a lost one', { oldCard, semBefore, lostLine, semAfter, cardAfter: await card(), landed: drive.files.some((f) => f.appProperties.lesson === 'S1.7' && f.size === 300 * 1024) });

  // 3. A reload in the middle of a take: the take is still on the phone and carries on from where Drive got to.
  drive.delay = 400;
  await film(4, 5);
  await sendAndTime();
  try { await page.waitForFunction(() => /Sending .*\b([2-9]\d)%/.test(document.getElementById('sendingState').textContent), null, { timeout: 60000, polling: 50 }); }
  catch (e) { console.log('card:', await card(), 'log:', drive.log.slice(-8)); throw e; }
  const atReload = await card();
  drive.delay = 120;
  await page.reload();
  await page.waitForSelector('#home:not([hidden]), #setup:not([hidden])');
  if (await page.isVisible('#setup')) await page.click('#toLessons');
  const afterReload = await card();
  await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 120000 });
  step('reloaded mid-take', { atReload, afterReload, log: drive.log.slice(-4) });


  // 4. Signed out, and the session gone (a week old): the take waits for Google, then goes with a new session.
  await film(5, 3);
  await page.evaluate(() => { window.__signIn = 'no'; });
  // The page reloaded, so its sign-in is gone: Send asks, the window is closed, the take is kept all the same.
  await sendAndTime();
  await page.waitForFunction(() => !document.getElementById('sendingRow').hidden, null, { timeout: 20000 });
  const waiting = await card();
  await page.screenshot({ path: path.join(OUT, 'waiting-google.png') });
  await page.evaluate(() => { window.__signIn = 'yes'; });
  await page.click('#sendingSignIn');
  await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 120000 });
  step('waited for Google', { waiting, card: await card() });

  // 4b. A session gone (a week old): a new one, and the take goes.
  await film(6, 3);
  drive.paused = true;
  await sendAndTime();
  await page.waitForFunction(() => true);
  for (let i = 0; i < 100 && !drive.log.some((l) => l.startsWith('session') && l.includes('take') && !drive.files.some((f) => l.endsWith(f.name))); i++) await wait(50);
  const gone = drive.log.filter((l) => l.startsWith('session')).pop().split(' ')[1];
  drive.expire.add(gone);
  drive.paused = false;
  await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 120000 });
  step('session gone, sent again', { gone, log: drive.log.slice(-4) });

  // 4c. His Drive is full: the card says so, the take waits on the phone, and goes once there is room.
  drive.full = true;
  await film(7, 3);
  await sendAndTime();
  await page.waitForFunction(() => /Google Drive is full/.test(document.getElementById('sendingState').textContent), null, { timeout: 30000, polling: 50 });
  const fullCard = await card();
  await page.screenshot({ path: path.join(OUT, 'drive-full.png') });
  drive.full = false;
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 120000 });
  step('drive full, then room', { fullCard, log: drive.log.filter((l) => /full|done/.test(l)).slice(-3) });

  // 4d. Another Google account (his own, with room): the chooser opens, the take goes to a folder in the new Drive.
  await page.evaluate(() => sessionStorage.setItem('test:account', 'tok2'));
  await page.click('#toSetup');
  await page.click('#switchAccount');
  await page.waitForFunction(() => /Signed in/.test(document.getElementById('googleState').textContent), null, { timeout: 10000 });
  const prompt = await page.evaluate(() => window.__prompts[window.__prompts.length - 1]);
  await page.click('#toLessons');
  await film(1, 3);
  await sendAndTime();
  await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 120000 });
  const theirs = drive.files.filter((f) => f.owner === 'tok2');
  const newRoot = drive.folders.filter((f) => f.owner === 'tok2').map((f) => f.name);
  step('another account', { prompt, newRoot, theirs: theirs.map((f) => f.name), log: drive.log.slice(-3) });

  // 4e. A sign-in with under twenty minutes left is renewed at Send, from that tap (a sign-in lasts an hour, and a take
  // sent after it ran out waited for Google out of his sight).
  await page.evaluate(() => { window.__expiresIn = 900; });
  await page.click('#toSetup');
  await page.click('#signIn');
  await page.waitForFunction(() => /Signed in/.test(document.getElementById('googleState').textContent), null, { timeout: 10000 });
  await page.click('#toLessons');
  await page.evaluate(() => { window.__expiresIn = 3600; });
  const asked0 = await page.evaluate(() => window.__prompts.length);
  await film(2, 3);
  await sendAndTime();
  await allSent();
  const asked1 = await page.evaluate(() => window.__prompts.length);
  step('sign-in renewed at Send', { asked: asked1 - asked0 });

  // 5. Every take Drive holds is byte for byte the take the phone kept, and nothing is left on the phone.
  await wait(500);
  const kept = await page.evaluate(() => JSON.parse(localStorage.getItem('test:kept') || '[]'));
  const left = await page.evaluate(() => new Promise((res) => { const r = indexedDB.open('studio'); r.onsuccess = () => { const t = r.result.transaction(['queue', 'blobs', 'live', 'kv']); const a = t.objectStore('queue').count(); const b = t.objectStore('blobs').count(); const c = t.objectStore('live').count(); const d = t.objectStore('kv').get('live'); t.oncomplete = () => res({ queue: a.result, blobs: b.result, live: c.result, reviewing: !!d.result }); }; }));
  const sameBytes = drive.files.every((f) => kept.some((k) => k.sha === f.sha && k.size === f.size));
  step('bytes', { driveFiles: drive.files.length, keptOnPhone: kept.length, sameBytes, leftOnPhone: left, serverErrors: drive.errors });
  // 6. The Studio's log in Drive (26 October, his ask: Claude reads it from his shared folder): what waits, what was
  // kept and sent and when, in the top folder of each account's Drive, with no sign-in token in it.
  await wait(12000);
  const logs = drive.texts.filter((f) => f.name === 'Studio log.txt');
  const last = logs[logs.length - 1] || { text: '' };
  fs.writeFileSync(path.join(OUT, 'studio-log.txt'), last.text);
  step('the log', { files: logs.length, writes: logs.map((f) => f.writes), parents: logs.map((f) => drive.folders.find((x) => x.id === f.parent)?.name),
    head: last.text.split('\n').slice(0, 3), lines: last.text.split('\n').filter((l) => / UTC  /.test(l)).length,
    kept: (last.text.match(/  Kept S1\.\d take \d+ \(/g) || []).length, inDrive: (last.text.match(/  In Drive: S01\.\d\d take \d+\.\w+ \(/g) || []).length,
    lost: /S1\.6 take \d+ is not on this phone any more: film it again/.test(last.text), opened: /Studio opened: /.test(last.text),
    refused: /S1\.5: Google Drive said 503\. Trying again\./.test(last.text), clean: !/Bearer|access_token|ya29/.test(drive.texts.map((f) => f.text).join('\n')) });
  report.pageErrors = errors;
  report.files = drive.files.map((f) => ({ name: f.name, size: f.size, lesson: f.appProperties.lesson, take: f.appProperties.take, trim: [f.appProperties.trimStart, f.appProperties.trimEnd] }));
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  console.log('page errors:', JSON.stringify(errors));
  console.log('server errors:', JSON.stringify(drive.errors));
  console.log('files:', JSON.stringify(report.files, null, 1));
  await browser.close();
  server.close();
  const st = (n) => report.steps.find((s) => s.name === n);
  const lost = st('old take and a lost one');
  const checks = {
    'the take sending kept all its seconds on the phone while the next recorded': st('next take while sending').whileB.some((x) => x.lesson === 'S1.3' && x.parts > 0 && x.have === x.parts),
    'the camera said it was sending, while recording': /^Drive ↑ S1\.3 \d+%/.test(st('next take while sending').lineB),
    'both reached Drive, the camera then said all sent': st('next take while sending').files === 2 && /Drive ✓ all sent \[green\]/.test(st('next take while sending').lineAfter),
    'a refused take let the next go past it, then went': st('a refused take goes behind').passed && st('a refused take goes behind').files === 2 && st('a refused take goes behind').refused > 0
      && /S01\.06/.test(st('a refused take goes behind').order[0]) && /S01\.05/.test(st('a refused take goes behind').order[1]),
    'a take kept before the update still went': lost.landed,
    'a take whose seconds are gone is named, on the card and the camera': /S1\.6 isn’t on this phone any more: film it again/.test(lost.oldCard) && /S1\.6 lost: film again \[red\]/.test(lost.lostLine),
    'before Drive is read the seminar says what waits on the phone, then the lessons filmed': /8 lessons · 1 on this phone/.test(lost.semBefore) && /\d+ of 8 filmed/.test(lost.semAfter),
    'a short sign-in renewed at Send': st('sign-in renewed at Send').asked === 1,
    'the log is in each account\'s top folder, says what was kept, sent, refused and lost, and holds no token': st('the log').files === 2
      && st('the log').parents.every((n) => n === 'Your Key seminars') && st('the log').kept >= 14 && st('the log').inDrive >= 14 && st('the log').lost
      && st('the log').opened && st('the log').refused && st('the log').clean && /^Your Key Studio, as the phone sees it\. Written /.test(st('the log').head[0])
      && /^Waiting on the phone: 0/.test(st('the log').head[1]),
    'nothing left on the phone': st('bytes').leftOnPhone.queue === 0 && st('bytes').leftOnPhone.blobs === 0 && st('bytes').leftOnPhone.live === 0 && !st('bytes').leftOnPhone.reviewing,
  };
  for (const [k, v] of Object.entries(checks)) console.log(`${v ? 'ok  ' : 'FAIL'} ${k}`);
  const ok = errors.length === 0 && drive.errors.every((e) => /Drive had/.test(e)) && st('bytes').sameBytes && Object.values(checks).every(Boolean)
    && report.files.length === 15
    && /select_account/.test(report.steps.find((s) => s.name === 'another account').prompt)
    && report.steps.find((s) => s.name === 'another account').theirs.length === 1
    && report.steps.find((s) => s.name === 'another account').newRoot.join() === 'Your Key seminars,Sales'
    && /Google Drive is full/.test(report.steps.find((s) => s.name === 'drive full, then room').fullCard);
  console.log(ok ? 'PASS: every take arrived byte for byte, nothing left on the phone.' : 'FAIL: see the report above.');
  process.exit(ok ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
