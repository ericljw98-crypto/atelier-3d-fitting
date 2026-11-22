/* ============================================================
   应用内自动更新模块
   - APK 环境：通过 window.AtelierUpdate (Android JS Bridge) 检查/下载/安装
   - 网页环境：通过 fetch 读取 GitHub 版本清单，提示下载
   ============================================================ */

// 与 APK 的 versionCode 保持一致；网页版固定为 0（始终以最新清单为准）
const APP_VERSION_CODE = (typeof window !== 'undefined' && window.AtelierUpdate)
  ? 0 : 0; // 运行时由 APK 桥接返回真实版本
const MANIFEST_URLS = [
  'https://cdn.jsdelivr.net/gh/ericljw98-crypto/atelier-3d-fitting@main/version.json',
  'https://raw.githubusercontent.com/ericljw98-crypto/atelier-3d-fitting/main/version.json',
];
const LS_DISMISS_KEY = 'atelier_update_dismiss_code';

let updateInfo = null;
let checking = false;
let els = {};

function isApk() {
  return typeof window !== 'undefined' && !!window.AtelierUpdate;
}

function fmtSize(bytes) {
  if (!bytes || bytes <= 0) return '';
  return bytes > 1024 * 1024
    ? (bytes / 1024 / 1024).toFixed(1) + ' MB'
    : Math.round(bytes / 1024) + ' KB';
}

/* ---------- 版本检查 ---------- */

async function currentVersionCode() {
  if (isApk()) {
    try { return Number(await window.AtelierUpdate.getVersionCode()) || 0; }
    catch { return 0; }
  }
  return 0; // 网页版不做版本比较，仅展示最新信息
}

async function fetchManifestWeb() {
  for (const url of MANIFEST_URLS) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 7000);
      const res = await fetch(url, { cache: 'no-store', signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const data = await res.json();
      if (data && data.versionCode) return data;
    } catch { /* 尝试下一个源 */ }
  }
  return null;
}

function fetchManifestApk() {
  return new Promise(resolve => {
    let done = false;
    const finish = v => { if (!done) { done = true; resolve(v); } };
    window.__onUpdateResult = raw => {
      try { finish(raw ? JSON.parse(raw) : null); }
      catch { finish(null); }
    };
    setTimeout(() => finish(null), 12000);
    try { window.AtelierUpdate.checkUpdate(); }
    catch { finish(null); }
  });
}

async function checkUpdate({ silent = false, manual = false } = {}) {
  if (checking) return;
  checking = true;
  setButtonState(true);
  try {
    const manifest = isApk() ? await fetchManifestApk() : await fetchManifestWeb();
    if (!manifest) {
      if (!silent) toastCompat('暂时无法连接更新服务器，请稍后重试');
      return;
    }
    const cur = await currentVersionCode();
    const hasNew = isApk() ? manifest.versionCode > cur : false;

    if (!hasNew) {
      if (manual) {
        toastCompat(isApk()
          ? `已是最新版本 v${manifest.versionName}`
          : `网页版为实时最新版本 v${manifest.versionName}，无需更新`);
      }
      hideUpdateDot();
      return;
    }

    updateInfo = manifest;
    const dismissed = Number(localStorage.getItem(LS_DISMISS_KEY) || 0);
    if (manifest.force || dismissed < manifest.versionCode) {
      showUpdateDot();
      if (!silent || manifest.force) openUpdateModal(manifest);
    }
  } finally {
    checking = false;
    setButtonState(false);
  }
}

/* ---------- 弹窗 ---------- */

function openUpdateModal(info) {
  els = ensureUI();
  els.version.textContent = `v${info.versionName}（${info.versionCode}）`;
  els.date.textContent = info.releaseDate || '';
  els.notes.textContent = info.notes || '修复若干问题，提升稳定性。';
  const size = info.apk && info.apk.size ? fmtSize(info.apk.size) : '';
  els.size.textContent = size ? `安装包 ${size}` : '';
  els.modal.classList.add('open');
}

function closeUpdateModal() {
  if (els.modal) els.modal.classList.remove('open');
}

