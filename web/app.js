import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DB, DB_BY_ID, DB_CATEGORIES, DB_META, SIZE_CHART, SIZES, SILHOUETTE_NAMES, PALETTE, slotOf } from './data.js';
import { DEFAULT_MODEL, FIELD_META, FOOT_Y, buildBody, modelSummary, bodyMetrics } from './body.js';
import { buildGarment, recommendSize, specText } from './garment.js';

/* ============================================================
   3D 场景（沿用既有渲染框架）
   ============================================================ */
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
camera.position.set(0, 0.35, 6.2);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.target.set(0, 0, 0);
controls.minDistance = 3.2;
controls.maxDistance = 10;
controls.minPolarAngle = Math.PI * 0.12;
controls.maxPolarAngle = Math.PI * 0.88;
controls.enablePan = false;

scene.add(new THREE.AmbientLight(0xffffff, 0.55));
scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x2a2118, 0.55));
const key = new THREE.DirectionalLight(0xfff3e0, 2.1);
key.position.set(3.5, 6, 5);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
key.shadow.camera.left = -3; key.shadow.camera.right = 3;
key.shadow.camera.top = 4; key.shadow.camera.bottom = -3;
key.shadow.bias = -0.0008;
scene.add(key);
const fill = new THREE.DirectionalLight(0xa8c0ff, 0.8);
fill.position.set(-4, 2, -3); scene.add(fill);
const rim = new THREE.DirectionalLight(0xffd9a8, 0.9);
rim.position.set(0, 3, -5); scene.add(rim);

const platform = new THREE.Mesh(
  new THREE.CylinderGeometry(1.85, 1.85, 0.09, 64),
  new THREE.MeshStandardMaterial({ color: 0x1b2029, roughness: 0.55, metalness: 0.25 })
);
platform.position.y = -1.80; platform.receiveShadow = true; scene.add(platform);
const ring = new THREE.Mesh(
  new THREE.RingGeometry(1.86, 1.90, 64),
  new THREE.MeshBasicMaterial({ color: 0xc9a87c, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
);
ring.rotation.x = -Math.PI / 2; ring.position.y = -1.75; scene.add(ring);

const avatarGroup = new THREE.Group();
const garmentGroup = new THREE.Group();
avatarGroup.add(garmentGroup);
scene.add(avatarGroup);

/* ============================================================
   应用状态
   ============================================================ */
const LS_KEY = 'atelier_model_profile_v1';
const state = {
  model: null,                         // 建档后的模特参数
  category: 'dresses',
  size: 'IT 40',
  outfit: { tops: null, bottoms: null, dresses: null, outer: null },
  activeSlot: null,
  color: PALETTE.black.hex,
  colorName: PALETTE.black.name,
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return (p && typeof p.height === 'number') ? p : null;
  } catch { return null; }
}
function saveProfile(p) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch { /* 隐私模式忽略 */ }
}

/* 重建人体：先清空再按当前档案构建 */
let currentAvatarMesh = null;
function rebuildAvatar() {
  if (currentAvatarMesh) {
    avatarGroup.remove(currentAvatarMesh);
    currentAvatarMesh.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
  }
  currentAvatarMesh = buildBody(state.model);
  avatarGroup.remove(garmentGroup);
  avatarGroup.add(currentAvatarMesh);
  avatarGroup.add(garmentGroup);
  applyBodyScale();
}
function applyBodyScale() {
  const k = bodyMetrics(state.model);
  avatarGroup.scale.set(k.hs, k.hs, k.hs);
  avatarGroup.position.y = FOOT_Y * (1 - k.hs);
}

/* ============================================================
   着装逻辑
   ============================================================ */
