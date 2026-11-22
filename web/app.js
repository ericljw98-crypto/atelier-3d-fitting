import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* ============================================================
   数据定义
   ============================================================ */

const ICONS = {
  tshirt: '<path d="M8 4 4 6 2 10 5.2 11.3 5.2 20 18.8 20 18.8 11.3 22 10 20 6 16 4C15 6.2 9 6.2 8 4Z"/>',
  shirt: '<path d="M8 4 4 6 2 10 5.2 11.3 5.2 20 18.8 20 18.8 11.3 22 10 20 6 16 4 12 7 8 4Z"/><path d="M12 7V20"/>',
  hoodie: '<path d="M8 4 4 6 2 10 5.2 11.3 5.2 20 18.8 20 18.8 11.3 22 10 20 6 16 4C15.5 6.5 8.5 6.5 8 4Z"/><path d="M9.5 5.5C9.5 7 14.5 7 14.5 5.5"/><path d="M9 13H15"/>',
  tank: '<path d="M8 4C8 6 9 7 9.5 7L9 20H15L14.5 7C15 7 16 6 16 4"/><path d="M9 20H15"/>',
  jeans: '<path d="M7 3H17L18 21H13.2L12 11.5L10.8 21H6Z"/><path d="M7 8H17"/>',
  chinos: '<path d="M7 3H17L18 21H13L12 12L11 21H6Z"/><path d="M7 8H17"/>',
  shorts: '<path d="M7 3H17L17.5 15H13V11H11V15H6.5Z"/>',
  skirt: '<path d="M8 4H16L20 20H4Z"/><path d="M8 4H16"/>',
  slip: '<path d="M9 3H15L15.5 9L20 20H4L8.5 9Z"/>',
  aline: '<path d="M9 3H15L16 10L21 21H3L8 10Z"/>',
  evening: '<path d="M9 3H15L16 9C19 13 21 18 21 21H3C3 18 5 13 8 9Z"/>',
  jacket: '<path d="M8 4 4 6 2 10 5.2 11.5 5.2 20 18.8 20 18.8 11.5 22 10 20 6 16 4 12 7 8 4Z"/><path d="M12 7V20M8 11H16"/>',
  trench: '<path d="M8 4 4 6 2 10 5.2 11.5 5.2 21 18.8 21 18.8 11.5 22 10 20 6 16 4 12 7 8 4Z"/><path d="M12 7V21M7 14H17"/>',
};

const COLORS = [
  { name: '曜石黑', hex: 0x1c1d22 },
  { name: '象牙白', hex: 0xeeeae0 },
  { name: '雾灰', hex: 0x8b90a0 },
  { name: '藏蓝', hex: 0x2b3d6b },
  { name: '酒红', hex: 0x8b2b3a },
  { name: '墨绿', hex: 0x2e5b4e },
  { name: '驼色', hex: 0xb08c5a },
  { name: '玫瑰粉', hex: 0xc47b90 },
];

const CATEGORIES = [
  { id: 'tops', name: '上装' },
  { id: 'bottoms', name: '下装' },
  { id: 'dresses', name: '连衣裙' },
  { id: 'outer', name: '外套' },
];

/* ============================================================
   几何工具
   ============================================================ */

function fabricMat(hex) {
  return new THREE.MeshStandardMaterial({
    color: hex,
    roughness: 0.82,
    metalness: 0.03,
    side: THREE.DoubleSide,
  });
}

function makeLathe(profile, zScale, mat) {
  const pts = profile.map(([r, y]) => new THREE.Vector2(r, y));
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), mat);
  if (zScale !== 1) mesh.scale.z = zScale;
  return mesh;
}

function limb(p1, p2, r1, r2, mat) {
  const dir = new THREE.Vector3().subVectors(p2, p1);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r2, r1, len, 16, 1), mat);
  mesh.position.copy(p1).add(p2).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  return mesh;
}

function sphere(pos, scale, mat) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 16), mat);
  m.position.copy(pos);
  m.scale.copy(scale);
  return m;
}

