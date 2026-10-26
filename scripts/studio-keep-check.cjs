// scripts/studio-keep-check.cjs — every take kept on the phone as it records, checked in Chromium (25 October 2026).
//
//   node scripts/studio-keep-check.cjs [out dir]
//
// His report (25 October, late): two long takes filmed in full, Stop, the review showed, then the Studio went back to the
// lessons and the take was gone, both times. Safari had reloaded the page with the whole 4K take in its memory. Now each
// second of a take goes to the phone's own store as it records, and the Studio opens again on the take's review after a
// reload. This films takes with Chromium's fake camera and checks: the parts reach the store as it records; a reload at
// the review opens the same take's review again, saying it was kept; a reload in the middle of a take keeps what was
// filmed; a second tap on Stop starts nothing; Retake and Lessons each need a second tap to throw a take away, and then
// it leaves the store; Send puts it in the queue as it is (no second copy), and it leaves the store once Drive holds it.
//
// (The rest of this header was the Back 10s check's, which this one is built from.)
//
// His ask on filming day 3: "instead of restarting the whole video, I just go back by 10 seconds ... it resets the
// video itself and the script alongside it, and I can still wait for 5 seconds and see the new script coming". This
// films takes with Chromium's fake camera on three phone sizes and checks: Back 10s shows only while a take records,
// fits the bar beside the record button; a tap takes the words back to the start of a sentence about ten seconds
// earlier, shows a five-second countdown and the sentence, and a second tap in the countdown goes ten seconds
// further; once the countdown ends the words wait for his voice and roll again; the take keeps recording all along;
// the review says how many times he went back; and Send writes each one into the take's description in a fake Drive
// ("Back at 0:12.04 to 0:02.10, again 0:17.06."), which the edit reads and cuts. It serves the page itself and
// pastes made-up lessons, so it needs no scripts and no Google account. Needs Chromium and playwright-core (the
// paths below are the cloud container's; PLAYWRIGHT_CORE and CHROMIUM override them).
const { chromium } = require(process.env.PLAYWRIGHT_CORE || '/opt/node-tools/node_modules/playwright-core');
const fs = require('fs');
const http = require('http');
const path = require('path');
const OUT = process.argv[2] || fs.mkdtempSync(path.join(require('os').tmpdir(), 'studio-keep-'));
fs.mkdirSync(OUT, { recursive: true });

// One long lesson, so the words roll for well over a minute: forty sentences of about ten words.
const LINES = Array.from({ length: 40 }, (_, i) => `Sentence number ${i + 1} is here to be read out loud, slowly and clearly.`);
const NAMES = { sales: 'S', time: 'T', communication: 'C', leadership: 'L', quitting: 'Q' };
const SCRIPTS = JSON.stringify(Object.fromEntries(Object.entries(NAMES).map(([k, p]) => [k, Array.from({ length: 2 }, (_, i) => ({
  id: `${p}1.${i}`, title: `Lesson ${i}`, clips: [{ said: [LINES.slice(0, 20).join(' '), LINES.slice(20).join(' ')] }],
}))])));
const PAGE = fs.readFileSync(path.join(__dirname, '..', 'public', 'studio', 'index.html'), 'utf8');