function clearSlot(slot) {
  const item = state.outfit[slot];
  if (!item) return;
  garmentGroup.remove(item.group);
  item.group.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
  state.outfit[slot] = null;
}
function selectGarment(itemId, opt = {}) {
  const item = DB_BY_ID[itemId];
  if (!item || !state.model) return;
  const slot = slotOf(item);
  if (slot === 'dresses') { ['tops', 'bottoms', 'dresses'].forEach(clearSlot); }
  else if (slot === 'tops' || slot === 'bottoms') { clearSlot('dresses'); clearSlot(slot); }
  else clearSlot(slot);

  const color = opt.color ?? state.color;
  const colorName = opt.colorName ?? state.colorName;
  const group = buildGarment(itemId, state.size, state.model, color);
  if (!group) return;
  garmentGroup.add(group);
  state.outfit[slot] = { id: itemId, slot, group, color, colorName };
  state.activeSlot = slot;
  state.color = color; state.colorName = colorName;
  renderGarments(); renderSummary(); updateStatus(); renderColors();
  toast(`已试穿：${item.name}`);
}
function clearAll() {
  Object.keys(state.outfit).forEach(clearSlot);
  state.activeSlot = null;
  renderGarments(); renderSummary(); updateStatus();
}
function setColor(hex, name) {
  state.color = hex; state.colorName = name;
  if (state.activeSlot && state.outfit[state.activeSlot]) {
    const entry = state.outfit[state.activeSlot];
    entry.group.userData.dyeMaterials?.forEach(m => m.color.setHex(hex));
    entry.color = hex; entry.colorName = name;
    renderSummary();
  } else toast('请先选择一件服饰');
  renderColors();
}

/* ============================================================
   UI 元素
   ============================================================ */
const els = {
  tabs: document.getElementById('category-tabs'),
  list: document.getElementById('garment-list'),
  colors: document.getElementById('color-swatches'),
  sizes: document.getElementById('size-buttons'),
  sizeHint: document.getElementById('size-hint'),
  views: document.getElementById('view-buttons'),
  summary: document.getElementById('outfit-summary'),
  status: document.getElementById('stage-status'),
  toast: document.getElementById('toast'),
  modelChip: document.getElementById('model-chip'),
};

const SWATCHES = [
  PALETTE.black, PALETTE.ivory, PALETTE.red, PALETTE.wine,
  PALETTE.navy, PALETTE.emerald, PALETTE.camel, PALETTE.gold,
  PALETTE.powder, PALETTE.leopard, PALETTE.olive, PALETTE.chocolate,
];

function renderCategories() {
  els.tabs.innerHTML = DB_CATEGORIES.map(c =>
    `<button class="category-tab ${c.id === state.category ? 'active' : ''}" data-cat="${c.id}">${c.name}<span class="tab-count">${DB.filter(g => g.category === c.id).length}</span></button>`
  ).join('');
  els.tabs.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat;
      renderCategories(); renderGarments();
    });
  });
}

function renderGarments() {
  const items = DB.filter(g => g.category === state.category);
  els.list.innerHTML = items.map(item => {
    const chosen = Object.values(state.outfit).some(o => o && o.id === item.id);
    const sw = item.colors.slice(0, 4).map(c =>
      `<i style="background:#${c.hex.toString(16).padStart(6, '0')}"></i>`).join('');
    return `<div class="garment-card db-card ${chosen ? 'selected' : ''}" data-id="${item.id}">
      <span class="garment-check"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <div class="db-card-head">
        <span class="db-code">${item.code}</span>
        <span class="db-fit">${item.fit}</span>
      </div>
      <div class="garment-name">${item.name}</div>
      <div class="db-meta">${SILHOUETTE_NAMES[item.silhouette] || item.silhouette} · ${item.fabric}</div>
      <div class="db-foot"><span class="db-swatches">${sw}</span><span class="db-spec">${specText(item, state.size)}</span></div>
    </div>`;
  }).join('');
  els.list.querySelectorAll('.garment-card').forEach(card => {
    card.addEventListener('click', () => selectGarment(card.dataset.id));
  });
}

function renderColors() {
  els.colors.innerHTML = SWATCHES.map(c =>
    `<div class="swatch ${c.hex === state.color ? 'active' : ''}" data-hex="${c.hex}" data-name="${c.name}" title="${c.name}" style="background:#${c.hex.toString(16).padStart(6, '0')}"></div>`
  ).join('');
  els.colors.querySelectorAll('.swatch').forEach(sw => {
    sw.addEventListener('click', () => setColor(parseInt(sw.dataset.hex, 10), sw.dataset.name));
  });
}

