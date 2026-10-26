// scripts/studio-rewind-check.cjs — the Studio's Back 10s, checked in Chromium (25 October 2026).
//
//   node scripts/studio-rewind-check.cjs [out dir]
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
const OUT = process.argv[2] || fs.mkdtempSync(path.join(require('os').tmpdir(), 'studio-rewind-'));
fs.mkdirSync(OUT, { recursive: true });

// One long lesson, so the words roll for well over a minute: forty sentences of about ten words.
const LINES = Array.from({ length: 40 }, (_, i) => `Sentence number ${i + 1} is here to be read out loud, slowly and clearly.`);
const NAMES = { sales: 'S', time: 'T', communication: 'C', leadership: 'L', quitting: 'Q' };
const SCRIPTS = JSON.stringify(Object.fromEntries(Object.entries(NAMES).map(([k, p]) => [k, Array.from({ length: 2 }, (_, i) => ({
  id: `${p}1.${i}`, title: `Lesson ${i}`, clips: [{ said: [LINES.slice(0, 20).join(' '), LINES.slice(20).join(' ')] }],
}))])));
const PAGE = fs.readFileSync(path.join(__dirname, '..', 'public', 'studio', 'index.html'), 'utf8');

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
const secs = (m) => { const [a, b] = m.split(':'); return Number(a) * 60 + Number(b); };