function finish(g, dyeMats) {
  g.userData.dyeMaterials = dyeMats;
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

/* ============================================================
   服装模型构建
   ============================================================ */

const GARMENTS = {
  tops: [
    {
      id: 'tshirt', name: '圆领 T 恤', icon: 'tshirt', slot: 'top',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.27,-0.4],[0.30,-0.25],[0.29,0],[0.25,0.25],[0.28,0.55],[0.33,0.85],[0.35,1.0],[0.30,1.07]], 0.76, mat));
        [-1,1].forEach(s => g.add(limb(new THREE.Vector3(s*0.32,0.93,0), new THREE.Vector3(s*0.54,0.56,0), 0.14, 0.12, mat)));
        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.022, 8, 24), mat);
        collar.rotation.x = Math.PI/2; collar.position.set(0, 1.07, 0); collar.scale.z = 0.8;
        g.add(collar);
        return finish(g, [mat]);
      }
    },
    {
      id: 'shirt', name: '修身衬衫', icon: 'shirt', slot: 'top',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.27,-0.5],[0.30,-0.3],[0.29,0],[0.25,0.25],[0.28,0.55],[0.33,0.85],[0.35,1.0],[0.28,1.08]], 0.76, mat));
        [-1,1].forEach(s => {
          g.add(limb(new THREE.Vector3(s*0.33,0.93,0), new THREE.Vector3(s*0.38,0.42,0), 0.135, 0.11, mat));
          g.add(limb(new THREE.Vector3(s*0.38,0.42,0), new THREE.Vector3(s*0.41,-0.2,0), 0.105, 0.085, mat));
          const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.086, 0.086, 0.07, 14), mat);
          cuff.position.set(s*0.41, -0.2, 0); g.add(cuff);
          const collar = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.15, 0.02), mat);
          collar.position.set(s*0.075, 1.06, 0.075); collar.rotation.z = s*0.5; g.add(collar);
        });
        const placket = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.9, 0.014), mat);
        placket.position.set(0, 0.3, 0.235); g.add(placket);
        return finish(g, [mat]);
      }
    },
    {
      id: 'hoodie', name: '连帽卫衣', icon: 'hoodie', slot: 'top',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.30,-0.5],[0.34,-0.3],[0.33,0],[0.29,0.25],[0.31,0.55],[0.36,0.85],[0.38,1.0],[0.32,1.08]], 0.80, mat));
        [-1,1].forEach(s => {
          g.add(limb(new THREE.Vector3(s*0.35,0.93,0), new THREE.Vector3(s*0.40,0.42,0), 0.15, 0.12, mat));
          g.add(limb(new THREE.Vector3(s*0.40,0.42,0), new THREE.Vector3(s*0.43,-0.18,0), 0.12, 0.095, mat));
        });
        const hood = new THREE.Mesh(new THREE.SphereGeometry(0.29, 24, 16, 0, Math.PI*2, 0, Math.PI*0.58), mat);
        hood.position.set(0, 1.22, -0.07); hood.scale.set(1, 0.9, 0.85); hood.rotation.x = -0.3; g.add(hood);
        const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.18, 0.02), mat);
        pocket.position.set(0, -0.18, 0.265); g.add(pocket);
        return finish(g, [mat]);
      }
    },
    {
      id: 'tank', name: '细带背心', icon: 'tank', slot: 'top',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.27,-0.35],[0.29,-0.2],[0.28,0],[0.25,0.2],[0.28,0.45],[0.31,0.7],[0.30,0.85]], 0.76, mat));
        [-1,1].forEach(s => g.add(limb(new THREE.Vector3(s*0.17,0.83,0), new THREE.Vector3(s*0.16,1.10,0), 0.026, 0.026, mat)));
        return finish(g, [mat]);
      }
    },
  ],

  bottoms: [
    {
      id: 'jeans', name: '直筒牛仔裤', icon: 'jeans', slot: 'bottom',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.26,-0.44],[0.30,-0.28],[0.29,-0.08],[0.28,0.06]], 0.80, mat));
        [-1,1].forEach(s => g.add(limb(new THREE.Vector3(s*0.15,-0.12,0), new THREE.Vector3(s*0.16,-1.58,0), 0.16, 0.115, mat)));
        return finish(g, [mat]);
      }
    },
    {
      id: 'chinos', name: '宽松休闲裤', icon: 'chinos', slot: 'bottom',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.27,-0.44],[0.31,-0.28],[0.30,-0.08],[0.29,0.06]], 0.80, mat));
        [-1,1].forEach(s => g.add(limb(new THREE.Vector3(s*0.15,-0.12,0), new THREE.Vector3(s*0.17,-1.58,0), 0.185, 0.145, mat)));
        return finish(g, [mat]);
      }
    },
    {
      id: 'shorts', name: '运动短裤', icon: 'shorts', slot: 'bottom',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.26,-0.44],[0.30,-0.28],[0.29,-0.08],[0.28,0.06]], 0.80, mat));
        [-1,1].forEach(s => g.add(limb(new THREE.Vector3(s*0.15,-0.12,0), new THREE.Vector3(s*0.16,-0.88,0), 0.175, 0.155, mat)));
        return finish(g, [mat]);
      }
    },
    {
      id: 'skirt', name: 'A 字半裙', icon: 'skirt', slot: 'bottom',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.27,0.02],[0.28,-0.15],[0.35,-0.5],[0.46,-0.9],[0.52,-1.08]], 1, mat));
        const waist = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.02, 8, 30), mat);
        waist.rotation.x = Math.PI/2; waist.position.y = 0.02; waist.scale.z = 0.8; g.add(waist);
        return finish(g, [mat]);
      }
    },
  ],

  dresses: [
    {
      id: 'slip', name: '吊带连衣裙', icon: 'slip', slot: 'dress',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.26,-0.42],[0.29,-0.2],[0.26,0.05],[0.24,0.3],[0.26,0.6],[0.30,0.82],[0.29,0.95]], 0.76, mat));
        g.add(makeLathe([[0.26,0.12],[0.28,-0.15],[0.36,-0.55],[0.48,-1.0],[0.54,-1.18]], 1, mat));
        [-1,1].forEach(s => g.add(limb(new THREE.Vector3(s*0.16,0.9,0), new THREE.Vector3(s*0.16,1.12,0), 0.026, 0.026, mat)));
        return finish(g, [mat]);
      }
    },
    {
      id: 'aline', name: 'A 字连衣裙', icon: 'aline', slot: 'dress',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.27,-0.42],[0.30,-0.2],[0.27,0.05],[0.25,0.3],[0.28,0.6],[0.33,0.85],[0.35,1.0],[0.26,1.07]], 0.78, mat));
        g.add(makeLathe([[0.27,0.1],[0.29,-0.2],[0.38,-0.6],[0.52,-1.05],[0.58,-1.25]], 1, mat));
        [-1,1].forEach(s => g.add(limb(new THREE.Vector3(s*0.32,0.93,0), new THREE.Vector3(s*0.5,0.58,0), 0.13, 0.11, mat)));
        return finish(g, [mat]);
      }
    },
    {
      id: 'evening', name: '优雅晚礼服', icon: 'evening', slot: 'dress',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.25,-0.42],[0.27,-0.2],[0.23,0.05],[0.22,0.3],[0.25,0.6],[0.29,0.85],[0.29,1.0],[0.19,1.08]], 0.74, mat));
        g.add(makeLathe([[0.24,0.08],[0.26,-0.2],[0.32,-0.6],[0.44,-1.1],[0.62,-1.65],[0.66,-1.72]], 1, mat));
        const belt = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.025, 8, 30), mat);
        belt.rotation.x = Math.PI/2; belt.position.y = 0.08; belt.scale.z = 0.78; g.add(belt);
        return finish(g, [mat]);
      }
    },
  ],

  outer: [
    {
      id: 'jacket', name: '短款夹克', icon: 'jacket', slot: 'outer',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.29,-0.25],[0.33,-0.05],[0.31,0.2],[0.29,0.5],[0.35,0.85],[0.38,1.0],[0.30,1.08]], 0.82, mat));
        [-1,1].forEach(s => {
          g.add(limb(new THREE.Vector3(s*0.35,0.93,0), new THREE.Vector3(s*0.40,0.42,0), 0.155, 0.125, mat));
          g.add(limb(new THREE.Vector3(s*0.40,0.42,0), new THREE.Vector3(s*0.43,-0.24,0), 0.125, 0.10, mat));
          const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.22, 0.02), mat);
          lapel.position.set(s*0.09, 0.95, 0.2); lapel.rotation.z = s*0.35; g.add(lapel);
        });
        return finish(g, [mat]);
      }
    },
    {
      id: 'trench', name: '经典风衣', icon: 'trench', slot: 'outer',
      build(color) {
        const mat = fabricMat(color);
        const g = new THREE.Group();
        g.add(makeLathe([[0.31,-0.9],[0.32,-0.5],[0.31,-0.1],[0.30,0.2],[0.29,0.5],[0.35,0.85],[0.38,1.0],[0.30,1.08]], 0.84, mat));
        [-1,1].forEach(s => {
          g.add(limb(new THREE.Vector3(s*0.35,0.93,0), new THREE.Vector3(s*0.40,0.42,0), 0.16, 0.13, mat));
          g.add(limb(new THREE.Vector3(s*0.40,0.42,0), new THREE.Vector3(s*0.43,-0.24,0), 0.13, 0.105, mat));
          const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 0.02), mat);
          lapel.position.set(s*0.09, 0.95, 0.21); lapel.rotation.z = s*0.35; g.add(lapel);
        });
        const belt = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.026, 8, 32), mat);
        belt.rotation.x = Math.PI/2; belt.position.y = 0.0; belt.scale.z = 0.82; g.add(belt);
        return finish(g, [mat]);
      }
    },
  ],
};