function renderSizes() {
  const rec = recommendSize(state.model || DEFAULT_MODEL);
  els.sizes.innerHTML = SIZES.map(s =>
    `<button class="${s === state.size ? 'active' : ''}" data-size="${s}">${s}${s === rec ? '<i class="rec-dot"></i>' : ''}</button>`
  ).join('');
  els.sizes.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      state.size = b.dataset.size;
      renderSizes(); renderGarments(); recomputeOutfitForSize();
    });
  });
  els.sizeHint.textContent = `按胸围 ${state.model?.bust ?? 90}cm 推荐 ${rec} · 圆点为推荐码`;
}

/* 换尺码后，用新尺码重建已穿服装 */
function recomputeOutfitForSize() {
  Object.keys(state.outfit).forEach(slot => {
    const entry = state.outfit[slot];
    if (!entry) return;
    const color = entry.color;
    const group = buildGarment(entry.id, state.size, state.model, color);
    garmentGroup.remove(entry.group);
    entry.group.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
    garmentGroup.add(group);
    entry.group = group;
  });
  renderSummary();
}

function renderSummary() {
  const worn = Object.values(state.outfit).filter(Boolean);
  if (!worn.length) {
    els.summary.innerHTML = '<div class="outfit-empty">尚未选择服饰</div>';
    return;
  }
  els.summary.innerHTML = worn.map(o => {
    const item = DB_BY_ID[o.id];
    const hex = '#' + (o.color >>> 0).toString(16).padStart(6, '0');
    return `<div class="outfit-row"><span class="label">${item.name}<small>${state.size}</small></span><span class="value"><span class="dot" style="background:${hex}"></span>${o.colorName || ''}</span></div>`;
  }).join('');
}
function updateStatus() {
  const n = Object.values(state.outfit).filter(Boolean).length;
  els.status.textContent = n ? `已搭配 ${n} 件 · ${state.size}` : '未着装';
  els.status.classList.toggle('has-outfit', n > 0);
}
function renderModelChip() {
  els.modelChip.textContent = state.model ? modelSummary(state.model) : '未建档';
}

let toastTimer = null;
function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2200);
}

/* ============================================================
   建档向导
   ============================================================ */
const profileModal = document.getElementById('profile-modal');
const profileForm = document.getElementById('profile-form');
const profileTitle = document.getElementById('profile-title');
const profileSubtitle = document.getElementById('profile-subtitle');
let profileDraft = { ...DEFAULT_MODEL };

function openProfileModal(isEdit) {
  profileDraft = { ...(state.model || DEFAULT_MODEL) };
  profileTitle.textContent = isEdit ? '编辑模特档案' : '建立模特档案';
  profileSubtitle.textContent = '请填写身体测量数据，这些参数将决定 3D 模特体型与服装的合身程度';
  document.getElementById('profile-save').textContent = isEdit ? '保存并更新' : '创建模特并开始';
  renderProfileForm();
  profileModal.classList.add('open');
}
function closeProfileModal() { profileModal.classList.remove('open'); }