function ensureUI() {
  let backdrop = document.getElementById('update-modal');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'update-modal';
    backdrop.innerHTML = `
      <div class="modal update-modal-card">
        <div class="modal-head">
          <div>
            <h2>发现新版本</h2>
            <p>ATELIER 3D试衣间 有新版本可用</p>
          </div>
          <button class="modal-close" id="update-close" aria-label="关闭">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
        <div class="update-body">
          <div class="update-version-row">
            <span class="update-version" id="update-version">—</span>
            <span class="update-date" id="update-date"></span>
          </div>
          <p class="update-notes" id="update-notes"></p>
          <p class="update-size" id="update-size"></p>
          <div class="update-progress" id="update-progress" hidden>
            <div class="update-progress-bar" id="update-progress-bar"></div>
            <span id="update-progress-text">准备下载…</span>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-secondary" id="update-later">稍后再说</button>
          <button class="btn-primary" id="update-now">立即更新</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);

    document.getElementById('update-close').addEventListener('click', closeUpdateModal);
    document.getElementById('update-later').addEventListener('click', () => {
      if (updateInfo) localStorage.setItem(LS_DISMISS_KEY, String(updateInfo.versionCode));
      closeUpdateModal();
    });
    document.getElementById('update-now').addEventListener('click', startUpdate);
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeUpdateModal(); });
  }
  return {
    backdrop,
    modal: backdrop,
    version: document.getElementById('update-version'),
    date: document.getElementById('update-date'),
    notes: document.getElementById('update-notes'),
    size: document.getElementById('update-size'),
    progress: document.getElementById('update-progress'),
    progressBar: document.getElementById('update-progress-bar'),
    progressText: document.getElementById('update-progress-text'),
    later: document.getElementById('update-later'),
    now: document.getElementById('update-now'),
  };
}

/* ---------- 下载安装 ---------- */

function startUpdate() {
  if (!updateInfo || !updateInfo.apk) return;
  const apk = updateInfo.apk;
  const url = apk.url || apk.fallbackUrl;

  if (!isApk()) {
    // 网页版：直接跳转下载
    window.open(url, '_blank');
    toastCompat('已在新标签页打开下载链接');
    return;
  }

  // APK：先检查未知来源安装权限
  let canInstall = true;
  try { canInstall = window.AtelierUpdate.canInstallUnknownApps(); } catch { /* 视为已授予 */ }
  if (!canInstall) {
    toastCompat('请先允许「安装未知应用」权限');
    try { window.AtelierUpdate.openInstallPermissionSettings(); } catch { /* ignore */ }
    return;
  }

  // 安装回调
  window.__onDownloadStart = () => {
    els.progress.hidden = false;
    els.progressText.textContent = '正在下载安装包…';
    els.progressBar.style.width = '20%';
    els.now.disabled = true;
    els.now.textContent = '下载中…';
    els.later.textContent = '后台下载';
  };
  window.__onDownloadComplete = () => {
    if (!els.progress) return;
    els.progressBar.style.width = '100%';
    els.progressText.textContent = '下载完成，正在打开安装…';
    els.now.textContent = '安装中…';
  };
  window.__needInstallPermission = () => {
    toastCompat('请允许本应用安装未知应用后重试');
  };

  els.progress.hidden = false;
  els.progressBar.style.width = '10%';
  els.progressText.textContent = '正在启动下载…';
  try { window.AtelierUpdate.downloadAndInstall(url); }
  catch { toastCompat('下载启动失败，请检查网络'); }
}

/* ---------- 小工具 ---------- */

function setButtonState(busy) {
  const btn = document.getElementById('btn-check-update');
  if (!btn) return;
  btn.style.opacity = busy ? '0.6' : '';
  btn.style.pointerEvents = busy ? 'none' : '';
}
function showUpdateDot() {
  const dot = document.getElementById('update-dot');
  if (dot) dot.hidden = false;
}
function hideUpdateDot() {
  const dot = document.getElementById('update-dot');
  if (dot) dot.hidden = true;
}
function toastCompat(msg) {
  if (typeof window.__atelierToast === 'function') { window.__atelierToast(msg); return; }
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- 初始化 ---------- */

export function initUpdate() {
  const btn = document.getElementById('btn-check-update');
  if (btn) btn.addEventListener('click', () => checkUpdate({ silent: false, manual: true }));

  // 启动后延迟静默检查，避免影响首次建档体验
  setTimeout(() => checkUpdate({ silent: true }), isApk() ? 2500 : 4000);
}
