import * as THREE from 'three';
import { SIZE_CHART, SIZES, DB_BY_ID } from './data.js';
import { bodyMetrics, FOOT_Y } from './body.js';

/* ============================================================
   参数化服装建模
   ------------------------------------------------------------
   成衣不再使用固定几何体，而是由三处数据共同决定：
   1) 数据库款式的 measurements（成衣平铺尺寸，基准 IT 40）
   2) 所选尺码相对基准尺码的缩放
   3) 模特建档参数（围度、腿长、身高比例）
   最终成衣半径 = (成衣围度/2) × 单位换算，衣长按身高比例投射。
   ============================================================ */

const U = 1 / 50;
const BASE_BUST = SIZE_CHART['IT 40'].bust;

export function sizeScale(size) {
  return (SIZE_CHART[size] || SIZE_CHART['IT 40']).bust / BASE_BUST;
}

/* 根据模特胸围推荐尺码 */
export function recommendSize(model) {
  const bust = model.bust || 90;
  let best = 'IT 40', diff = Infinity;
  SIZES.forEach(s => {
    const d = Math.abs(SIZE_CHART[s].bust - bust);
    if (d < diff) { diff = d; best = s; }
  });
  return best;
}

function fabricMat(hex) {
  return new THREE.MeshStandardMaterial({
    color: hex, roughness: 0.8, metalness: 0.02, side: THREE.DoubleSide,
  });
}
function finish(g, mats) {
  g.userData.dyeMaterials = mats;
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  return g;
}
function lathe(profile, zScale, mat) {
  const pts = profile.map(([r, y]) => new THREE.Vector2(Math.max(r, 0.01), y));
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), mat);
  if (zScale !== 1) mesh.scale.z = zScale;
  return mesh;
}
function limb(p1, p2, r1, r2, mat, seg = 14) {
  const dir = new THREE.Vector3().subVectors(p2, p1);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r2, r1, len, seg, 1), mat);
  mesh.position.copy(p1).add(p2).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}
function ball(pos, scale, mat) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 14), mat);
  mesh.position.copy(pos); mesh.scale.copy(scale);
  return mesh;
}
function torus(r, tube, y, zScale, mat) {
  const t = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, 32), mat);
  t.rotation.x = Math.PI / 2; t.position.y = y; t.scale.z = zScale;
  return t;
}

/* 围度(cm) → 成衣半径(局部单位)。与人体同处局部坐标，由 avatarGroup 统一按身高比例缩放 */
function gR(circumferenceCm, k) {
  return Math.max(0.06, circumferenceCm * U * 0.5 / Math.PI);
}
/* 衣长(cm) → 局部单位 */
function gL(lengthCm, k) {
  return lengthCm * U;
}

/* 主入口：按款式数据、尺码、模特、颜色构建服装 Group
   useRealBody=true 时，用写实模特的实测骨骼基准定位围度截面 */