function renderProfileForm() {
  const groups = [
    { title: '基础信息', fields: FIELD_META.slice(0, 2) },
    { title: '三围数据', fields: FIELD_META.slice(2, 5) },
    { title: '体态细节', fields: FIELD_META.slice(5) },
  ];
  profileForm.innerHTML = groups.map(grp => `
    <div class="profile-group">
      <h4>${grp.title}</h4>
      ${grp.fields.map(f => `
        <div class="profile-field">
          <div class="profile-field-label">
            <label for="pf-${f.key}">${f.label}</label>
            <span class="pf-hint">${f.hint}</span>
          </div>
          <div class="profile-input-row">
            <input type="range" id="pf-range-${f.key}" data-key="${f.key}" min="${f.min}" max="${f.max}" step="${f.step}" value="${profileDraft[f.key]}" />
            <div class="number-wrap">
              <input type="number" id="pf-${f.key}" data-key="${f.key}" min="${f.min}" max="${f.max}" step="${f.step}" value="${profileDraft[f.key]}" />
              <span>${f.unit}</span>
            </div>
          </div>
        </div>`).join('')}
    </div>`).join('');

  profileForm.querySelectorAll('input[type=range]').forEach(r => {
    r.addEventListener('input', e => {
      const key = e.target.dataset.key;
      profileDraft[key] = parseFloat(e.target.value);
      profileForm.querySelector(`#pf-${key}`).value = profileDraft[key];
      updateRangeFill(r);
      updateProfilePreview();
    });
  });
  profileForm.querySelectorAll('input[type=number]').forEach(n => {
    n.addEventListener('input', e => {
      const key = e.target.dataset.key;
      const f = FIELD_META.find(x => x.key === key);
      let v = parseFloat(e.target.value);
      if (!isFinite(v)) return;
      v = Math.min(f.max, Math.max(f.min, v));
      profileDraft[key] = v;
      const range = profileForm.querySelector(`#pf-range-${key}`);
      range.value = v; updateRangeFill(range);
      updateProfilePreview();
    });
  });
  profileForm.querySelectorAll('input[type=range]').forEach(updateRangeFill);
  updateProfilePreview();
}
function updateRangeFill(el) {
  const min = parseFloat(el.min), max = parseFloat(el.max);
  const p = (parseFloat(el.value) - min) / (max - min) * 100;
  el.style.setProperty('--fill', p + '%');
}
function updateProfilePreview() {
  const box = document.getElementById('profile-live-summary');
  if (box) box.textContent = modelSummary(profileDraft);
  const rec = recommendSize(profileDraft);
  const recBox = document.getElementById('profile-rec-size');
  if (recBox) recBox.textContent = `推荐尺码 ${rec}`;
}

document.getElementById('profile-save').addEventListener('click', () => {
  state.model = { ...profileDraft };
  saveProfile(state.model);
  const rec = recommendSize(state.model);
  state.size = rec;
  rebuildAvatar();
  renderSizes(); renderModelChip(); renderGarments(); renderSummary(); updateStatus();
  closeProfileModal();
  toast(`模特档案已建立 · 推荐 ${rec}`);
});
document.getElementById('profile-cancel').addEventListener('click', () => {
  if (!state.model) return; // 首次建档不可取消
  closeProfileModal();
});
document.getElementById('btn-edit-model').addEventListener('click', () => openProfileModal(true));

/* ============================================================
   视角与操作
   ============================================================ */