(async () => {
  const server = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(PAGE); }).listen(0, '127.0.0.1');
  await new Promise((done) => server.once('listening', done));
  const URL_ = `http://127.0.0.1:${server.address().port}/studio/index.html`;
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });

  // Each size held with the lens on the left (the words on the left), then one with it on the right, for the layout.
  for (const [w, h, angle] of [[667, 375, 90], [844, 390, 90], [932, 430, 90], [844, 390, 270]]) {
    const tag = `${w}x${h}${angle === 270 ? ', lens right' : ''}`;
    const layoutOnly = angle === 270;
    const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await context.addInitScript((a) => {
      Object.defineProperty(ScreenOrientation.prototype, 'angle', { get: () => a, configurable: true });
      localStorage.setItem('studio:clientId', JSON.stringify('test-client'));
      localStorage.setItem('studio:settings', JSON.stringify({ quality: 'hd', paced: true, countdown: 3, autostop: false, wpm: 210 }));
      window.google = { accounts: { oauth2: { initTokenClient(cfg) { return { requestAccessToken() { setTimeout(() => cfg.callback({ access_token: 'tok', expires_in: 3600 }), 20); } }; } } } };
    }, angle);
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
    await page.click('.lesson >> nth=0');
    await page.waitForSelector('#camera:not([hidden])');

    const backShown = () => page.evaluate(() => { const b = document.getElementById('back'); return !!b && getComputedStyle(b).display !== 'none' && b.offsetParent !== null; });
    if (!layoutOnly) check(`${tag}: Back 10s is not shown before a take`, !(await backShown()));
    await page.click('#rec');
    await page.waitForFunction(() => document.getElementById('rec').classList.contains('on'), null, { timeout: 15000 });
    check(`${tag}: Back 10s shows while the take records`, await backShown());
    const idShown = await page.evaluate(() => { const e = document.getElementById('liveId'); return { shown: getComputedStyle(e).display !== 'none', text: e.textContent }; });
    if (!layoutOnly) check(`${tag}: the lesson and its take show over the picture while it records`, idShown.shown && idShown.text === 'S1.0 · take 1', idShown);
    // Back 10s just above Record, right edges together, a thumb's width apart, on the picture's side, inside the screen.
    const box = (sel) => page.evaluate((q) => { const r = document.querySelector(q).getBoundingClientRect(); return { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), b: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height) }; }, sel);
    const bar = { back: await box('#back'), rec: await box('#rec'), band: await box('#band'), screen: await page.evaluate(() => ({ w: innerWidth, h: innerHeight, overflow: (() => { const b = document.querySelector('.bar'); return b.scrollWidth - b.clientWidth; })() })) };
    const onPicture = angle === 270 ? bar.back.r <= bar.band.l : bar.back.l >= bar.band.r;
    check(`${tag}: Back 10s sits just above Record, on the picture's side, inside the screen`,
      Math.abs(bar.back.r - bar.rec.r) <= 1 && bar.rec.t - bar.back.b >= 12 && bar.back.h >= 52 && bar.back.w >= 72 && onPicture
        && bar.back.l >= 0 && bar.back.t >= 0 && bar.rec.r <= bar.screen.w && bar.rec.b <= bar.screen.h && bar.screen.overflow <= 1, bar);
    if (layoutOnly) {
      await page.tap('#back');
      await page.waitForTimeout(150);
      const note = await box('#backNote span');
      const id = await box('#liveId');
      check(`${tag}: the note sits at the top of the picture, clear of the words, of Back and of the lesson's label`,
        note.t >= 0 && note.b <= bar.back.t && note.r <= bar.band.l + 1 && note.l >= 0 && (id.b <= note.t || id.r <= note.l) && id.r <= bar.band.l + 1, { note, id, band: bar.band });
      await page.screenshot({ path: path.join(OUT, `back-${tag.replace(/\W+/g, '-')}.png`) });
      check(`${tag}: no errors on the page`, errors.length === 0, errors);
      await context.close();
      continue;
    }

    const posNow = () => page.evaluate(() => { const m = /translateY\((-?[\d.]+)px\)/.exec(document.getElementById('words').style.transform); return m ? -Number(m[1]) : 0; });
    await page.evaluate(() => { window.secs = (m) => { const [a, b] = m.replace('● ', '').split(':'); return Number(a) * 60 + Number(b); }; });
    const onASentence = (pos) => page.evaluate((p) => { const inner = document.getElementById('words'); const top = inner.getBoundingClientRect().top;
      return [...inner.querySelectorAll('.sent')].some((el) => Math.abs(el.getBoundingClientRect().top - top - p) < 1.5); }, pos);
    // The words roll at a steady speed: measured over nine seconds.
    await page.waitForFunction(() => /translateY\(-[1-9]/.test(document.getElementById('words').style.transform), null, { timeout: 8000 });
    const p1 = await posNow(); const t1 = Date.now();
    await page.waitForTimeout(9000);
    const p2 = await posNow(); const t2 = Date.now();
    const speed = (p2 - p1) / ((t2 - t1) / 1000);
    check(`${tag}: the words roll before Back is tapped`, speed > 5, { speed: Math.round(speed) });
    // Twenty-two seconds in, well into the lesson, so ten seconds back lands mid-text.
    await page.waitForFunction(() => window.secs(document.getElementById('timer').textContent) >= 22, null, { timeout: 30000 });
    const before1 = await posNow();
    const tapWall1 = Date.now();
    await page.tap('#back');
    await page.waitForTimeout(150);
    const after1 = await posNow();
    const ui = await page.evaluate(() => ({ count: document.getElementById('count').hidden ? null : document.getElementById('count').textContent,
      note: document.getElementById('backNote').hidden ? null : document.getElementById('backNote').textContent }));
    const back1 = (before1 - after1) / speed;
    check(`${tag}: a tap takes the words back to the start of a sentence, ten seconds and up to a sentence more (here ${back1.toFixed(1)} s)`,
      (await onASentence(after1)) && after1 > 0 && back1 >= 9.5 && back1 <= 15, { before1, after1, back1: Math.round(back1 * 10) / 10 });
    check(`${tag}: the countdown shows from 5, with the sentence to say`, ui.count === '5' && /^Back to “Sentence number \d+ is here/.test(ui.note || '') && !/Sentence number 1 is/.test(ui.note), ui);
    await page.screenshot({ path: path.join(OUT, `back-${tag}.png`) });
    await page.waitForTimeout(2000);
    check(`${tag}: the words hold still during the countdown`, Math.abs((await posNow()) - after1) < 0.5);
    await page.waitForTimeout(3600);
    const gone = await page.evaluate(() => ({ count: document.getElementById('count').hidden, note: document.getElementById('backNote').hidden }));
    check(`${tag}: after five seconds the countdown and the note go`, gone.count && gone.note, gone);
    // Then they wait for his voice (two and a half seconds at most) and roll again: when, on the test's clock.
    let resumeWall = 0;
    for (let i = 0; i < 120 && !resumeWall; i++) { if ((await posNow()) > after1 + 0.5) resumeWall = Date.now(); else await page.waitForTimeout(40); }
    check(`${tag}: the words roll again from the sentence`, resumeWall > 0, { from: after1, now: await posNow() });

    // Eighteen seconds after they roll again, two taps in one countdown: twenty seconds back in the lesson as it will
    // play, where what the first time back cut doesn't count, so it lands before the first cut, mid-text.
    await page.waitForTimeout(Math.max(0, resumeWall + 18000 - Date.now()));
    const before2 = await posNow();
    await page.tap('#back');
    await page.waitForTimeout(900);
    await page.tap('#back');
    await page.waitForTimeout(150);
    const after2 = await posNow();
    const back2 = (before2 - after2) / speed;
    const count2 = await page.evaluate(() => document.getElementById('count').textContent);
    check(`${tag}: a second tap in the countdown goes ten seconds further back, the countdown from 5 again (here ${back2.toFixed(1)} s in all)`,
      (await onASentence(after2)) && back2 >= 19.5 && back2 <= 25 && count2 === '5', { before2, after2, back2: Math.round(back2 * 10) / 10, count2 });
    await page.waitForTimeout(6500);
    const still = await page.evaluate(() => ({ on: document.getElementById('rec').classList.contains('on'), timer: document.getElementById('timer').textContent }));
    check(`${tag}: the take kept recording through both times back`, still.on && secs(still.timer.replace('● ', '')) >= 50, still);
    await page.tap('#rec');
    await page.waitForSelector('#review:not([hidden])', { timeout: 15000 });
    const review = await page.$eval('#backState', (e) => ({ hidden: e.hidden, text: e.textContent }));
    check(`${tag}: the review says he went back twice and the edit cuts it`, !review.hidden && /^Back 2 times \(0:2\d, 0:\d\d\): the fumbles stay in the take here, and the edit cuts them out\.$/.test(review.text), review);
    await page.screenshot({ path: path.join(OUT, `review-${tag}.png`) });

    // Send: each time back written into the take's description, for the edit.
    await page.click('#send');
    await page.waitForFunction(() => /times back for the edit to cut/.test(document.getElementById('sendState').textContent), null, { timeout: 10000 });
    // Straight on to the next lesson's camera, the take just kept said over it.
    await page.waitForSelector('#camera:not([hidden])', { timeout: 10000 });
    const onward = await page.evaluate(() => ({ lesson: document.querySelector('#who b')?.textContent, kept: document.getElementById('keptNote').hidden ? null : document.getElementById('keptNote').textContent,
      idShown: getComputedStyle(document.getElementById('liveId')).display !== 'none', id: document.getElementById('liveId').textContent }));
    check(`${tag}: Send opens the next lesson's camera, saying the take is kept and going to Drive`,
      onward.lesson === 'S1.1' && onward.kept === 'S1.0 kept on this phone: it goes to Drive behind you. Now S1.1.' && !onward.idShown && onward.id === 'S1.1 · take 1', onward);
    await page.screenshot({ path: path.join(OUT, `next-${tag}.png`) });
    await page.click('#camBack');
    await page.waitForSelector('#home:not([hidden])', { timeout: 10000 });
    await page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout: 60000 });
    const f = drive.files[drive.files.length - 1];
    const backs = [...((f && f.description) || '').matchAll(/Back at (\d+:\d{2}\.\d{2}) to (\d+:\d{2}\.\d{2}), again (\d+:\d{2}\.\d{2})\./g)].map((m) => ({ at: secs(m[1]), to: secs(m[2]), again: secs(m[3]) }));
    check(`${tag}: Drive's copy carries the marks and both times back`, f && /Start 0:00\.00, end /.test(f.description) && backs.length === 2 && f.appProperties.backs === '2', f && { description: f.description, backs: f.appProperties.backs });
    const [one, two] = backs;
    check(`${tag}: the first: tapped about 22 seconds in, back to when he reached that sentence, ten to fifteen seconds before; rolling again five seconds later`,
      one && one.at >= 21.5 && one.at <= 24 && one.at - one.to >= 9.5 && one.at - one.to <= 15.5 && Math.abs(one.again - one.at - 5) < 0.8, one);
    // The second goes back twenty seconds of the lesson as it plays: the lesson's clock picked up at the first time
    // back's sentence (one.to) when the words rolled again, so twenty seconds back reaches past that cut, to where he
    // first said the sentence it lands in, in his first go.
    const resume1 = two && one ? one.at + (resumeWall - tapWall1) / 1000 : 0;
    const target2 = two && one ? one.to + (two.at - resume1) - 20 : 0;
    const want = target2 < (one ? one.to : 0) ? [target2 - 4.6, target2 + 0.3] : [resume1 + Math.max(0, target2 - 4.6 - one.to), resume1 + (target2 - one.to) + 0.3];
    check(`${tag}: the second, tapped twice: back twenty seconds of the lesson as it plays, past the first cut, to when he first said that sentence`,
      two && two.to < one.to && two.to >= want[0] && two.to <= want[1] && two.again - two.at >= 5.5 && two.again - two.at <= 6.6,
      two && { ...two, target2: Math.round(target2 * 100) / 100, want: want.map((x) => Math.round(x * 100) / 100) });
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