const GARMENT_BY_ID = {};
Object.values(GARMENTS).flat().forEach(g => { GARMENT_BY_ID[g.id] = g; });

/* ============================================================
   3D 场景
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

// 灯光
scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x2a2118, 0.55);
scene.add(hemi);
const key = new THREE.DirectionalLight(0xfff3e0, 2.1);
key.position.set(3.5, 6, 5);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
key.shadow.camera.left = -3; key.shadow.camera.right = 3;
key.shadow.camera.top = 4; key.shadow.camera.bottom = -3;
key.shadow.bias = -0.0008;
scene.add(key);
const fill = new THREE.DirectionalLight(0xa8c0ff, 0.8);
fill.position.set(-4, 2, -3);
scene.add(fill);
const rim = new THREE.DirectionalLight(0xffd9a8, 0.9);
rim.position.set(0, 3, -5);
scene.add(rim);

// 地台
const platform = new THREE.Mesh(
  new THREE.CylinderGeometry(1.85, 1.85, 0.09, 64),
  new THREE.MeshStandardMaterial({ color: 0x1b2029, roughness: 0.55, metalness: 0.25 })
);
platform.position.y = -1.80;
platform.receiveShadow = true;
scene.add(platform);

const ring = new THREE.Mesh(
  new THREE.RingGeometry(1.86, 1.90, 64),
  new THREE.MeshBasicMaterial({ color: 0xc9a87c, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
);
ring.rotation.x = -Math.PI/2;
ring.position.y = -1.75;
scene.add(ring);

// 人体
const skinMat = new THREE.MeshStandardMaterial({ color: 0xd9ae86, roughness: 0.86, metalness: 0.0 });
const hairMat = new THREE.MeshStandardMaterial({ color: 0x2c2521, roughness: 0.92, metalness: 0.0 });

function buildAvatar() {
  const g = new THREE.Group();

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 32, 24), skinMat);
  head.scale.set(1, 1.16, 0.94); head.position.set(0, 1.47, 0); g.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.235, 32, 24, 0, Math.PI*2, 0, Math.PI*0.56), hairMat);
  hair.scale.set(1, 1.16, 0.96); hair.position.set(0, 1.49, -0.01); g.add(hair);

  g.add(limb(new THREE.Vector3(0,1.18,0), new THREE.Vector3(0,1.35,0), 0.095, 0.09, skinMat));
  g.add(makeLathe([[0.22,-0.42],[0.26,-0.28],[0.25,-0.05],[0.21,0.2],[0.23,0.5],[0.28,0.78],[0.30,0.95],[0.26,1.05],[0.11,1.12]], 0.72, skinMat));

  [-1,1].forEach(s => {
    g.add(sphere(new THREE.Vector3(s*0.31,0.92,0), new THREE.Vector3(0.115,0.115,0.115), skinMat));
    g.add(limb(new THREE.Vector3(s*0.31,0.92,0), new THREE.Vector3(s*0.36,0.4,0), 0.105, 0.09, skinMat));
    g.add(sphere(new THREE.Vector3(s*0.36,0.4,0), new THREE.Vector3(0.088,0.088,0.088), skinMat));
    g.add(limb(new THREE.Vector3(s*0.36,0.4,0), new THREE.Vector3(s*0.4,-0.12,0), 0.085, 0.065, skinMat));
    g.add(sphere(new THREE.Vector3(s*0.4,-0.2,0), new THREE.Vector3(0.06,0.098,0.045), skinMat));
    g.add(sphere(new THREE.Vector3(s*0.14,-0.38,0), new THREE.Vector3(0.13,0.13,0.13), skinMat));
    g.add(limb(new THREE.Vector3(s*0.14,-0.38,0), new THREE.Vector3(s*0.15,-0.96,0), 0.13, 0.105, skinMat));
    g.add(sphere(new THREE.Vector3(s*0.15,-0.96,0), new THREE.Vector3(0.105,0.105,0.105), skinMat));
    g.add(limb(new THREE.Vector3(s*0.15,-0.96,0), new THREE.Vector3(s*0.16,-1.6,0), 0.10, 0.07, skinMat));
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.1, 0.32), skinMat);
    foot.position.set(s*0.16, -1.68, 0.07); g.add(foot);
  });

  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

const avatarGroup = new THREE.Group();
const avatar = buildAvatar();
avatarGroup.add(avatar);
scene.add(avatarGroup);

const garmentGroup = new THREE.Group();
avatarGroup.add(garmentGroup);

/* ============================================================
   状态与业务逻辑
   ============================================================ */