const VIEWS = {
  front: new THREE.Vector3(0, 0.35, 6.2),
  side: new THREE.Vector3(6.2, 0.35, 0),
  back: new THREE.Vector3(0, 0.35, -6.2),
};
let camAnim = null;
function moveCameraTo(pos) { camAnim = { from: camera.position.clone(), to: pos.clone(), t: 0 }; }
els.views.querySelectorAll('button').forEach(b => {
  b.addEventListener('click', () => {
    els.views.querySelectorAll('button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    moveCameraTo(VIEWS[b.dataset.view]);
  });
});
document.getElementById('btn-reset').addEventListener('click', () => {
  clearAll();
  moveCameraTo(VIEWS.front);
  els.views.querySelectorAll('button').forEach(x => x.classList.remove('active'));
  els.views.querySelector('[data-view="front"]').classList.add('active');
});
document.getElementById('btn-clear').addEventListener('click', clearAll);
document.getElementById('btn-snapshot').addEventListener('click', () => {
  renderer.render(scene, camera);
  const a = document.createElement('a');
  a.href = renderer.domElement.toDataURL('image/png');
  a.download = 'atelier-look.png'; a.click();
  toast('造型图片已保存');
});

/* ============================================================
   渲染循环
   ============================================================ */
function resize() {
  const w = container.clientWidth, h = container.clientHeight;
  if (!w || !h) return;
  camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
new ResizeObserver(resize).observe(container);
window.addEventListener('resize', resize);
function animate() {
  requestAnimationFrame(animate);
  if (camAnim) {
    camAnim.t += 0.06;
    const e = 1 - Math.pow(1 - camAnim.t, 3);
    camera.position.lerpVectors(camAnim.from, camAnim.to, e);
    if (camAnim.t >= 1) camAnim = null;
  }
  controls.update();
  renderer.render(scene, camera);
}

/* ============================================================
   照片识别换衣（修复版）
   ------------------------------------------------------------
   修复点：
   1) 文件输入框移出 drop-zone，避免 click 事件冒泡递归触发文件选择器
   2) 不依赖 file.type / 扩展名，直接读取文件字节并用 magic bytes 判定图片类型，
      解决 APK 内 copyToInternal 生成 .img 导致 MIME 丢失的问题
   3) 主色提取加入四角背景估计 + 中心区域加权 + 低饱和过滤，抗真实照片背景干扰
   ============================================================ */
const photoModal = document.getElementById('photo-modal');
const dropZone = document.getElementById('drop-zone');
const photoFile = document.getElementById('photo-file');
const scanResult = document.getElementById('scan-result');
const scanImg = document.getElementById('scan-img');
const detectedSwatch = document.getElementById('detected-swatch');
const detectedColorName = document.getElementById('detected-color-name');
const detectedTypeName = document.getElementById('detected-type-name');
const detectedSpec = document.getElementById('detected-spec');
const matchSelect = document.getElementById('detected-match');
const applyBtn = document.getElementById('photo-apply');
let detected = null;

function openPhotoModal() {
  if (!state.model) { toast('请先建立模特档案'); return; }
  photoModal.classList.add('open');
}
function closePhotoModal() { photoModal.classList.remove('open'); }
document.getElementById('btn-photo-upload').addEventListener('click', openPhotoModal);
document.getElementById('photo-modal-close').addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', e => { if (e.target === photoModal) closePhotoModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closePhotoModal(); closeProfileModal(); } });

// 关键修复：dropZone 只负责视觉，click 直接触发文件输入；输入框不在 dropZone 内部，无冒泡递归
dropZone.addEventListener('click', () => photoFile.click());
photoFile.addEventListener('change', e => {
  if (e.target.files && e.target.files[0]) handlePhoto(e.target.files[0]);
  e.target.value = '';
});
['dragenter', 'dragover'].forEach(ev =>
  dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.add('dragover'); })
);
['dragleave', 'drop'].forEach(ev =>
  dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.remove('dragover'); })
);
dropZone.addEventListener('drop', e => {
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (file) handlePhoto(file); else toast('请上传图片文件');
});

function resetScanUI() {
  detected = null; applyBtn.disabled = true;
  scanResult.hidden = true; dropZone.style.display = '';
  photoFile.value = ''; scanImg.removeAttribute('src');
}

/* 用 magic bytes 判定真实图片类型，绕开 MIME / 扩展名丢失 */
function sniffImageType(bytes) {
  if (!bytes || bytes.length < 4) return null;
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return 'image/png';
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) return 'image/webp';
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return 'image/gif';
  if (bytes[0] === 0x42 && bytes[1] === 0x4D) return 'image/bmp';
  return null;
}

function handlePhoto(file) {
  const reader = new FileReader();
  reader.onerror = () => toast('文件读取失败，请换一张试试');
  reader.onload = e => {
    const bytes = new Uint8Array(e.target.result);
    const type = sniffImageType(bytes) || (file.type && file.type.startsWith('image/') ? file.type : null);
    if (!type) { toast('无法识别该图片格式，请上传 JPG / PNG / WEBP'); return; }
    const blob = new Blob([bytes], { type });
    const url = URL.createObjectURL(blob);
    analyzePhoto(url);
  };
  reader.readAsArrayBuffer(file);
}

