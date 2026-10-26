// scripts/studio-trim-check.cjs — the Studio's trim, checked in Chromium (24 October 2026).
//
//   node scripts/studio-trim-check.cjs [out dir]
//
// His note on filming day 2: the trim moved in jumps of most of a second, so a cut between two sentences landed
// inside one of them, and he couldn't see that his marks went to Drive. This films a take with Chromium's fake
// camera, puts a ten-second clip with a known length behind the review, and checks: each mark moves by exactly a
// tenth or a second, held down it keeps moving, the start stays half a second before the end, the take shows the
// frame at the mark, Hear stops on the mark (within a frame or two, where timeupdate alone ran a quarter second
// past), and Send says the marks back and writes them, to the hundredth, into the take's description in a fake
// Drive. It also measures the review sideways on two phone sizes and saves pictures of it. It serves the page
// itself and pastes made-up lessons, so it needs no scripts and no Google account. Needs Chromium, playwright-core
// and ffmpeg (the paths below are the cloud container's; PLAYWRIGHT_CORE, CHROMIUM and FFMPEG override them).
const { chromium } = require(process.env.PLAYWRIGHT_CORE || '/opt/node-tools/node_modules/playwright-core');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { execFileSync } = require('child_process');
const OUT = process.argv[2] || fs.mkdtempSync(path.join(require('os').tmpdir(), 'studio-trim-'));
fs.mkdirSync(OUT, { recursive: true });

const NAMES = { sales: 'S', time: 'T', communication: 'C', leadership: 'L', quitting: 'Q' };
const SCRIPTS = JSON.stringify(Object.fromEntries(Object.entries(NAMES).map(([k, p]) => [k, Array.from({ length: 3 }, (_, i) => ({
  id: `${p}1.${i}`, title: `Lesson ${i}`, clips: [{ said: ['A short line to read out loud, then another short line after it.'] }],
}))])));
const PAGE = fs.readFileSync(path.join(__dirname, '..', 'public', 'studio', 'index.html'), 'utf8');
// A clip ten seconds long that Chromium plays and seeks in: a test picture and a steady tone, a keyframe a second.
const CLIP = path.join(OUT, 'clip.webm');
execFileSync(process.env.FFMPEG || 'ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'testsrc=size=640x360:rate=30', '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000',
  '-t', '10', '-c:v', 'libvpx-vp9', '-b:v', '400k', '-g', '30', '-c:a', 'libopus', '-shortest', CLIP]);