const state = {
  category: 'tops',
  outfit: { top: null, bottom: null, dress: null, outer: null },
  activeGarment: null,
  color: COLORS[0].hex,
  colorName: COLORS[0].name,
  bodyType: 'standard',
  height: 1.0,
  weight: 1.0,
};

const BODY_PRESETS = {
  slim:     { height: 0.98, weight: 0.84 },
  standard: { height: 1.0,  weight: 1.0 },
  athletic: { height: 1.04, weight: 1.24 },
};

function dyeGarment(g, hex) {
  if (!g || !g.userData.dyeMaterials) return;
  g.userData.dyeMaterials.forEach(m => m.color.setHex(hex));
}

function clearSlot(slot) {
  const item = state.outfit[slot];
  if (!item) return;
  garmentGroup.remove(item.group);
  item.group.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
  state.outfit[slot] = null;
}

function selectGarment(garmentId) {
  const g = GARMENT_BY_ID[garmentId];
  if (!g) return;
  const slot = g.slot;

  if (slot === 'dress') {
    clearSlot('top'); clearSlot('bottom'); clearSlot('dress');
  } else if (slot === 'top' || slot === 'bottom') {
    clearSlot('dress');
    clearSlot(slot);
  } else {
    clearSlot(slot);
  }

  const color = state.color;
  const group = g.build(color);

  // 肩部覆盖：避免关节球体在袖口处露出，让服装衔接更自然
  if (slot === 'top' || slot === 'outer' || g.id === 'aline') {
    const capMat = group.userData.dyeMaterials[0];
    [-1,1].forEach(s => {
      const cap = sphere(new THREE.Vector3(s*0.31, 0.93, 0), new THREE.Vector3(0.15, 0.145, 0.145), capMat);
      group.add(cap);
    });
  }

  garmentGroup.add(group);

  const entry = { id: g.id, name: g.name, slot, group, color: state.color, colorName: state.colorName };
  state.outfit[slot] = entry;
  state.activeGarment = entry;

  renderGarments();
  renderSummary();
  updateStatus();
  toast(`已试穿：${g.name}`);
}

