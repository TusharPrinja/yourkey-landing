// scripts/studio-queue-check.cjs — the Studio's sending, checked in Chromium against a fake Google Drive (22 October 2026).
//
//   node scripts/studio-queue-check.cjs [out dir]
//
// The Studio (public/studio/index.html) keeps each take on the phone and sends the kept takes to Drive one at a
// time behind him. This films takes with Chromium's fake camera and sends them to a fake Drive that is slow, drops
// the connection mid-take, loses a session and is reloaded part-way through, then checks that every take arrived
// byte for byte, in order, numbered right, and that nothing is left on the phone. It serves the page itself and
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

const drive = { folders: [], files: [], sessions: {}, seq: 0, log: [], errors: [], dropAt: new Set(), expire: new Set(), delay: 120, paused: false, full: false };
// Google's reply when the Drive has no room left.
const FULL = { error: { code: 403, message: "The user's Drive storage quota has been exceeded.", errors: [{ domain: 'usageLimits', reason: 'storageQuotaExceeded' }] } };
const cors = { 'access-control-allow-origin': '*', 'access-control-expose-headers': 'Location, Range', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST, PUT, OPTIONS' };
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
  if (url.pathname === '/upload/drive/v3/files' && req.method() === 'POST') {
    if (!/^tok2?$/.test(who)) return json(route, { error: 'auth' }, 401);
    if (drive.full) { drive.log.push('full at a new session'); return json(route, FULL, 403); }
    const meta = JSON.parse(req.postData());
    const into = drive.folders.find((x) => x.id === meta.parents[0]);
    if (!into || !mine(into)) { drive.log.push(`no such folder for ${who}`); return json(route, { error: { code: 404, message: 'File not found.' } }, 404); }
    const sid = `s${++drive.seq}`;
    drive.sessions[sid] = { meta, owner: who, size: Number(req.headers()['x-upload-content-length']), got: [], received: 0, puts: 0 };
    drive.log.push(`session ${sid} ${meta.name}`);
    return route.fulfill({ status: 200, headers: { ...cors, location: `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&upload_id=${sid}` }, body: '' });
  }
  if (url.pathname === '/upload/drive/v3/files' && req.method() === 'PUT') {
    const sid = url.searchParams.get('upload_id');
    const s = drive.sessions[sid];
    if (!s || drive.expire.has(sid)) { drive.log.push(`gone ${sid}`); return json(route, { error: 'gone' }, 404); }
    while (drive.paused) await wait(50);
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
        setTimeout(() => (window.__signIn === 'yes' ? cfg.callback({ access_token: sessionStorage.getItem('test:account') || 'tok', expires_in: 3600 }) : cfg.error_callback({ type: 'popup_closed' })), 20);
      } };
    } } } };
    // A fingerprint of each take the page keeps, across reloads, so the test can check Drive got each one exactly.
    const keep = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (v, k) {
      if (v instanceof Blob && this.name === 'blobs') {
        v.arrayBuffer().then((b) => crypto.subtle.digest('SHA-256', b)).then((d) => {
          const all = JSON.parse(localStorage.getItem('test:kept') || '[]');
          all.push({ size: v.size, sha: [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, '0')).join('') });
          localStorage.setItem('test:kept', JSON.stringify(all));
        });
      }
      return keep.call(this, v, k);
    };
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  // The fake Drive's refusals on purpose (a session gone, a dropped piece, a full Drive) show in the console too.
  page.on('console', (m) => { if (m.type() === 'error' && !/ERR_CONNECTION_RESET|net::ERR_FAILED|status of 40[34]/.test(m.text())) errors.push(m.text()); });
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
    await page.waitForSelector('#home:not([hidden])', { timeout: 10000 });
    return Date.now() - t0;
  }
  const card = () => page.$eval('#sending', (e) => (e.hidden ? '(hidden)' : e.innerText.replace(/\s+/g, ' ').trim()));

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

  // 2. The connection drops in the middle of a take: it picks up where Drive got to.
  const before = drive.files.length;
  await film(3, 4);
  const sid2 = `s${drive.seq + 3}`; // the folder lookups are cached, so the next session is the next number
  for (let i = 3; i <= 4; i++) drive.dropAt.add(`s${drive.seq + 1}#${i}`);
  await sendAndTime();
  await page.waitForFunction((n) => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 120000 });
  step('dropped twice, then sent', { files: drive.files.length - before, log: drive.log.filter((l) => /drop|ask/.test(l)).slice(-6), sid2 });

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

  // 5. Every take Drive holds is byte for byte the take the phone kept, and nothing is left on the phone.
  await wait(500);
  const kept = await page.evaluate(() => JSON.parse(localStorage.getItem('test:kept') || '[]'));
  const left = await page.evaluate(() => new Promise((res) => { const r = indexedDB.open('studio', 2); r.onsuccess = () => { const t = r.result.transaction(['queue', 'blobs']); const a = t.objectStore('queue').count(); const b = t.objectStore('blobs').count(); t.oncomplete = () => res({ queue: a.result, blobs: b.result }); }; }));
  const sameBytes = drive.files.every((f) => kept.some((k) => k.sha === f.sha && k.size === f.size));
  step('bytes', { driveFiles: drive.files.length, keptOnPhone: kept.length, sameBytes, leftOnPhone: left, serverErrors: drive.errors });
  report.pageErrors = errors;
  report.files = drive.files.map((f) => ({ name: f.name, size: f.size, lesson: f.appProperties.lesson, take: f.appProperties.take, trim: [f.appProperties.trimStart, f.appProperties.trimEnd] }));
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  console.log('page errors:', JSON.stringify(errors));
  console.log('server errors:', JSON.stringify(drive.errors));
  console.log('files:', JSON.stringify(report.files, null, 1));
  await browser.close();
  server.close();
  const ok = errors.length === 0 && drive.errors.every((e) => /Drive had/.test(e)) && report.steps.find((s) => s.name === 'bytes').sameBytes
    && report.steps.find((s) => s.name === 'bytes').leftOnPhone.queue === 0 && report.files.length === 9
    && /select_account/.test(report.steps.find((s) => s.name === 'another account').prompt)
    && report.steps.find((s) => s.name === 'another account').theirs.length === 1
    && report.steps.find((s) => s.name === 'another account').newRoot.join() === 'Your Key seminars,Sales'
    && /Google Drive is full/.test(report.steps.find((s) => s.name === 'drive full, then room').fullCard);
  console.log(ok ? 'PASS: every take arrived byte for byte, nothing left on the phone.' : 'FAIL: see the report above.');
  process.exit(ok ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