const drive = { folders: [], files: [], sessions: {}, seq: 0 };
const cors = { 'access-control-allow-origin': '*', 'access-control-expose-headers': 'Location, Range', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, POST, PUT, OPTIONS' };
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
    return json(route, { error: q }, 400);
  }
  if (url.pathname === '/drive/v3/files' && req.method() === 'POST') {
    const body = JSON.parse(req.postData());
    const f = { id: `folder${++drive.seq}`, name: body.name, parent: (body.parents || [])[0] || null };
    drive.folders.push(f);
    return json(route, { id: f.id });
  }
  if (url.pathname.startsWith('/drive/v3/files/')) return json(route, { id: url.pathname.split('/').pop(), trashed: false });
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
  const server = http.createServer((q, r) => {
    if (q.url.startsWith('/clip.webm')) { r.writeHead(200, { 'content-type': 'video/webm', 'accept-ranges': 'bytes' }); return r.end(fs.readFileSync(CLIP)); }
    r.writeHead(200, { 'content-type': 'text/html' }); r.end(PAGE);
  }).listen(0, '127.0.0.1');
  await new Promise((done) => server.once('listening', done));
  const URL_ = `http://127.0.0.1:${server.address().port}/studio/index.html`;
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });

  for (const [w, h] of [[844, 390], [932, 430]]) {
    const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await context.addInitScript(() => {
      Object.defineProperty(ScreenOrientation.prototype, 'angle', { get: () => 90, configurable: true });
      localStorage.setItem('studio:clientId', JSON.stringify('test-client'));
      localStorage.setItem('studio:settings', JSON.stringify({ quality: 'hd', paced: true, countdown: 3, autostop: false }));
      window.google = { accounts: { oauth2: { initTokenClient(cfg) { return { requestAccessToken() { setTimeout(() => cfg.callback({ access_token: 'tok', expires_in: 3600 }), 20); } }; } } } };
      // Where every pause landed, at the moment it was asked for (before the take goes back to its mark).
      const pause = HTMLMediaElement.prototype.pause;
      HTMLMediaElement.prototype.pause = function () { (window.__pauses = window.__pauses || []).push(this.currentTime); return pause.call(this); };
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
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
    await page.click('.lesson >> nth=1');
    await page.waitForSelector('#camera:not([hidden])');
    await page.click('#rec');
    await page.waitForFunction(() => document.getElementById('rec').classList.contains('on'), null, { timeout: 15000 });
    await page.waitForTimeout(3000);
    await page.click('#rec');
    await page.waitForSelector('#review:not([hidden])', { timeout: 15000 });
    // The ten-second clip behind the review: the page reads its length from it, as it does from a take.
    // As a take is: a file on the phone, played from a blob.
    await page.evaluate(async () => { const b = await (await fetch('/clip.webm')).blob(); const v = document.getElementById('take'); v.src = URL.createObjectURL(b); });
    try { await page.waitForFunction(() => Math.abs(Number(document.getElementById('tEnd').max) - 10) < 0.1 && Math.abs(Number(document.getElementById('tEnd').value) - 10) < 0.1, null, { timeout: 15000 }); }
    catch (e) { console.log('review:', await page.evaluate(() => ({ max: document.getElementById('tEnd').max, end: document.getElementById('tEnd').value, out: document.getElementById('oEnd').textContent, d: document.getElementById('take').duration, err: String(document.getElementById('take').error && document.getElementById('take').error.message) }))); throw e; }
    const LEN = await page.evaluate(() => Number(document.getElementById('tEnd').max));
    const tag = `${w}x${h}`;
    const mark = (x) => { x = Math.round(x * 100) / 100; const m = Math.floor(x / 60); return `${m}:${(x - m * 60).toFixed(2).padStart(5, '0')}`; };
    const read = () => page.evaluate(() => ({ a: document.getElementById('oStart').textContent, b: document.getElementById('oEnd').textContent,
      at: Math.round(document.getElementById('take').currentTime * 100) / 100, paused: document.getElementById('take').paused }));
    const tap = async (which, by) => { await page.click(`.trim .fine [data-mark="${which}"][data-by="${by}"]`); await page.waitForTimeout(120); };
    const settle = () => page.waitForFunction(() => { const v = document.getElementById('take'); return !v.seeking && v.paused; }, null, { timeout: 5000 });

    await tap('a', '1'); await settle();
    let s = await read();
    check(`${tag}: +1s moves the start to 1.00 and shows that frame`, s.a === '0:01.00' && Math.abs(s.at - 1) < 0.04, s);
    for (let i = 0; i < 3; i++) await tap('a', '0.1');
    await tap('a', '-0.1'); await settle();
    s = await read();
    check(`${tag}: three tenths on and one back is 1.20, no drift`, s.a === '0:01.20' && Math.abs(s.at - 1.2) < 0.04, s);
    await tap('b', '-1'); await tap('b', '-0.1'); await tap('b', '-0.1'); await settle();
    s = await read();
    const END = Math.round((LEN - 1.2) * 100) / 100;
    check(`${tag}: the end a second and two tenths back from ${LEN} is ${END}`, s.b === mark(END) && Math.abs(s.at - END) < 0.04, s);
    // Held down for a second: one step at once, then one every 90 ms after the first 450.
    const box = await page.locator('.trim .fine [data-mark="a"][data-by="0.1"]').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down(); await page.waitForTimeout(1000); await page.mouse.up(); await settle();
    s = await read();
    const held = Number(s.a.split(':')[1]);
    check(`${tag}: held down for a second, the start keeps moving (1.20 to about 1.9)`, held >= 1.6 && held <= 2.2, s);
    for (let i = 0; i < 12; i++) await tap('a', '1');
    await settle();
    s = await read();
    check(`${tag}: the start never comes within half a second of the end`, s.a === mark(END - 0.5), s);
    for (let i = 0; i < 12; i++) await tap('a', '-1');
    await tap('a', '0.1'); await tap('a', '0.1'); await tap('a', '0.1'); await tap('a', '0.1'); await tap('a', '0.1');
    await settle();
    s = await read();
    check(`${tag}: and never before the take begins`, s.a === '0:00.50', s);

    // Hear the end: plays the 2.5 s up to 8.80 and stops on it, then shows the end frame.
    await page.evaluate(() => { window.__pauses = []; });
    await page.click('#hearEnd');
    await page.waitForFunction(() => (window.__pauses || []).length > 0, null, { timeout: 8000 });
    await settle();
    let p = await page.evaluate(() => window.__pauses.slice());
    s = await read();
    check(`${tag}: Hear (end) stops on the end mark, within a frame or two`, Math.abs(p[0] - END) < 0.06 && Math.abs(s.at - END) < 0.04, { pausedAt: p[0], now: s.at });
    // Hear the start: 2.5 s from 0.50, then back at the start.
    await page.evaluate(() => { window.__pauses = []; });
    await page.click('#hearStart');
    await page.waitForFunction(() => (window.__pauses || []).length > 0, null, { timeout: 8000 });
    await settle();
    p = await page.evaluate(() => window.__pauses.slice());
    s = await read();
    check(`${tag}: Hear (start) plays two and a half seconds and comes back to the start`, Math.abs(p[0] - 3.0) < 0.06 && Math.abs(s.at - 0.5) < 0.04, { pausedAt: p[0], now: s.at });
    // Here: the paused place becomes the mark.
    await page.evaluate(() => { const v = document.getElementById('take'); v.currentTime = 6.37; });
    await settle();
    await page.click('#endHere');
    s = await read();
    check(`${tag}: Here sets the end where the take is paused, to the hundredth`, s.b === '0:06.37', s);
    await page.screenshot({ path: path.join(OUT, `review-${tag}.png`) });
    // Everything on the review reachable sideways: Send in view once the side is scrolled to it, and nothing wider
    // than the phone.
    const sizes = await page.evaluate(() => {
      const side = document.querySelector('.rv-side');
      const send = document.getElementById('send').getBoundingClientRect();
      return { sendBottom: Math.round(send.bottom), innerHeight, sideScrolls: side.scrollHeight > side.clientHeight, wide: document.documentElement.scrollWidth > innerWidth,
        fineButtons: [...document.querySelectorAll('.trim .fine .btn')].map((b) => Math.round(b.getBoundingClientRect().height)) };
    });
    check(`${tag}: the trim buttons are at least 38 points tall, and nothing is wider than the phone`, sizes.fineButtons.every((x) => x >= 38) && !sizes.wide, sizes);
    // Send in view without scrolling, the marks scrolling above it, and nothing of the marks hidden under it once
    // the side is scrolled to its foot.
    const sendBox = await page.locator('#send').boundingBox();
    check(`${tag}: Send is in view without scrolling`, sendBox && sendBox.y >= 0 && sendBox.y + sendBox.height <= h, sendBox);
    await page.evaluate(() => { const side = document.querySelector('.rv-side'); side.scrollTop = side.scrollHeight; });
    const under = await page.evaluate(() => {
      const act = document.querySelector('.rv-act').getBoundingClientRect();
      const play = document.getElementById('playTrim').getBoundingClientRect();
      return { playBottom: Math.round(play.bottom), actTop: Math.round(act.top) };
    });
    check(`${tag}: scrolled to its foot, the last trim button sits above Send's row`, under.playBottom <= under.actTop, under);
    await page.screenshot({ path: path.join(OUT, `review-${tag}-scrolled.png`) });

    // Send: the marks said back, and written to the hundredth in the take's description in Drive.
    await page.click('#send');
    await page.waitForFunction(() => /trimmed/.test(document.getElementById('sendState').textContent), null, { timeout: 10000 });
    const said = await page.$eval('#sendState', (e) => e.textContent);
    check(`${tag}: Send says the marks back`, /trimmed 0:00\.50 to 0:06\.37\. It goes to your Drive behind you with your marks/.test(said), said);
    await page.waitForSelector('#camera:not([hidden])', { timeout: 10000 });
    await page.click('#camBack');
    await page.waitForSelector('#home:not([hidden])', { timeout: 10000 });
    await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 60000 });
    const f = drive.files[drive.files.length - 1];
    check(`${tag}: Drive's copy carries both marks`, f && /Start 0:00\.50, end 0:06\.37, of 0:10\.0\./.test(f.description) && f.appProperties.trimStart === '0.50' && f.appProperties.trimEnd === '6.37', f && { description: f.description, trim: [f.appProperties.trimStart, f.appProperties.trimEnd] });
    await page.click('.sem >> nth=0');
    await page.waitForFunction(() => /in Drive · take \d+ trimmed/.test(document.querySelector('.lesson .takes')?.textContent || ''), null, { timeout: 10000 });
    const line = await page.$eval('.lesson .takes', (e) => e.textContent);
    check(`${tag}: the lesson's line reads the marks back from Drive`, /1 take in Drive · take 1 trimmed 0:00\.50 to 0:06\.37/.test(line), line);
    await page.screenshot({ path: path.join(OUT, `home-${tag}.png`) });
    check(`${tag}: no errors on the page`, errors.length === 0, errors);
    await context.close();
    drive.files.length = 0; drive.folders.length = 0;
  }
  await browser.close();
  server.close();
  const failed = results.filter((r) => !r.ok);
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(results, null, 1));
  console.log(failed.length ? `FAIL: ${failed.length} of ${results.length} checks.` : `PASS: all ${results.length} checks. Pictures in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