export function buildGarment(itemId, size, model, colorHex, useRealBody = false) {
  const item = DB_BY_ID[itemId];
  if (!item) return null;
  const k = bodyMetrics(model);
  const sc = sizeScale(size || 'IT 40');
  const M = item.measurements;
  const mat = fabricMat(colorHex);
  const g = new THREE.Group();
  // 写实人体前后厚度接近圆形，截面 depth 需接近 1 才能包裹身体避免穿模
  const depth = useRealBody ? 0.96 : 0.78;

  // 成衣各部位尺寸：严格按成衣平铺尺寸 × 尺码系数生成，不随模特体型变形。
  // 这样当衣服偏小（成衣围度 < 人体围度）时会真实呈现紧绷/被撑开的效果，
  // 偏大时呈现松垮效果——这就是合身判断的视觉依据。
  // 写实模特躯干横截面比参数化换算更饱满，用系数补偿以正确包裹
  const bodyFit = useRealBody ? 1.22 : 1.0;
  let bustR = gR((M.bust || 90) * sc, k) * bodyFit;
  let waistR = gR((M.waist || 72) * sc, k) * bodyFit;
  let hipR = gR((M.hip || 96) * sc, k) * bodyFit;
  const shoulderX = (M.shoulder || 40) * U * 0.5 * (useRealBody ? 1.15 : 1);
  const sleeveLen = gL(M.sleeve || 0, k);
  const length = gL(M.length || 80, k);
  const openingR = gR((M.opening || 100) * sc, k);

  let topY = k.shoulderY;            // 肩线
  let waistY = k.waistY;
  let hipY = k.hipY;
  let bustY = k.bustY;

  if (useRealBody) {
    // 写实模特（Xbot）实测骨骼高度：相对脚底的归一化比例
    // 脚底 FOOT_Y，全身高 = model.height*U；各关节占身高比例由 Mixamo 骨架测得
    const H = (model.height || 170) * U;
    const base = FOOT_Y;
    topY   = base + H * 0.798;   // 肩 1.356/1.70
    bustY  = base + H * 0.739;   // 胸 1.256/1.70
    waistY = base + H * 0.633;   // 腰 1.076/1.70
    hipY   = base + H * 0.576;   // 胯 0.980/1.70
  }
  const hemY = topY - length;    // 下摆
  const sil = item.silhouette;

  /* ---------- 连衣裙 ---------- */
  if (item.category === 'dresses') {
    if (sil === 'slip') {
      g.add(lathe([
        [bustR * 0.92, bustY - 0.08], [bustR, bustY + 0.06],
        [waistR * 0.95, waistY], [hipR * 1.02, hipY],
        [hipR * 1.0, hipY - 0.22],                       // 大腿段保持宽度，避免身体穿出
        [Math.max(hipR * 0.95, openingR * 0.82), hemY + 0.2],
        [openingR, hemY],
      ], depth, mat));
      // 吊带置于胸部前方，避免被躯干厚度遮挡
      const strapZ = bustR * depth + 0.02;
      [-1, 1].forEach(s => g.add(limb(
        new THREE.Vector3(s * bustR * 0.62, bustY + 0.04, strapZ),
        new THREE.Vector3(s * (shoulderX * 0.8), topY + 0.06, strapZ * 0.75), 0.032, 0.03, mat)));
    } else if (sil === 'fitted' || sil === 'blouse' || sil === 'wrap') {
      g.add(lathe([
        [bustR * 0.85, topY], [bustR, bustY],
        [waistR, waistY], [hipR, hipY],
        [hipR * 1.15, hemY + 0.25], [hipR * 1.3, hemY],
      ], depth, mat));
      if (M.sleeve > 0) addSleeves(g, s => [
        new THREE.Vector3(s * shoulderX, topY - 0.02, 0),
        new THREE.Vector3(s * (shoulderX + 0.04), topY - sleeveLen * 0.55, 0),
        new THREE.Vector3(s * (shoulderX + 0.07), topY - sleeveLen, 0),
      ], 0.115, 0.085, mat);
      if (sil === 'wrap') {
        const belt = torus(waistR * 1.02, 0.022, waistY, depth, mat);
        g.add(belt);
      }
    } else if (sil === 'aline' || sil === 'flared' || sil === 'cape') {
      g.add(lathe([
        [bustR * 0.9, topY], [bustR, bustY],
        [waistR, waistY], [hipR, hipY],
        [hipR + (openingR - hipR) * 0.5, hemY + 0.3],
        [openingR, hemY],
      ], depth, mat));
      if (sil === 'cape') {
        g.add(lathe([
          [shoulderX * 1.05, topY + 0.06],
          [openingR * 1.15, topY - 0.9],
          [openingR * 1.35, topY - 1.35],
        ], depth * 1.05, mat));
      }
    } else if (sil === 'straight' || sil === 'peplum') {
      g.add(lathe([
        [bustR * 0.88, topY], [bustR, bustY],
        [waistR, waistY], [hipR, hipY],
        [hipR * (sil === 'peplum' ? 1.28 : 1.05), hemY + 0.18],
        [hipR * (sil === 'peplum' ? 1.34 : 1.06), hemY],
      ], depth, mat));
      if (sil === 'peplum') g.add(torus(waistR * 1.06, 0.03, waistY + 0.04, depth, mat));
      if (M.sleeve > 0) addSleeves(g, s => [
        new THREE.Vector3(s * shoulderX, topY - 0.02, 0),
        new THREE.Vector3(s * (shoulderX + 0.04), topY - sleeveLen * 0.6, 0),
        new THREE.Vector3(s * (shoulderX + 0.06), topY - sleeveLen, 0),
      ], 0.105, 0.075, mat);
    }
    // 肩部覆盖球：仅在有袖款添加，吊带/无袖款保留裸露的肩关节
    if (M.sleeve > 0) addShoulderCaps(g, shoulderX, topY, mat, 0.13);
  }

  /* ---------- 上装 ---------- */
  else if (item.category === 'tops') {
    if (sil === 'slip') {
      g.add(lathe([
        [bustR * 0.88, topY - 0.22], [bustR, bustY],
        [waistR, waistY], [waistR * 0.95, hemY],
      ], depth, mat));
    } else if (sil === 'oversize' || sil === 'knit') {
      g.add(lathe([
        [bustR * 0.95, topY], [bustR, bustY],
        [waistR * 1.02, waistY], [waistR * 1.05, hemY],
      ], depth, mat));
      if (M.sleeve > 0) addSleeves(g, s => [
        new THREE.Vector3(s * shoulderX, topY - 0.02, 0),
        new THREE.Vector3(s * (shoulderX + 0.06), topY - sleeveLen * 0.55, 0),
        new THREE.Vector3(s * (shoulderX + 0.09), topY - sleeveLen, 0),
      ], 0.135, 0.105, mat);
    } else {
      g.add(lathe([
        [bustR * 0.85, topY], [bustR, bustY],
        [waistR * 0.98, waistY], [waistR * 0.96, hemY],
      ], depth, mat));
      if (M.sleeve > 0) {
        const short = sleeveLen < gL(30, k);
        addSleeves(g, s => {
          const p1 = new THREE.Vector3(s * shoulderX, topY - 0.02, 0);
          const p3 = new THREE.Vector3(s * (shoulderX + (short ? 0.16 : 0.05)), topY - sleeveLen, 0);
          const p2 = p1.clone().lerp(p3, 0.55);
          return [p1, p2, p3];
        }, short ? 0.125 : 0.105, short ? 0.115 : 0.075, mat);
      }
      // 领口
      if (M.neck !== 0) {
        g.add(torus(Math.min(bustR * 0.5, 0.14), 0.018, topY + 0.02, depth, mat));
      }
    }
    if (M.sleeve > 0) addShoulderCaps(g, shoulderX, topY, mat, 0.12);
  }

  /* ---------- 下装 ---------- */
  else if (item.category === 'bottoms') {
    const isSkirt = ['aline', 'pencil', 'flared'].includes(sil);
    if (isSkirt) {
      const hem = k.hipY - length + 0.5; // 裙长自腰部向下
      const waistY2 = k.waistY;
      let hemR = openingR;
      if (sil === 'pencil') hemR = hipR * 0.96;
      g.add(lathe([
        [waistR * 1.02, waistY2 + 0.06],
        [hipR, k.hipY],
        [(hipR + hemR) * 0.5, (k.hipY + hem) * 0.5],
        [hemR, hem],
      ], depth, mat));
      g.add(torus(waistR * 1.03, 0.02, waistY2 + 0.06, depth, mat));
    } else {
      // 裤装：腰头 + 两条裤腿
      g.add(lathe([
        [waistR * 1.03, k.waistY + 0.06],
        [hipR, k.hipY],
        [hipR * 0.92, k.hipY - 0.25],
      ], depth, mat));
      const legTop = k.hipY - 0.12;
      const legBottom = FOOT_Y + 0.12;
      const legLen = legTop - legBottom;
      const kneeY = legTop - legLen * 0.5;
      const hipHalf = hipR * 0.5;
      [-1, 1].forEach(s => {
        const wide = sil === 'wide' || sil === 'mini';
        const rTop = wide ? hipR * 0.48 : hipR * 0.42;
        const rHem = gR(openingR, k) * (wide ? 1.0 : 0.62);
        g.add(limb(new THREE.Vector3(s * hipHalf, legTop, 0),
                   new THREE.Vector3(s * hipHalf, kneeY, 0), rTop, (rTop + rHem) * 0.5, mat));
        g.add(limb(new THREE.Vector3(s * hipHalf, kneeY, 0),
                   new THREE.Vector3(s * hipHalf, legBottom, 0), (rTop + rHem) * 0.5, rHem, mat));
      });
      g.add(torus(waistR * 1.03, 0.02, k.waistY + 0.06, depth, mat));
    }
  }

  /* ---------- 外套 ---------- */
  else if (item.category === 'outer') {
    if (sil === 'cape') {
      g.add(lathe([
        [shoulderX * 1.12, topY + 0.08],
        [bustR * 1.35, topY - 0.7],
        [hipR * 1.5, topY - 1.3],
        [openingR * 1.5, hemY],
      ], depth, mat));
    } else {
      const outerBust = Math.max(bustR, k.rBust + 0.05);
      g.add(lathe([
        [outerBust * 0.88, topY], [outerBust, bustY],
        [Math.max(waistR, k.rWaist + 0.05), waistY],
        [Math.max(hipR, k.rHip + 0.04), hipY],
        [Math.max(hipR, k.rHip + 0.06) * 1.06, hemY],
      ], depth, mat));
      if (sleeveLen > 0) {
        addSleeves(g, s => [
          new THREE.Vector3(s * shoulderX * 1.04, topY - 0.02, 0),
          new THREE.Vector3(s * (shoulderX + 0.07), topY - sleeveLen * 0.55, 0),
          new THREE.Vector3(s * (shoulderX + 0.1), topY - sleeveLen, 0),
        ], 0.15, 0.115, mat);
      }
      // 翻领（西装 / 风衣 / 机车）
      const lapelW = sil === 'trench' ? 0.19 : 0.15;
      [-1, 1].forEach(s => {
        const lp = new THREE.Mesh(new THREE.BoxGeometry(lapelW, 0.24, 0.02), mat);
        lp.position.set(s * 0.085, topY - 0.06, bustR * depth + 0.01);
        lp.rotation.z = s * 0.35;
        g.add(lp);
      });
      if (sil === 'trench' || sil === 'blazer') {
        g.add(torus(Math.max(waistR, k.rWaist + 0.05) * 1.02, 0.025, waistY, depth, mat));
      }
    }
    addShoulderCaps(g, shoulderX, topY, mat, 0.15);
  }

  return finish(g, [mat]);
}

