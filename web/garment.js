/* ============================================================
   参数化服装建模 v2 —— 按人体剖面外偏移生成
   ------------------------------------------------------------
   旧版问题：衣服是一套独立几何，靠 bodyFit 之类的系数手调去凑人体，
   永远贴不准、容易穿模。

   新版做法：服装直接读取 bodyProfile() 的同一套剖面曲线，
   在人体半径上叠加「布料放松量」逐层生成曲面：
     成衣半径(y) = 人体半径(y) + 放松量(y)
   放松量由成衣平铺尺寸与该模特围度之差得出，且下限为布料厚度，
   因此任何尺码都不会穿模；偏小时视觉上贴合绷紧，偏大时自然松垮。
   ============================================================ */
import * as THREE from 'three';
import { SIZE_CHART, SIZES, DB_BY_ID } from './data.js';
import { bodyProfile, radiusAt, shellGeometry } from './smoothBody.js';

const U = 1 / 50;
const BASE_BUST = SIZE_CHART['IT 40'].bust;
const MIN_EASE = 0.008;          // 布料厚度 + 贴身压力（局部单位，约 4mm×2）

export function sizeScale(size) {
  return (SIZE_CHART[size] || SIZE_CHART['IT 40']).bust / BASE_BUST;
}

export function recommendSize(model) {
  const bust = model.bust || 90;
  let best = 'IT 40', diff = Infinity;
  SIZES.forEach(s => {
    const d = Math.abs(SIZE_CHART[s].bust - bust);
    if (d < diff) { diff = d; best = s; }
  });
  return best;
}

function fabricMat(hex, rough = 0.82) {
  return new THREE.MeshStandardMaterial({
    color: hex, roughness: rough, metalness: 0.02, side: THREE.DoubleSide,
  });
}

function finish(g, mats) {
  g.userData.dyeMaterials = mats;
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

/* 围度(cm) → 半径(局部单位) */
const rOf = cm => Math.max(0.02, cm * U / (2 * Math.PI));

/** 分段线性插值：在给定锚点间求放松量 */
function easeAt(e, y, anchors) {
  const { hipY, waistY, bustY, topY } = anchors;
  const pts = [
    [hipY - 0.30, e.hip],
    [hipY, e.hip],
    [waistY, e.waist],
    [bustY, e.bust],
    [topY + 0.20, e.bust],
  ].sort((a, b) => a[0] - b[0]);
  if (y <= pts[0][0]) return Math.max(pts[0][1], MIN_EASE);
  if (y >= pts[pts.length - 1][0]) return Math.max(pts[pts.length - 1][1], MIN_EASE);
  for (let i = 1; i < pts.length; i++) {
    if (y <= pts[i][0]) {
      const t = (y - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0] || 1);
      return Math.max(pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t, MIN_EASE);
    }
  }
  return MIN_EASE;
}


/** 身体某高度的实际半宽：髋线以上取躯干剖面，以下取双腿外缘（腿向两侧展开） */
function bodyHalfWidth(P, y) {
  const torsoR = radiusAt(P.torso, y);
  if (y >= P.hipY - 0.02) return torsoR;
  const legR = radiusAt(P.leg, y);
  return Math.max(torsoR, P.legHalf + legR);
}

/** 裙/下摆类壳体半径：必须包住双腿，同时保留下摆张开量 */
function skirtRadius(P, y, ease, hemR) {
  const body = bodyHalfWidth(P, y) + Math.max(ease, MIN_EASE);
  const t = Math.min(Math.max((y - P.hipY) / Math.max(P.waistY - P.hipY, 0.01), 0), 1);
  const flare = hemR + (P.rHip + MIN_EASE - hemR) * t;
  return Math.max(body, flare, 0.02);
}

/** 服装壳体：直接复用人体曲面函数，半径等于人体半宽 + 布料放松量。
    胸部等曲面细节自动跟随，因此天然贴合、不会穿模。 */
function shellFrom(P, { y0, y1, easeFn, mat, samples = 30, radiusFn }) {
  const geo = shellGeometry(P, y0, y1, samples,
    radiusFn || (y => Math.max(bodyHalfWidth(P, y), 0.02)), easeFn, 60);
  return new THREE.Mesh(geo, mat);
}