function clearAll() {
  ['top','bottom','dress','outer'].forEach(clearSlot);
  state.activeGarment = null;
  renderGarments();
  renderSummary();
  updateStatus();
  toast('已清空着装');
}

function setColor(hex, name) {
  state.color = hex;
  state.colorName = name;
  if (state.activeGarment) {
    dyeGarment(state.activeGarment.group, hex);
    state.activeGarment.color = hex;
    state.activeGarment.colorName = name;
    renderSummary();
  } else {
    toast('请先选择一件服饰');
  }
  renderColors();
}

const FOOT_Y = -1.73; // 脚底在模型局部坐标中的位置，用于缩放后贴地

function applyBodyScale() {
  avatarGroup.scale.set(state.weight, state.height, state.weight);
  avatarGroup.position.y = FOOT_Y * (1 - state.height);
}

function setBodyType(type) {
  const preset = BODY_PRESETS[type];
  if (!preset) return;
  state.bodyType = type;
  state.height = preset.height;
  state.weight = preset.weight;
  applyBodyScale();
  renderBodyTypes();
  renderSliders();
}

function setHeight(v) {
  state.height = v;
  state.bodyType = 'custom';
  applyBodyScale();
  renderBodyTypes();
  renderSliders('height');
}

function setWeight(v) {
  state.weight = v;
  state.bodyType = 'custom';
  applyBodyScale();
  renderBodyTypes();
  renderSliders('weight');
}