function analyzePhoto(url) {
  const img = new Image();
  img.onload = () => {
    const color = extractDominantColor(img);
    const guess = guessGarment(img, color, color.subjectRatio);
    scanImg.src = url;
    const cssHex = '#' + color.hex.toString(16).padStart(6, '0');
    detectedSwatch.style.background = cssHex;
    detectedColorName.textContent = color.name;
    detectedTypeName.textContent = SILHOUETTE_NAMES[guess.silhouette] || guess.label;
    detectedSpec.textContent = `${guess.item.name} · ${guess.item.code}`;

    // 下拉框：按品类分组，识别结果置顶选中
    matchSelect.innerHTML = '';
    DB_CATEGORIES.forEach(cat => {
      const og = document.createElement('optgroup');
      og.label = cat.name;
      DB.filter(g => g.category === cat.id).forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id; opt.textContent = g.name;
        if (g.id === guess.item.id) opt.selected = true;
        og.appendChild(opt);
      });
      matchSelect.appendChild(og);
    });
    detected = { hex: color.hex, colorName: color.name, garmentId: guess.item.id };
    dropZone.style.display = 'none';
    scanResult.hidden = false;
    applyBtn.disabled = false;
  };
  img.onerror = () => { toast('图片解码失败，请换一张试试'); URL.revokeObjectURL(url); };
  img.src = url;
}

/* 主体主色：四角背景估计 + 中心加权 + 低饱和过滤 + 颜色量化 */
function extractDominantColor(img) {
  const W = 128, H = 128;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  const scale = Math.min(W / img.width, H / img.height);
  const dw = img.width * scale, dh = img.height * scale;
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
  const d = ctx.getImageData(0, 0, W, H).data;

  // 四角取样估计背景色
  const corners = [];
  const cs = 10;
  [[0, 0], [W - cs, 0], [0, H - cs], [W - cs, H - cs]].forEach(([x, y]) => {
    let r = 0, g = 0, b = 0, n = 0;
    for (let yy = y; yy < y + cs; yy++) for (let xx = x; xx < x + cs; xx++) {
      const i = (yy * W + xx) * 4; r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
    }
    corners.push([r / n, g / n, b / n]);
  });
  const bg = [0, 1, 2].map(c => corners.reduce((s, p) => s + p[c], 0) / corners.length);

  const buckets = new Map();
  const cx = W / 2, cy = H / 2;
  // 主体包围盒（排除背景后的有效像素范围），用于判断衣服实际形状
  let minX = W, maxX = 0, minY = H, maxY = 0, subjectCount = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
    if (a < 128) continue;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    // 排除接近背景的像素
    const distBg = Math.abs(r - bg[0]) + Math.abs(g - bg[1]) + Math.abs(b - bg[2]);
    if (distBg < 48 && mn > 150) continue;
    if (mn > 240 && mx - mn < 18) continue;   // 纯白
    if (mx < 20) continue;                    // 纯黑
    // 记录主体范围
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    subjectCount++;
    // 中心区域权重更高
    const nx = (x - cx) / cx, ny = (y - cy) / cy;
    const w = 1 + 1.5 * Math.max(0, 1 - Math.sqrt(nx * nx + ny * ny));
    const key = ((r >> 5) << 6) | ((g >> 5) << 3) | (b >> 5);
    let bk = buckets.get(key);
    if (!bk) { bk = { n: 0, r: 0, g: 0, b: 0 }; buckets.set(key, bk); }
    bk.n += w; bk.r += r * w; bk.g += g * w; bk.b += b * w;
  }
  const subjectRatio = subjectCount > 30
    ? (maxY - minY) / Math.max(1, maxX - minX)
    : img.height / img.width;

  let r = 90, g = 90, b = 90;
  if (buckets.size) {
    let best = null;
    buckets.forEach(v => { if (!best || v.n > best.n) best = v; });
    r = Math.round(best.r / best.n); g = Math.round(best.g / best.n); b = Math.round(best.b / best.n);
  }
  // 明度归一化，避免过暗/过曝
  const hsl = rgbToHsl(r, g, b);
  let L = Math.min(0.8, Math.max(0.22, hsl[2]));
  const rgb = hslToRgb(hsl[0], hsl[1], L);
  return {
    hex: (rgb[0] << 16) | (rgb[1] << 8) | rgb[2],
    name: colorName(rgb[0], rgb[1], rgb[2]),
    subjectRatio,
  };
}

