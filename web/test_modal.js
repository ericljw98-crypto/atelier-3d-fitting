const fs = require('fs');
const http = require('http');
const CDP = 'http://127.0.0.1:9223';
function get(p) { return new Promise((res, rej) => http.get(CDP + p, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej)); }
async function main() {
  const tabs = await get('/json/list');
  const tab = tabs.find(t => t.type === 'page');
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  function send(method, params = {}) { return new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); }); }
  async function evalJs(expr) { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); return r.result.result?.value; }

  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: 'http://127.0.0.1:8099/?m=' + Date.now() });
  await new Promise(r => setTimeout(r, 2000));

  // 模拟 APK：注入桥接，版本 1，清单 2，强制更新，弹窗
  await evalJs(`(() => {
    window.AtelierUpdate = {
      getVersionCode: () => 1,
      checkUpdate: () => setTimeout(() => window.__onUpdateResult && window.__onUpdateResult(JSON.stringify({
        versionCode: 2, versionName: '1.1', releaseDate: '2026-11-22', force: true,
        notes: '新版 1.1：首次进入即显示 3D 模特，建档面板改为侧边不遮挡舞台；加入应用内自动更新，打开即可检查并安装最新版。',
        apk: { url: 'https://example.com/a.apk', size: 692926 }
      })), 80),
      canInstallUnknownApps: () => true,
      downloadAndInstall: () => { window.__onDownloadStart && window.__onDownloadStart(); },
      openInstallPermissionSettings: () => {}, openDownloadPage: () => {}
    };
    document.getElementById('btn-check-update').click();
    return 'ok';
  })()`);
  await new Promise(r => setTimeout(r, 1000));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('test_update_dialog.png', Buffer.from(shot.result.data, 'base64'));
  console.log('DIALOG_SHOT saved');

  // 点立即更新，截取下载进度态
  await evalJs(`document.getElementById('update-now').click()`);
  await new Promise(r => setTimeout(r, 400));
  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('test_update_downloading.png', Buffer.from(shot2.result.data, 'base64'));
  console.log('DOWNLOAD_SHOT saved');
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exit(1); });
