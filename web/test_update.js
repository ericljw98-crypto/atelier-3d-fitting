const fs = require('fs');
const http = require('http');
const CDP = 'http://127.0.0.1:9223';
function get(p) { return new Promise((res, rej) => http.get(CDP + p, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej)); }

async function main() {
  const tabs = await get('/json/list');
  const tab = tabs.find(t => t.type === 'page');
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const pending = new Map(); const errors = [];
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text + ' ' + (m.params.exceptionDetails.exception?.description || ''));
  });
  function send(method, params = {}) { return new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); }); }
  async function evalJs(expr) {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result.result?.value;
  }

  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });

  // --- 场景1：网页版，注入模拟版本清单响应，验证弹窗 ---
  await send('Page.navigate', { url: 'http://127.0.0.1:8099/?upd=' + Date.now() });
  await new Promise(r => setTimeout(r, 2000));

  // 覆盖 fetch，让 version.json 请求返回模拟的新版本数据
  await evalJs(`(() => {
    const origFetch = window.fetch;
    window.fetch = function(url, opts) {
      if (String(url).indexOf('version.json') >= 0) {
        return Promise.resolve(new Response(JSON.stringify({
          versionCode: 99, versionName: '9.9',
          releaseDate: '2026-12-01', force: false,
          notes: '测试更新说明：修复若干问题并提升稳定性。',
          apk: { url: 'https://example.com/test.apk', size: 712000, sha256: '' }
        }), { status: 200, headers: {'Content-Type':'application/json'} }));
      }
      return origFetch.apply(this, arguments);
    };
    return 'fetch patched';
  })()`);

  // 点击检查更新按钮
  await evalJs(`document.getElementById('btn-check-update').click()`);
  await new Promise(r => setTimeout(r, 1200));
  const modalState = await evalJs(`JSON.stringify({
    open: document.getElementById('update-modal')?.classList.contains('open'),
    version: document.getElementById('update-version')?.textContent,
    notes: document.getElementById('update-notes')?.textContent,
    size: document.getElementById('update-size')?.textContent,
    dotVisible: !document.getElementById('update-dot')?.hidden
  })`);
  console.log('WEB_MODAL:', modalState);

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('test_update_modal.png', Buffer.from(shot.result.data, 'base64'));
  console.log('MODAL_SHOT saved');

  // --- 场景2：模拟 APK 桥接，验证版本比较 ---
  await evalJs(`(() => {
    localStorage.removeItem('atelier_update_dismiss_code');
    window.AtelierUpdate = {
      getVersionCode: () => 1,
      checkUpdate: () => {
        setTimeout(() => window.__onUpdateResult && window.__onUpdateResult(JSON.stringify({
          versionCode: 2, versionName: '1.1', releaseDate: '2026-11-22', force: true,
          notes: '新版 1.1：首次进入即显示 3D 模特；加入应用内自动更新。',
          apk: { url: 'https://example.com/a.apk', size: 692926 }
        })), 100);
      },
      canInstallUnknownApps: () => true,
      downloadAndInstall: (u) => { window.__dlCalled = u; window.__onDownloadStart && window.__onDownloadStart(); },
      openInstallPermissionSettings: () => {},
      openDownloadPage: () => {}
    };
    document.getElementById('update-modal')?.classList.remove('open');
    document.getElementById('btn-check-update').click();
    return 'bridge injected';
  })()`);
  await new Promise(r => setTimeout(r, 1000));
  const apkState = await evalJs(`JSON.stringify({
    open: document.getElementById('update-modal')?.classList.contains('open'),
    version: document.getElementById('update-version')?.textContent,
    later: document.getElementById('update-later')?.textContent
  })`);
  console.log('APK_MODAL:', apkState);

  // 点击立即更新，验证桥接调用
  await evalJs(`document.getElementById('update-now').click()`);
  await new Promise(r => setTimeout(r, 500));
  const dl = await evalJs(`JSON.stringify({ called: window.__dlCalled || null, progressHidden: document.getElementById('update-progress')?.hidden, btn: document.getElementById('update-now')?.textContent })`);
  console.log('DOWNLOAD:', dl);

  // --- 场景3：已是最新版本，不应弹窗 ---
  await evalJs(`(() => {
    window.AtelierUpdate.getVersionCode = () => 5;
    document.getElementById('update-modal')?.classList.remove('open');
    document.getElementById('btn-check-update').click();
    return 'ok';
  })()`);
  await new Promise(r => setTimeout(r, 800));
  const noNew = await evalJs(`JSON.stringify({ open: document.getElementById('update-modal')?.classList.contains('open') })`);
  console.log('NO_NEW:', noNew);

  console.log('ERRORS:', errors.length ? errors.join(' | ') : 'none');
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exit(1); });