/* 袖子：两段圆柱 + 肩部过渡球 */
function addSleeves(g, pathOf, r1, r2, mat) {
  [-1, 1].forEach(s => {
    const pts = pathOf(s);
    g.add(limb(pts[0], pts[1], r1, (r1 + r2) * 0.5, mat));
    g.add(limb(pts[1], pts[2], (r1 + r2) * 0.5, r2, mat));
    g.add(ball(pts[2].clone(), new THREE.Vector3(r2, r2, r2), mat));
  });
}
function addShoulderCaps(g, shoulderX, topY, mat, r) {
  [-1, 1].forEach(s => {
    g.add(ball(new THREE.Vector3(s * shoulderX, topY - 0.04, 0),
               new THREE.Vector3(r, r * 0.92, r * 0.9), mat));
  });
}

/* 成衣规格文字（用于界面展示） */
export function specText(item, size) {
  const M = item.measurements;
  const sc = sizeScale(size);
  const parts = [];
  if (M.bust) parts.push(`胸围 ${Math.round(M.bust * sc)}`);
  if (M.waist) parts.push(`腰围 ${Math.round(M.waist * sc)}`);
  if (M.hip) parts.push(`臀围 ${Math.round(M.hip * sc)}`);
  if (M.length) parts.push(`衣长 ${Math.round(M.length)}`);
  return parts.join(' / ') + ' cm';
}
