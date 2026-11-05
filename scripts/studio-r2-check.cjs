// scripts/studio-r2-check.cjs — the Studio sending takes to a private R2 bucket, checked in Chromium against a fake R2
// (5 November 2026).
//
//   node scripts/studio-r2-check.cjs [out dir]
//
// Films takes with Chromium's fake camera and sends them through the Studio's R2 door (/studio/r2, faked here) to a
// fake R2 that takes each 64 KiB piece at a signed address. It drops the connection in the middle of a take, holds a take
// while the page reloads, and then checks: no Google sign-in was needed; every take arrived byte for byte, numbered
// right, with its marks beside it as JSON; each take left the phone only after R2 said it held every byte; the
// lesson's line says it was checked in R2; "Check what's in R2" says what the bucket holds; the log went to R2 and
// holds no signed address. Needs Chromium and playwright-core (PLAYWRIGHT_CORE and CHROMIUM override the paths).
const { chromium } = require(process.env.PLAYWRIGHT_CORE || '/opt/node-tools/node_modules/playwright-core');
const fs = require('fs');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const OUT = process.argv[2] || fs.mkdtempSync(path.join(require('os').tmpdir(), 'studio-r2-'));
fs.mkdirSync(OUT, { recursive: true });
const NAMES = { sales: 'S', time: 'T', communication: 'C', leadership: 'L', quitting: 'Q', attraction: 'A' };
const FOLDER = { sales: 'Sales', time: 'Time', communication: 'Communication', leadership: 'Leadership', quitting: 'Quitting', attraction: 'Law of Attraction' };
const SCRIPTS = JSON.stringify(Object.fromEntries(Object.entries(NAMES).map(([k, p]) => [k, Array.from({ length: 8 }, (_, i) => ({
  id: `${p}1.${i}`, title: `Lesson ${i}`, clips: [{ said: ['A short line to read out loud, then another short line after it.'] }],
}))])));
const PAGE = fs.readFileSync(path.join(__dirname, '..', 'public', 'studio', 'index.html'), 'utf8')
  .replace('const R2_PART = 8 * 1024 * 1024;', 'const R2_PART = 64 * 1024;'); // small pieces, so a short take has several
if (!PAGE.includes('const R2_PART = 64 * 1024;')) throw new Error('the Studio no longer has R2_PART');

const r2 = { uploads: {}, objects: {}, texts: {}, seq: 0, puts: 0, drops: new Set(), paused: false, log: [], errors: [], statusAsked: 0, blockProbe: true, probes: 0 };
const cors = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'PUT, GET, HEAD, OPTIONS', 'access-control-allow-headers': '*', 'access-control-expose-headers': 'ETag' };
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
const ok = (route, body, status = 200) => route.fulfill({ status, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });

async function door(route) {
  const req = route.request();
  if (req.method() !== 'POST') return route.fulfill({ status: 405, body: '' });
  const b = JSON.parse(req.postData() || '{}');
  switch (b.op) {
    case 'status': r2.statusAsked++; return ok(route, { ready: true, part: 64 * 1024 });
    case 'start': {
      if (!FOLDERS.includes(b.folder) || !/^[A-Z]\d{2}\.\d{2} take \d{1,3}\.(mp4|webm)$/.test(b.name)) { r2.errors.push(`bad start ${b.folder}/${b.name}`); return ok(route, { error: 'bad' }, 400); }
      const key = `${b.folder}/${b.name}`;
      const id = `up${++r2.seq}`;
      r2.uploads[id] = { key, type: b.type, size: b.size, parts: new Map(), done: false };
      r2.texts[`${key}.json`] = JSON.stringify(b.marks);
      r2.log.push(`start ${id} ${key}`);
      return ok(route, { key, uploadId: id, part: 64 * 1024 });
    }
    case 'sign': {
      const u = r2.uploads[b.uploadId];
      if (!u || u.key !== b.key) return ok(route, { error: 'r2', said: 'NoSuchUpload (404)' }, 404);
      return ok(route, { urls: b.parts.map((n) => ({ n, url: `https://r2.fake/put/${b.uploadId}/${n}?X-Amz-Signature=secret${n}` })) });
    }
    case 'parts': {
      const u = r2.uploads[b.uploadId];
      if (!u || u.done) return ok(route, { gone: true });
      r2.log.push(`parts ${b.uploadId} ${[...u.parts.keys()].join(',')}`);
      return ok(route, { parts: [...u.parts].map(([n, p]) => ({ n, etag: p.etag, size: p.data.length })) });
    }
    case 'complete': {
      const u = r2.uploads[b.uploadId];
      if (!u) return ok(route, { error: 'r2', said: 'NoSuchUpload (404)' }, 404);
      const given = [...b.parts].sort((x, y) => x.n - y.n);
      for (const p of given) if (!u.parts.has(p.n) || u.parts.get(p.n).etag !== p.etag) r2.errors.push(`complete ${b.uploadId}: part ${p.n} etag ${p.etag}`);
      const data = Buffer.concat(given.map((p) => u.parts.get(p.n).data));
      r2.objects[u.key] = { data, sha: sha(data), type: u.type };
      u.done = true;
      r2.log.push(`done ${u.key} ${data.length}`);
      return ok(route, { size: data.length, at: new Date().toISOString() });
    }
    case 'head': {
      const o = r2.objects[b.key];
      return ok(route, o ? { size: o.data.length, at: new Date().toISOString() } : { missing: true });
    }
    case 'list': {
      const prefix = `${b.folder}/`;
      return ok(route, { takes: Object.entries(r2.objects).filter(([k]) => k.startsWith(prefix)).map(([key, o]) => ({ key, name: key.slice(prefix.length), size: o.data.length, at: new Date().toISOString() })) });
    }
    case 'log': r2.texts['Studio log.txt'] = b.text; return ok(route, { ok: true });
    case 'probe': return ok(route, { url: 'https://r2.fake/check?X-Amz-Signature=secretcheck' });
    default: return ok(route, { error: 'bad' }, 400);
  }
}
const FOLDERS = Object.values(FOLDER);