/** 下摆加厚：一圈略外扩的窄带，模拟布料边缘厚度 */
function hemBand(P, y, easeFn, depth, mat, h = 0.012) {
  const pts = [];
  for (let i = 0; i <= 4; i++) {
    const yy = y + h * (i / 4);
    const r = bodyHalfWidth(P, yy) + easeFn(yy) + 0.004;
    pts.push(new THREE.Vector2(Math.max(r, 0.02), yy));
  }
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 44), mat);
  mesh.scale.z = P.depthAt(y + h * 0.5);
  return mesh;
}

/** 袖子：沿手臂剖面外偏移，顶端封口形成肩部 */
function sleeve(P, s, yTop, yEnd, ease, depth, mat) {
  const pts = [];
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const y = yTop + (yEnd - yTop) * (i / steps);
    const r = radiusAt(P.arm, y) + Math.max(ease, MIN_EASE);
    pts.push(new THREE.Vector2(Math.max(r, 0.02), y));
  }
  pts.sort((a, b) => a.y - b.y);
  // 袖筒两端缩进手臂内部，藏住开口环（否则肩口与袖口会出现亮色楔形）
  const tuck = r => Math.max(r - 0.010, 0.010);
  pts[0].x = tuck(radiusAt(P.arm, pts[0].y));
  pts[pts.length - 1].x = tuck(radiusAt(P.arm, pts[pts.length - 1].y));
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 30), mat);
  mesh.position.x = s * P.armX;
  mesh.rotation.z = s * P.armTilt;
  // 手臂是整圆截面，袖筒不能压 z，否则手臂会从袖子里穿出来
  return mesh;
}

/** 裤腿 / 裙片：沿腿部剖面外偏移 */
function legTube(P, s, yTop, yEnd, easeFn, mat) {
  const pts = [];
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const y = yTop + (yEnd - yTop) * (i / steps);
    const r = radiusAt(P.leg, y) + Math.max(easeFn(y), MIN_EASE);
    pts.push(new THREE.Vector2(Math.max(r, 0.02), y));
  }
  const mesh = new THREE.Mesh(new THREE.LatheGeometry(pts.sort((a, b) => a.y - b.y), 28), mat);
  mesh.position.x = s * P.legHalf;
  mesh.scale.z = P.legDepth;
  return mesh;
}



/** 肩部桥接：把躯干壳体顶边与袖子连成一条肩缝，避免肩头露出裸皮 */
function shoulderBridge(P, mat, extra) {
  return [-1, 1].map(s => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), mat);
    m.position.set(s * (P.armX - 0.085), P.topY + 0.028, 0);
    m.scale.set(0.108 + extra, 0.062 + extra * 0.5, 0.080 + extra);
    return m;
  });
}