/* 款式识别：按画面中衣服主体的包围盒长宽比 + 颜色明度，映射到数据库品类与版型
   subRatio = 主体高度/宽度：>1.6 长款连衣裙；1.15~1.6 中长裙/裤；<0.9 上装；其余上装 */
function guessGarment(img, color, subRatio) {
  const ratio = subRatio || img.height / img.width;
  const hsl = rgbToHsl((color.hex >> 16) & 255, (color.hex >> 8) & 255, color.hex & 255);
  let category, silhouette, label;
  if (ratio > 1.6) {
    category = 'dresses'; silhouette = hsl[1] < 0.25 ? 'fitted' : 'aline';
    label = '长款主体（推测连衣裙）';
  } else if (ratio > 1.15) {
    // 中长主体：深色偏裤装，浅色偏半身裙/中长裙
    if (hsl[2] < 0.35) { category = 'bottoms'; silhouette = 'straight'; label = '竖长深色主体（推测裤装）'; }
    else { category = 'dresses'; silhouette = 'aline'; label = '中长主体（推测连衣裙）'; }
  } else if (ratio < 0.9) {
    category = 'tops'; silhouette = hsl[2] > 0.68 ? 'blouse' : 'fitted';
    label = '宽短主体（推测上装）';
  } else {
    category = 'tops'; silhouette = hsl[1] < 0.2 ? 'knit' : 'fitted';
    label = '常规比例（推测上装）';
  }
  // 优先匹配品类 + 版型，其次按明度挑合体/宽松款
  const candidates = DB.filter(g => g.category === category);
  const item = candidates.find(g => g.silhouette === silhouette)
            || candidates.find(g => g.fit === (hsl[1] < 0.2 ? '宽松' : '合体'))
            || candidates[0]
            || DB[0];
  return { item, silhouette: item.silhouette, label, category };
}

function colorName(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  if (s < 0.13) {
    if (l > 0.88) return '白色';
    if (l < 0.16) return '黑色';
    return '灰色';
  }
  const hue = h * 360;
  if (hue < 15 || hue >= 345) return l < 0.45 ? '酒红' : '红色';
  if (hue < 42) return l < 0.4 ? '棕色' : (s < 0.45 ? '驼色' : '橙色');
  if (hue < 70) return '黄色';
  if (hue < 160) return l < 0.4 ? '墨绿' : '绿色';
  if (hue < 200) return '青色';
  if (hue < 255) return l < 0.4 ? '藏蓝' : '蓝色';
  if (hue < 290) return '紫色';
  return l < 0.45 ? '玫红' : '粉色';
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0; const l = (mx + mn) / 2, d = mx - mn;
  if (d) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6; if (h < 0) h += 1;
  }
  return [h, s, l];
}
function hslToRgb(h, s, l) {
  const f = n => {
    const k = (n + h * 12) % 12, a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

document.getElementById('photo-reselect').addEventListener('click', resetScanUI);
applyBtn.addEventListener('click', () => {
  if (!detected) return;
  selectGarment(matchSelect.value || detected.garmentId, { color: detected.hex, colorName: detected.colorName });
  closePhotoModal(); resetScanUI();
  toast('照片识别换衣完成');
});

/* ============================================================
   初始化
   ============================================================ */
const saved = loadProfile();
if (saved) {
  state.model = saved;
  state.size = recommendSize(saved);
  rebuildAvatar();
  openProfileModal(false); // 已有档案：默认展示，可修改或关闭
  // 初始化时不强制弹出，允许直接关闭
  profileModal.classList.remove('open');
}
renderCategories();
renderColors();
renderSizes();
renderModelChip();
resize();
animate();
document.getElementById('loading').classList.add('hidden');

/* 首次使用必须建档 */
if (!state.model) openProfileModal(false);

/* 调试/自动化接口 */
window.__atelier = {
  state, DB, applyProfile(p) {
    state.model = { ...DEFAULT_MODEL, ...p };
    state.size = recommendSize(state.model);
    saveProfile(state.model);
    rebuildAvatar(); renderSizes(); renderModelChip(); renderGarments();
    profileModal.classList.remove('open');
    return state.model;
  },
};