/* ============================================================
   UI 渲染
   ============================================================ */

const els = {
  tabs: document.getElementById('category-tabs'),
  list: document.getElementById('garment-list'),
  colors: document.getElementById('color-swatches'),
  bodies: document.getElementById('body-type-buttons'),
  views: document.getElementById('view-buttons'),
  summary: document.getElementById('outfit-summary'),
  status: document.getElementById('stage-status'),
  toast: document.getElementById('toast'),
  heightSlider: document.getElementById('height-slider'),
  weightSlider: document.getElementById('weight-slider'),
  heightVal: document.getElementById('height-val'),
  weightVal: document.getElementById('weight-val'),
};

function weightLabel(w) {
  if (w < 0.86) return '偏瘦';
  if (w < 0.96) return '纤细';
  if (w <= 1.06) return '标准';
  if (w <= 1.18) return '微壮';
  return '健壮';
}

function renderSliders(skip) {
  const hm = Math.round(state.height * 100) + '%';
  const wm = weightLabel(state.weight);
  els.heightVal.textContent = hm;
  els.weightVal.textContent = wm;
  if (skip !== 'height') {
    els.heightSlider.value = state.height;
    const hp = (state.height - 0.85) / (1.18 - 0.85) * 100;
    els.heightSlider.style.setProperty('--fill', hp + '%');
  }
  if (skip !== 'weight') {
    els.weightSlider.value = state.weight;
    const wp = (state.weight - 0.78) / (1.32 - 0.78) * 100;
    els.weightSlider.style.setProperty('--fill', wp + '%');
  }
}

function renderCategories() {
  els.tabs.innerHTML = CATEGORIES.map(c =>
    `<button class="category-tab ${c.id===state.category?'active':''}" data-cat="${c.id}">${c.name}</button>`
  ).join('');
  els.tabs.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat;
      renderCategories();
      renderGarments();
    });
  });
}

function renderGarments() {
  const items = GARMENTS[state.category];
  els.list.innerHTML = items.map(item => {
    const chosen = Object.values(state.outfit).some(o => o && o.id === item.id);
    return `<div class="garment-card ${chosen?'selected':''}" data-id="${item.id}">
      <span class="garment-check"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <div class="garment-icon"><svg viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round">${ICONS[item.icon]}</svg></div>
      <div class="garment-name">${item.name}</div>
    </div>`;
  }).join('');
  els.list.querySelectorAll('.garment-card').forEach(card => {
    card.addEventListener('click', () => selectGarment(card.dataset.id));
  });
}

function renderColors() {
  els.colors.innerHTML = COLORS.map(c =>
    `<div class="swatch ${c.hex===state.color?'active':''}" data-hex="${c.hex}" title="${c.name}" style="background:#${c.hex.toString(16).padStart(6,'0')}"></div>`
  ).join('');
  els.colors.querySelectorAll('.swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      const hex = parseInt(sw.dataset.hex, 10);
      const c = COLORS.find(x => x.hex === hex);
      setColor(hex, c ? c.name : '');
    });
  });
}

function renderBodyTypes() {
  const types = [['slim','纤细'],['standard','标准'],['athletic','健硕']];
  els.bodies.innerHTML = types.map(([id,name]) =>
    `<button class="${id===state.bodyType?'active':''}" data-type="${id}">${name}</button>`
  ).join('');
  els.bodies.querySelectorAll('button').forEach(b =>
    b.addEventListener('click', () => setBodyType(b.dataset.type))
  );
}

els.heightSlider.addEventListener('input', e => setHeight(parseFloat(e.target.value)));
els.weightSlider.addEventListener('input', e => setWeight(parseFloat(e.target.value)));