const drive = { folders: [], files: [], sessions: {}, seq: 0, texts: [] };
const cors = { 'access-control-allow-origin': '*', 'access-control-expose-headers': 'Location, Range', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST, PUT, PATCH, OPTIONS' };
const json = (r, body, status = 200) => r.fulfill({ status, headers: { ...cors, 'content-type': 'application/json' }, body: JSON.stringify(body) });
async function googleApi(route) {
  const req = route.request();
  const url = new URL(req.url());
  if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
  if (url.pathname === '/drive/v3/files' && req.method() === 'GET') {
    const q = url.searchParams.get('q');
    const m = /^name='(.+?)' and mimeType='application\/vnd.google-apps.folder' and trashed=false(?: and '(.+?)' in parents)?$/.exec(q);
    if (m) return json(route, { files: drive.folders.filter((f) => f.name === m[1] && (f.parent || null) === (m[2] || null)).map((f) => ({ id: f.id })) });
    const p = /^'(.+?)' in parents and trashed=false$/.exec(q);
    if (p) return json(route, { files: drive.files.filter((f) => f.parent === p[1]).map((f) => ({ id: f.id, name: f.name, appProperties: f.appProperties })) });
    // The Studio's log, looked for by name in the top folder.
    const named = /^name='(.+?)' and '(.+?)' in parents and trashed=false$/.exec(q);
    if (named) return json(route, { files: drive.texts.filter((f) => f.name === named[1] && f.parent === named[2]).map((f) => ({ id: f.id })) });
    return json(route, { error: q }, 400);
  }
  if (url.pathname === '/drive/v3/files' && req.method() === 'POST') {
    const body = JSON.parse(req.postData());
    const f = { id: `folder${++drive.seq}`, name: body.name, parent: (body.parents || [])[0] || null };
    drive.folders.push(f);
    return json(route, { id: f.id });
  }
  if (url.pathname.startsWith('/drive/v3/files/')) return json(route, { id: url.pathname.split('/').pop(), trashed: false });
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
    const sid = `s${++drive.seq}`;
    drive.sessions[sid] = { meta: JSON.parse(req.postData()), size: Number(req.headers()['x-upload-content-length']), received: 0 };
    return route.fulfill({ status: 200, headers: { ...cors, location: `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&upload_id=${sid}` }, body: '' });
  }
  if (url.pathname === '/upload/drive/v3/files' && req.method() === 'PUT') {
    const s = drive.sessions[url.searchParams.get('upload_id')];
    const range = req.headers()['content-range'];
    if (/^bytes \*\//.test(range)) return route.fulfill({ status: 308, headers: { ...cors, ...(s.received ? { range: `bytes=0-${s.received - 1}` } : {}) }, body: '' });
    s.received += (req.postDataBuffer() || Buffer.alloc(0)).length;
    if (s.received >= s.size) {
      const f = { id: `file${++drive.seq}`, name: s.meta.name, parent: s.meta.parents[0], appProperties: s.meta.appProperties, description: s.meta.description };
      drive.files.push(f);
      return json(route, { id: f.id, name: f.name });
    }
    return route.fulfill({ status: 308, headers: { ...cors, range: `bytes=0-${s.received - 1}` }, body: '' });
  }
  return json(route, { error: 'unknown' }, 404);
}

const results = [];
const check = (name, ok, seen) => { results.push({ name, ok: !!ok, seen }); console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${seen !== undefined ? ` (${JSON.stringify(seen)})` : ''}`); };

(async () => {
  const server = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(PAGE); }).listen(0, '127.0.0.1');
  await new Promise((done) => server.once('listening', done));
  const URL_ = `http://127.0.0.1:${server.address().port}/studio/index.html`;
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
  const context = await browser.newContext({ viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await context.addInitScript(() => {
    Object.defineProperty(ScreenOrientation.prototype, 'angle', { get: () => 90, configurable: true });
    localStorage.setItem('studio:clientId', JSON.stringify('test-client'));
    localStorage.setItem('studio:settings', JSON.stringify({ quality: 'hd', paced: true, countdown: 3, autostop: false, wpm: 210 }));
    window.google = { accounts: { oauth2: { initTokenClient(cfg) { return { requestAccessToken() { setTimeout(() => cfg.callback({ access_token: 'tok', expires_in: 3600 }), 20); } }; } } } };
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.route('https://accounts.google.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/javascript', body: '' }));
  await page.route('https://www.googleapis.com/**', googleApi);
  // Every dialog (the page's "leave this page?") is accepted, as Safari's reload does without asking.
  page.on('dialog', (d) => d.accept().catch(() => {}));
  await page.goto(URL_);
  await page.waitForSelector('#setup:not([hidden]), #home:not([hidden])');
  await page.evaluate((t) => { const box = document.getElementById('pasteBox'); const dt = new DataTransfer(); dt.setData('text/plain', t); box.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })); }, SCRIPTS);
  await page.waitForFunction(() => /lessons, on this phone/.test(document.getElementById('scriptsState').textContent));
  await page.click('#signIn');
  await page.waitForFunction(() => /Signed in/.test(document.getElementById('googleState').textContent));
  await page.click('#toLessons');
  await page.waitForSelector('#home:not([hidden])');

  // What the phone's store holds: the take kept as it records (its details, and how many parts).
  const store = () => page.evaluate(() => new Promise((resolve) => {
    const r = indexedDB.open('studio', 3);
    r.onsuccess = () => {
      const db = r.result;
      const t = db.transaction(['live', 'kv', 'queue']);
      const parts = t.objectStore('live').getAllKeys();
      const meta = t.objectStore('kv').get('live');
      const queue = t.objectStore('queue').getAllKeys();
      t.oncomplete = () => { resolve({ parts: (parts.result || []).length, meta: meta.result ? { lesson: meta.result.lesson, stopped: !!meta.result.stopped } : null, queue: (queue.result || []).length }); db.close(); };
    };
    r.onerror = () => resolve({ error: String(r.error) });
  }));
  const film = async (seconds) => {
    await page.click('.lesson >> nth=1');
    await page.waitForSelector('#camera:not([hidden])');
    await page.click('#rec');
    await page.waitForFunction(() => document.getElementById('rec').classList.contains('on'), null, { timeout: 15000 });
    await page.waitForTimeout(seconds * 1000);
  };
  const reviewOf = () => page.evaluate(() => ({ shown: !document.getElementById('review').hidden, title: document.getElementById('reviewTitle').textContent,
    said: document.getElementById('sendState').textContent, mb: document.getElementById('pictureState').textContent }));

  // 1. A take, kept as it records; Stop tapped twice.
  await film(7);
  const during = await store();
  check('each second of the take reaches the phone\'s store as it records', during.parts >= 2 && during.meta && during.meta.lesson === 'S1.1' && !during.meta.stopped, during);
  await page.tap('#rec');
  await page.waitForTimeout(80);
  await page.tap('#rec').catch(() => {});
  await page.waitForSelector('#review:not([hidden])', { timeout: 15000 });
  await page.waitForTimeout(1500);
  const first = await reviewOf();
  const cam = await page.evaluate(() => ({ camera: !document.getElementById('camera').hidden, counting: !document.getElementById('count').hidden }));
  check('a second tap on Stop starts nothing: the review shows, no new take', first.shown && !cam.camera && !cam.counting, { first, cam });
  const size1 = await page.evaluate(() => fetch(document.getElementById('take').src).then((r) => r.blob()).then((b) => b.size));
  check('the take reviewed is read back whole from the store', size1 > 20000, { size1 });
  const stopped = await store();
  check('stopped, it stays in the store until it is sent or thrown away', stopped.parts >= 3 && stopped.meta && stopped.meta.stopped, stopped);

  // 2. Safari reloads at the review: the same take's review opens again.
  await page.reload();
  await page.waitForSelector('#review:not([hidden]), #home:not([hidden])', { timeout: 15000 });
  const again = await reviewOf();
  const size2 = await page.evaluate(() => { const v = document.getElementById('take'); return v.src ? fetch(v.src).then((r) => r.blob()).then((b) => b.size) : 0; });
  check('after a reload the Studio opens on the same take\'s review, and says it was kept', again.shown && /S1\.1 · take 1/.test(again.title) && /Kept on this phone when Safari reloaded/.test(again.said) && size2 === size1, { again, size1, size2 });
  const plays = await page.evaluate(() => new Promise((resolve) => { const v = document.getElementById('take'); if (v.readyState >= 1) resolve(v.duration); else { v.onloadedmetadata = () => resolve(v.duration); setTimeout(() => resolve(-1), 5000); } }));
  check('the kept take plays', plays !== -1, { duration: plays });
  await page.screenshot({ path: path.join(OUT, 'kept-after-reload.png') });

  // 3. Retake needs a second tap; then the kept take leaves the store.
  await page.click('#retake');
  const once = await page.evaluate(() => ({ review: !document.getElementById('review').hidden, said: document.getElementById('retake').textContent }));
  check('one tap on Retake only asks', once.review && /Tap again to film it again/.test(once.said), once);
  await page.click('#retake');
  await page.waitForSelector('#camera:not([hidden])', { timeout: 10000 });
  await page.waitForTimeout(500);
  const gone = await store();
  check('a second tap films it again, and the take thrown away leaves the store', gone.parts === 0 && !gone.meta, gone);

  // 4. Safari reloads in the middle of a take: what was filmed is kept.
  await page.click('#rec');
  await page.waitForFunction(() => document.getElementById('rec').classList.contains('on'), null, { timeout: 15000 });
  await page.waitForTimeout(6000);
  await page.reload();
  await page.waitForSelector('#review:not([hidden]), #home:not([hidden])', { timeout: 15000 });
  const mid = await reviewOf();
  const size3 = await page.evaluate(() => { const v = document.getElementById('take'); return v.src ? fetch(v.src).then((r) => r.blob()).then((b) => b.size) : 0; });
  check('a reload in the middle of a take opens its review with what was filmed', mid.shown && /S1\.1 · take 1 · 0:0[4-7]/.test(mid.title) && size3 > 10000, { mid, size3 });

  // 5. Send: the queue points at the take kept as it recorded, and it leaves the store once Drive holds all of it.
  await page.click('#send');
  await page.waitForSelector('#home:not([hidden])', { timeout: 15000 });
  await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 60000 });
  const sent = await store();
  const f = drive.files[drive.files.length - 1];
  check('sent, it reaches Drive and leaves the store', f && /^S01\.01 take \d+\.(mp4|webm)$/.test(f.name) && sent.parts === 0 && !sent.meta, { name: f && f.name, sent });

  // 6. Lessons, too, needs a second tap to throw a take away.
  await film(3);
  await page.tap('#rec');
  await page.waitForSelector('#review:not([hidden])', { timeout: 15000 });
  await page.click('#toList');
  const ask = await page.evaluate(() => ({ review: !document.getElementById('review').hidden, said: document.getElementById('toList').textContent }));
  await page.click('#toList');
  await page.waitForSelector('#home:not([hidden])', { timeout: 10000 });
  await page.waitForTimeout(400);
  const after = await store();
  check('Lessons asks once, then throws the take away and it leaves the store', ask.review && /Tap again to throw this take away/.test(ask.said) && after.parts === 0 && !after.meta, { ask, after });
  check('no errors on the page', errors.length === 0, errors);

  await browser.close();
  server.close();
  const failed = results.filter((r) => !r.ok);
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(results, null, 1));
  console.log(failed.length ? `FAIL: ${failed.length} of ${results.length} checks.` : `PASS: all ${results.length} checks. Pictures in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