async function putPiece(route) {
  const req = route.request();
  if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
  if (/r2\.fake\/check\?/.test(req.url())) {
    r2.probes++;
    // A bucket with no CORS rule: the browser refuses the answer, which the page sees as a failed request.
    if (r2.blockProbe) return route.abort('failed');
    return route.fulfill({ status: 200, headers: { ...cors, etag: '"check"' }, body: '' });
  }
  const m = /\/put\/(up\d+)\/(\d+)/.exec(req.url());
  const u = m && r2.uploads[m[1]];
  if (!u) return route.fulfill({ status: 404, headers: cors, body: '<Error><Code>NoSuchUpload</Code></Error>' });
  while (r2.paused) await wait(50);
  await wait(60);
  r2.puts++;
  const tag = `${m[1]}#${m[2]}`;
  if (r2.drops.has(tag)) { r2.drops.delete(tag); r2.log.push(`drop ${tag}`); return route.abort('connectionreset'); }
  const data = req.postDataBuffer() || Buffer.alloc(0);
  const etag = `"${sha(data).slice(0, 16)}"`;
  u.parts.set(Number(m[2]), { data, etag });
  return route.fulfill({ status: 200, headers: { ...cors, etag }, body: '' });
}

(async () => {
  const server = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(PAGE); }).listen(0, '127.0.0.1');
  await new Promise((done) => server.once('listening', done));
  const URL_ = `http://127.0.0.1:${server.address().port}/studio/index.html`;
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium',
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
  const context = await browser.newContext({ viewport: { width: 932, height: 430 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await context.addInitScript(() => {
    Object.defineProperty(ScreenOrientation.prototype, 'angle', { get: () => 90, configurable: true });
    if (!localStorage.getItem('studio:settings')) localStorage.setItem('studio:settings', JSON.stringify({ quality: 'hd', paced: true, countdown: 3, autostop: false }));
    // Google is never asked: any sign-in would show here.
    window.google = { accounts: { oauth2: { initTokenClient() { return { requestAccessToken() { window.__googleAsked = (window.__googleAsked || 0) + 1; } }; } } } };
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
  page.on('console', (m) => { if (m.type() === 'error' && !/ERR_CONNECTION_RESET|net::ERR_FAILED/.test(m.text())) errors.push(m.text()); });
  await page.route('https://accounts.google.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/javascript', body: '' }));
  await page.route('https://www.googleapis.com/**', (r) => { errors.push(`Google asked: ${r.request().url()}`); return r.fulfill({ status: 500, body: '' }); });
  await page.route('**/studio/r2', door);
  await page.route('https://r2.fake/**', putPiece);
  await page.goto(URL_);
  await page.waitForSelector('#setup:not([hidden]), #home:not([hidden])');
  await page.evaluate((t) => { const box = document.getElementById('pasteBox'); const dt = new DataTransfer(); dt.setData('text/plain', t); box.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })); }, SCRIPTS);
  await page.waitForFunction(() => /lessons, on this phone/.test(document.getElementById('scriptsState').textContent));
  await page.waitForFunction(() => /can’t send to it yet/.test(document.getElementById('storeState').textContent));
  const blockedSays = await page.textContent('#storeState');
  const setupSays = blockedSays;
  await page.screenshot({ path: path.join(OUT, 'setup.png') });
  await page.click('#toLessons');
  await page.waitForSelector('#home:not([hidden])');

  const results = {};
  const check = (name, pass, data) => { results[name] = !!pass; console.log(`${pass ? 'ok  ' : 'FAIL'} ${name}${data !== undefined ? ` (${JSON.stringify(data).slice(0, 400)})` : ''}`); };
  async function film(nth, seconds) {
    await page.click(`.lesson >> nth=${nth}`);
    await page.waitForSelector('#camera:not([hidden])');
    await page.click('#rec');
    await page.waitForFunction(() => document.getElementById('rec').classList.contains('on'), null, { timeout: 15000 });
    await page.waitForTimeout(seconds * 1000);
    await page.click('#rec');
    await page.waitForSelector('#review:not([hidden])', { timeout: 15000 });
  }
  async function send() {
    await page.click('#send');
    await page.waitForSelector('#camera:not([hidden]), #home:not([hidden])', { timeout: 10000 });
    if (await page.isVisible('#camera')) await page.click('#camBack');
    await page.waitForSelector('#home:not([hidden])', { timeout: 10000 });
  }
  const allSent = (timeout = 120000) => page.waitForFunction(() => /All sent/.test(document.getElementById('sendingState').textContent), null, { timeout });
  const onPhone = () => page.evaluate(() => new Promise((resolve) => {
    const r = indexedDB.open('studio');
    r.onsuccess = () => { const db = r.result; const t = db.transaction(['queue']); const q = t.objectStore('queue').getAll(); t.oncomplete = () => { resolve((q.result || []).length); db.close(); }; };
  }));

  // 0. R2 set up but not reachable from the phone (no CORS rule): the setup page says so, the take waits on the phone,
  // and once the rule is right ("Check what's in R2" checks again) it goes.
  await film(4, 3);
  await send();
  await page.waitForFunction(() => /R2 isn’t taking takes from this phone yet/.test(document.getElementById('sendingState').textContent), null, { timeout: 15000 });
  const waitingSays = await page.textContent('#sendingState');
  const waitingLine = await page.textContent('#driveLine').catch(() => '');
  const waitingOnPhone = await onPhone();
  await page.screenshot({ path: path.join(OUT, 'blocked.png') });
  r2.blockProbe = false;
  await page.click('#r2Check');
  await allSent(60000);
  const afterUnblock = Object.keys(r2.objects);
  const unblockedSays = await page.textContent('#storeState').catch(() => '');
  // 1. A take whose second piece drops: it picks up from the pieces R2 holds, and lands whole.
  r2.drops.add('up2#2');
  await film(1, 4);
  await send();
  await allSent();
  // 2. Two more: the second take of the same lesson is take 2.
  await film(1, 3); await send();
  await film(2, 3); await send();
  await allSent();
  // 3. A reload with a take half sent: it is still on the phone and carries on from R2's pieces.
  r2.paused = true;
  await film(3, 4); await send();
  await page.waitForTimeout(700);
  const beforeReload = await onPhone();
  await page.reload();
  await page.waitForSelector('#home:not([hidden]), #setup:not([hidden])');
  if (await page.isVisible('#setup')) await page.click('#toLessons');
  r2.paused = false;
  await allSent(150000);
  await page.waitForTimeout(800);
  const listed = await page.$$eval('.lesson', (els) => els.slice(0, 4).map((e) => e.innerText.replace(/\s+/g, ' ')));
  await page.screenshot({ path: path.join(OUT, 'sent-home.png') });
  await page.click('#r2Check');
  await page.waitForFunction(() => /R2 holds/.test(document.getElementById('r2Said').textContent), null, { timeout: 10000 });
  const r2Said = await page.textContent('#r2Said');
  await page.screenshot({ path: path.join(OUT, 'check-r2.png') });
  // 4. The connection drops during the check on a phone that has sent to R2 before (5 November: tapped just after Safari
  // came back on screen, the check had blamed the CORS rule and held the take for a minute): the rule is never blamed,
  // and a take filmed then goes at once.
  r2.blockProbe = true;
  const probesBefore = r2.probes;
  await page.click('#r2Check');
  await page.waitForFunction(() => /lost its connection|can’t send to it yet/.test(document.getElementById('storeState').textContent), null, { timeout: 15000 });
  const droppedSays = await page.textContent('#storeState');
  await film(5, 3);
  await send();
  const sentFrom = Date.now();
  while (Date.now() - sentFrom < 30000 && !(r2.objects['Sales/S01.05 take 1.mp4'] && (await onPhone()) === 0)) await page.waitForTimeout(400);
  const droppedSentIn = Date.now() - sentFrom;
  const droppedLine = await page.textContent('#driveLine').catch(() => '');
  const droppedSending = await page.textContent('#sendingState').catch(() => '');
  const probesDuring = r2.probes - probesBefore;
  await page.screenshot({ path: path.join(OUT, 'dropped.png') });
  r2.blockProbe = false;
  await page.waitForTimeout(9000); // the log is written a few seconds after each change
  const kept = await page.evaluate(() => JSON.parse(localStorage.getItem('test:kept') || '[]'));
  const googleAsked = await page.evaluate(() => window.__googleAsked || 0);
  const left = await onPhone();
  const lineState = await page.textContent('#driveLine').catch(() => '');

  const names = Object.keys(r2.objects).sort();
  check('with no CORS rule the setup page says so in words, and the take waits safe on the phone', /CORS rule is missing/.test(blockedSays) && /kept safe on this phone/.test(waitingSays) && /R2 not reachable/.test(waitingLine) && waitingOnPhone === 1, { blockedSays, waitingSays, waitingLine, waitingOnPhone });
  check('once the rule is right, the check passes and the waiting take goes, with no Google sign-in', afterUnblock.includes('Sales/S01.04 take 1.mp4') && /checked from this phone/.test(unblockedSays) && googleAsked === 0, { afterUnblock, unblockedSays, googleAsked });
  check('a dropped connection on a phone that has sent before never blames the bucket’s rule, and the next take goes at once', probesDuring >= 1 && /lost its connection/.test(droppedSays) && !/CORS/.test(droppedSays) && !/R2 not reachable|isn’t taking takes/.test(`${droppedLine} ${droppedSending}`) && r2.objects['Sales/S01.05 take 1.mp4'] !== undefined && droppedSentIn < 30000, { probesDuring, droppedSays, droppedLine, droppedSending, droppedSentIn });
  check('six takes in R2, named and numbered right', JSON.stringify(names) === JSON.stringify(['Sales/S01.01 take 1.mp4', 'Sales/S01.01 take 2.mp4', 'Sales/S01.02 take 1.mp4', 'Sales/S01.03 take 1.mp4', 'Sales/S01.04 take 1.mp4', 'Sales/S01.05 take 1.mp4']), names);
  const shas = new Set(kept.map((k) => k.sha));
  check('every take arrived byte for byte', names.length === 6 && names.every((n) => shas.has(r2.objects[n].sha)), names.map((n) => [n, r2.objects[n].data.length]));
  check('the dropped piece was sent again and the take resumed from R2’s pieces', r2.log.some((l) => l === 'drop up2#2') && r2.log.some((l) => /^parts up2 1/.test(l)), r2.log.filter((l) => /up2/.test(l)));
  const marks = names.map((n) => JSON.parse(r2.texts[`${n}.json`] || '{}'));
  check('each take’s marks are beside it in R2', marks.every((m) => m.lesson && m.trimStart != null && m.trimEnd != null && /Take \d\. Start /.test(m.description || '')), marks.map((m) => [m.lesson, m.take, m.trimStart, m.trimEnd]));
  check('the reloaded take was still on the phone and landed', beforeReload >= 1 && r2.objects['Sales/S01.03 take 1.mp4'] !== undefined, { beforeReload });
  check('nothing left on the phone once R2 holds every take', left === 0, { left });
  check('the lesson line says the take was checked in R2', listed.some((t) => /checked in R2/.test(t)), listed);
  check('Check what’s in R2 says what the bucket holds', /R2 holds 5 takes of Sales/.test(r2Said), r2Said);
  const log = r2.texts['Studio log.txt'] || '';
  check('the log went to R2, says it checked each take, and holds no signed address', /In R2, checked/.test(log) && /Takes go to: R2/.test(log) && !/X-Amz-Signature|secret\d/.test(log), log.split('\n').slice(0, 3));
  check('the camera line says R2', /R2/.test(lineState || '') || lineState === null || lineState === '', lineState);
  check('the fake R2 saw no bad requests', !r2.errors.length, r2.errors);
  check('no errors on the page', !errors.length, errors);
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ results, log: r2.log, names }, null, 1));
  await browser.close(); server.close();
  const failed = Object.entries(results).filter(([, v]) => !v).map(([k]) => k);
  console.log(failed.length ? `FAIL: ${failed.length} of ${Object.keys(results).length} checks.` : `PASS: all ${Object.keys(results).length} checks. Pictures in ${OUT}`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