function renderSummary() {
  const worn = Object.values(state.outfit).filter(Boolean);
  if (worn.length === 0) {
    els.summary.innerHTML = '<div class="outfit-empty">尚未选择服饰</div>';
    return;
  }
  els.summary.innerHTML = worn.map(o => {
    const hex = '#' + (o.color >>> 0).toString(16).padStart(6, '0');
    return `<div class="outfit-row"><span class="label">${o.name}</span><span class="value"><span class="dot" style="background:${hex}"></span>${o.colorName || ''}</span></div>`;
  }).join('');
}

function updateStatus() {
  const worn = Object.values(state.outfit).filter(Boolean);
  if (worn.length === 0) {
    els.status.textContent = '未着装';
    els.status.classList.remove('has-outfit');
  } else {
    els.status.textContent = `已搭配 ${worn.length} 件`;
    els.status.classList.add('has-outfit');
  }
}

let toastTimer = null;
function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2000);
}

/* ============================================================
   视角与操作
   ============================================================ */

const VIEWS = {
  front: new THREE.Vector3(0, 0.35, 6.2),
  side: new THREE.Vector3(6.2, 0.35, 0),
  back: new THREE.Vector3(0, 0.35, -6.2),
};
let camAnim = null;

function moveCameraTo(pos) {
  camAnim = { from: camera.position.clone(), to: pos.clone(), t: 0 };
}

els.views.querySelectorAll('button').forEach(b => {
  b.addEventListener('click', () => {
    els.views.querySelectorAll('button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    moveCameraTo(VIEWS[b.dataset.view]);
  });
});

document.getElementById('btn-reset').addEventListener('click', () => {
  clearAll();
  setBodyType('standard');
  moveCameraTo(VIEWS.front);
  els.views.querySelectorAll('button').forEach(x => x.classList.remove('active'));
  els.views.querySelector('[data-view="front"]').classList.add('active');
});

document.getElementById('btn-clear').addEventListener('click', clearAll);

document.getElementById('btn-snapshot').addEventListener('click', () => {
  renderer.render(scene, camera);
  const data = renderer.domElement.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = data;
  a.download = 'atelier-look.png';
  a.click();
  toast('造型图片已保存');
});

/* ============================================================
   渲染循环与尺寸
   ============================================================ */

function resize() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  if (w === 0 || h === 0) return;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
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

renderCategories();
renderGarments();
renderColors();
renderBodyTypes();
renderSliders();
resize();
animate();

document.getElementById('loading').classList.add('hidden');

/* ============================================================
   照片识别换衣（纯前端 Canvas 分析）
   ============================================================ */

const photoModal = document.getElementById('photo-modal');
const dropZone = document.getElementById('drop-zone');
const photoFile = document.getElementById('photo-file');
const scanResult = document.getElementById('scan-result');
const scanImg = document.getElementById('scan-img');
const detectedSwatch = document.getElementById('detected-swatch');
const detectedColorName = document.getElementById('detected-color-name');
const detectedTypeName = document.getElementById('detected-type-name');
const matchSelect = document.getElementById('detected-match');
const applyBtn = document.getElementById('photo-apply');

let detected = null; // { hex, colorName, garmentId }

function openPhotoModal() {
  photoModal.classList.add('open');
}
function closePhotoModal() {
  photoModal.classList.remove('open');
}

document.getElementById('btn-photo-upload').addEventListener('click', openPhotoModal);
document.getElementById('photo-modal-close').addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', e => { if (e.target === photoModal) closePhotoModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePhotoModal(); });

dropZone.addEventListener('click', () => photoFile.click());
photoFile.addEventListener('change', e => {
  if (e.target.files && e.target.files[0]) handlePhoto(e.target.files[0]);
});
['dragenter', 'dragover'].forEach(ev =>
  dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.add('dragover'); })
);
['dragleave', 'drop'].forEach(ev =>
  dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.remove('dragover'); })
);
dropZone.addEventListener('drop', e => {
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) handlePhoto(file);
  else toast('请上传图片文件');
});

function resetScanUI() {
  detected = null;
  applyBtn.disabled = true;
  scanResult.hidden = true;
  dropZone.style.display = '';
  photoFile.value = '';
}

document.getElementById('photo-reselect').addEventListener('click', resetScanUI);