/* 主入口 */
export function buildGarment(itemId, size, model, colorHex, useRealBody = true) {
  const item = DB_BY_ID[itemId];
  if (!item) return null;

  const P = bodyProfile(model);
  const sc = sizeScale(size || 'IT 40');
  const M = item.measurements || {};
  const sil = item.silhouette;
  const cat = item.category;
  const mat = fabricMat(colorHex, cat === 'outer' ? 0.86 : 0.8);

  const g = new THREE.Group();
  const anchors = { hipY: P.hipY, waistY: P.waistY, bustY: P.bustY, topY: P.topY };
  const depth = P.depth;

  // 成衣围度与该模特人体的差值 → 各部位的布料放松量
  const ease = {
    bust: rOf((M.bust || 90) * sc) - P.rBust,
    waist: rOf((M.waist || 72) * sc) - P.rWaist,
    hip: rOf((M.hip || 96) * sc) - P.rHip,
  };
  const easeFn = y => easeAt(ease, y, anchors);
  // 外套类统一加一层内搭空间
  const outerPad = cat === 'outer' ? rOf(6) : 0;
  const easeFnOut = y => easeFn(y) + outerPad;

  const lenCm = M.length || (cat === 'bottoms' ? 60 : 90);
  const sleeveCm = M.sleeve || 0;

  /* ---------- 连衣/上装类：从肩线向下 ---------- */
  if (cat === 'dresses' || cat === 'tops') {
    const isSlip = sil === 'slip';
    const yTopGarment = isSlip ? P.bustY + 0.02 : P.topY + 0.085;
    const hemY = Math.max(P.topY - lenCm * U, P.base + 0.10);

    g.add(shellFrom(P, {
      y0: hemY, y1: yTopGarment, easeFn: easeFnOut, mat, samples: 40,
    }));

    // 领口：从肩线收向颈根，形成领围而不是敞开的大洞
    if (!isSlip) {
      const pts = [];
      const yA = yTopGarment;
      const rTop = bodyHalfWidth(P, yA) + easeFnOut(yA);
      const yB = P.topY + 0.135;
      const rNeck = P.neckR * 1.5 + Math.max(ease.bust * 0.4, MIN_EASE);
      for (let i = 0; i <= 8; i++) {
        const t = i / 8;
        const y = (yA - 0.012) + (yB - yA + 0.012) * t;
        // 起始半径略大于壳体顶环，避免两个共面环产生闪面
        const r = (rTop * 1.008) + (rNeck - rTop * 1.008) * (t * t * (3 - 2 * t));
        pts.push(new THREE.Vector2(Math.max(r, 0.02), y));
      }
      const collar = new THREE.Mesh(new THREE.LatheGeometry(pts, 44), mat);
      collar.scale.z = P.depthAt(P.topY + 0.10);
      g.add(collar);
    } else {
      // 吊带
      const strapEase = Math.max(ease.bust, MIN_EASE);
      [-1, 1].forEach(s => {
        const p1 = new THREE.Vector3(s * P.rBust * 0.52, P.bustY + 0.03, (P.rBust + strapEase) * depth * 0.92);
        const p2 = new THREE.Vector3(s * P.armX * 0.62, P.topY + 0.03, (P.rBust + strapEase) * depth * 0.55);
        const dir = p2.clone().sub(p1);
        const strap = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, dir.length(), 8), mat);
        strap.position.copy(p1).add(p2).multiplyScalar(0.5);
        strap.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
        g.add(strap);
      });
    }

    g.add(hemBand(P, hemY, easeFnOut, depth, mat));

    // 袖子 + 肩缝
    if (sleeveCm > 0) {
      const yEnd = P.topY - sleeveCm * U;
      shoulderBridge(P, mat, Math.max(ease.bust, 0)).forEach(m => g.add(m));
      [-1, 1].forEach(s => g.add(sleeve(P, s, P.topY + 0.05, yEnd, ease.bust * 0.8, depth, mat)));
    }

    // 收腰款：加一条腰带提示版型
    if (sil === 'wrap' || sil === 'peplum') {
      const r = radiusAt(P.torso, P.waistY) + easeFn(P.waistY) + 0.012;
      const belt = new THREE.Mesh(new THREE.TorusGeometry(r, 0.014, 8, 40), mat);
      belt.rotation.x = Math.PI / 2;
      belt.position.y = P.waistY;
      belt.scale.z = P.depthAt(P.waistY);
      g.add(belt);
    }
  }

  /* ---------- 下装 ---------- */
  else if (cat === 'bottoms') {
    const isSkirt = ['aline', 'pencil', 'flared'].includes(sil);
    if (isSkirt) {
      const hemY = Math.max(P.waistY - lenCm * U, P.base + 0.12);
      const hemR = Math.max(rOf(M.opening || 100) * sc, P.rHip + MIN_EASE);
      g.add(shellFrom(P, {
        y0: hemY, y1: P.waistY + 0.04, samples: 28, mat,
        easeFn: y => Math.max(easeFn(y), MIN_EASE),
        radiusFn: y => Math.max(skirtRadius(P, y, easeFn(y), hemR) - Math.max(easeFn(y), MIN_EASE), 0.02),
      }));
      const band = hemBand(P, hemY, easeFn, depth, mat);
      g.add(band);
      // 腰头
      const wr = radiusAt(P.torso, P.waistY) + easeFn(P.waistY) + 0.006;
      const waist = new THREE.Mesh(new THREE.TorusGeometry(wr, 0.013, 8, 40), mat);
      waist.rotation.x = Math.PI / 2;
      waist.position.y = P.waistY + 0.03;
      waist.scale.z = P.depthAt(P.waistY + 0.03);
      g.add(waist);
    } else {
      // 裤装：腰臀壳 + 两条裤腿
      const yWaist = P.waistY + 0.05;
      g.add(shellFrom(P, {
        y0: P.hipY - 0.16, y1: yWaist, easeFn: easeFnOut, mat, samples: 18,
      }));
      const yTop = P.hipY - 0.02;
      const yEnd = Math.max(P.base + 0.06, P.waistY - lenCm * U);
      const wide = sil === 'wide' || sil === 'mini';
      [-1, 1].forEach(s => {
        g.add(legTube(P, s, yTop, yEnd, y => easeFn(y) + (wide ? 0.03 : 0.004), mat));
      });
      const wr = radiusAt(P.torso, P.waistY) + easeFn(P.waistY) + 0.006;
      const waist = new THREE.Mesh(new THREE.TorusGeometry(wr, 0.013, 8, 40), mat);
      waist.rotation.x = Math.PI / 2;
      waist.position.y = yWaist;
      waist.scale.z = P.depthAt(yWaist);
      g.add(waist);
    }
  }

  /* ---------- 外套 ---------- */
  else if (cat === 'outer') {
    const hemY = Math.max(P.topY - lenCm * U, P.base + 0.10);
    g.add(shellFrom(P, {
      y0: hemY, y1: P.topY + 0.085, easeFn: easeFnOut, mat, samples: 40,
    }));

    // 驳领：沿领口向外翻的两片
    const rTop = bodyHalfWidth(P, P.topY + 0.085) + easeFnOut(P.topY + 0.085);
    [-1, 1].forEach(s => {
      const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.30, 0.016), mat);
      lapel.position.set(s * 0.072, P.topY - 0.075, rTop * depth * 0.97);
      lapel.rotation.z = s * 0.30;
      lapel.rotation.y = s * -0.22;
      g.add(lapel);
    });
    // 领座
    const pts = [];
    const rNeck = P.neckR * 1.62 + outerPad;
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      const y = (P.topY + 0.085) + (P.topY + 0.14 - P.topY - 0.085) * t;
      const r = rTop + (rNeck - rTop) * (t * t * (3 - 2 * t));
      pts.push(new THREE.Vector2(Math.max(r, 0.02), y));
    }
    const collar = new THREE.Mesh(new THREE.LatheGeometry(pts, 44), mat);
    collar.scale.z = P.depthAt(P.topY + 0.10);
    g.add(collar);

    if (sleeveCm > 0) {
      const yEnd = P.topY - sleeveCm * U;
      shoulderBridge(P, mat, Math.max(ease.bust, 0) + outerPad).forEach(m => g.add(m));
      [-1, 1].forEach(s => g.add(sleeve(P, s, P.topY + 0.06, yEnd, ease.bust * 0.8 + outerPad, depth, mat)));
    }
    g.add(hemBand(P, hemY, easeFnOut, depth, mat));
    // 腰带（风衣/西装）
    if (sil === 'trench' || sil === 'blazer') {
      const r = radiusAt(P.torso, P.waistY) + easeFnOut(P.waistY) + 0.014;
      const belt = new THREE.Mesh(new THREE.TorusGeometry(r, 0.016, 8, 40), mat);
      belt.rotation.x = Math.PI / 2;
      belt.position.y = P.waistY;
      belt.scale.z = P.depthAt(P.waistY);
      g.add(belt);
    }
  }

  return finish(g, [mat]);
}

/* 成衣规格文字 */
export function specText(item, size) {
  const M = item.measurements || {};
  const sc = sizeScale(size);
  const parts = [];
  if (M.bust) parts.push(`胸围 ${Math.round(M.bust * sc)}`);
  if (M.waist) parts.push(`腰围 ${Math.round(M.waist * sc)}`);
  if (M.hip) parts.push(`臀围 ${Math.round(M.hip * sc)}`);
  if (M.length) parts.push(`衣长 ${Math.round(M.length)}`);
  return parts.join(' / ') + ' cm';
}