function handlePhoto(file) {
  if (!file.type.startsWith('image/')) { toast('请上传图片文件'); return; }
  const reader = new FileReader();
  reader.onload = e => analyzePhoto(e.target.result, file.name);
  reader.readAsDataURL(file);
}

function analyzePhoto(dataUrl, fileName) {
  const img = new Image();
  img.onload = () => {
    const color = extractDominantColor(img);
    const guess = guessGarment(img, color);

    scanImg.src = dataUrl;
    const cssHex = '#' + color.hex.toString(16).padStart(6, '0');
    detectedSwatch.style.background = cssHex;
    detectedColorName.textContent = color.name;
    detectedTypeName.textContent = guess.label;

    // 填充匹配下拉框，按类别分组
    matchSelect.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const og = document.createElement('optgroup');
      og.label = cat.name;
      GARMENTS[cat.id].forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = g.name;
        if (g.id === guess.id) opt.selected = true;
        og.appendChild(opt);
      });
      matchSelect.appendChild(og);
    });

    detected = { hex: color.hex, colorName: color.name, garmentId: guess.id };
    dropZone.style.display = 'none';
    scanResult.hidden = false;
    applyBtn.disabled = false;
  };
  img.onerror = () => toast('图片读取失败，请换一张试试');
  img.src = dataUrl;
}

// 提取主体主色：颜色量化统计，排除背景/黑白
function extractDominantColor(img) {
  const W = 120, H = 120;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);
  const scale = Math.min(W / img.width, H / img.height);
  const dw = img.width * scale, dh = img.height * scale;
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
  const data = ctx.getImageData(0, 0, W, H).data;

  const buckets = new Map();
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 128) continue;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    // 排除近白背景、近黑、以及低饱和浅灰
    if (mn > 232) continue;
    if (mx < 24) continue;
    if (mx - mn < 12 && mn > 170) continue;
    const key = ((r >> 5) << 6) | ((g >> 5) << 3) | (b >> 5);
    let bk = buckets.get(key);
    if (!bk) { bk = { n: 0, r: 0, g: 0, b: 0 }; buckets.set(key, bk); }
    bk.n++; bk.r += r; bk.g += g; bk.b += b;
  }

  let r = 128, g = 128, b = 128;
  if (buckets.size) {
    let best = null;
    buckets.forEach(v => { if (!best || v.n > best.n) best = v; });
    r = Math.round(best.r / best.n);
    g = Math.round(best.g / best.n);
    b = Math.round(best.b / best.n);
  }

  // 温和归一化明度，让识别色在 3D 材质上呈现正常（不过暗/过曝）
  const hsl = rgbToHsl(r, g, b);
  let L = Math.min(0.82, Math.max(0.2, hsl[2]));
  if (hsl[1] < 0.05 && L > 0.85) L = 0.78;
  const rgb = hslToRgb(hsl[0], hsl[1], L);
  return { hex: (rgb[0] << 16) | (rgb[1] << 8) | rgb[2], name: colorName(rgb[0], rgb[1], rgb[2]) };
}

// 款式猜测：依据图片宽高比与颜色倾向做启发式，用户可在下拉框修正
function guessGarment(img, color) {
  const ratio = img.height / img.width;
  const chsl = rgbToHsl(
    (color.hex >> 16) & 255,
    (color.hex >> 8) & 255,
    color.hex & 255
  );
  let id, label;
  if (ratio > 1.25) {
    id = chsl[2] < 0.45 ? 'jeans' : 'aline';
    label = '连衣裙 / 长裤（按图片比例推荐）';
  } else if (ratio < 0.85) {
    id = 'tshirt';
    label = '上装 / 短款（按图片比例推荐）';
  } else {
    id = 'shirt';
    label = '上装（按图片比例推荐）';
  }
  return { id, label };
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
  let h = 0, s = 0; const l = (mx + mn) / 2;
  const d = mx - mn;
  if (d) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
    if (h < 0) h += 1;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  const f = (n) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

applyBtn.addEventListener('click', () => {
  if (!detected) return;
  const gid = matchSelect.value || detected.garmentId;
  selectGarment(gid);
  setColor(detected.hex, detected.colorName);
  closePhotoModal();
  resetScanUI();
  toast('照片识别换衣完成');
});
