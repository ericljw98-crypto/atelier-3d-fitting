/* ============================================================
   参数化服装建模 v3 —— 贴合人体轮廓的变边壳体
   ------------------------------------------------------------
   相对 v2 的三处根本改动：

   1) 领口不再是水平环。顶边改为按方位角变化的曲线
      （肩峰 → 前领深 → 肩峰 → 后领深），于是 V 领、圆领、
      一字领、袖窿都是同一个函数的参数，肩部真正存在了。
   2) 放松量从「同比放大」改为「等距空气层」。旧版 r = 人体 × k，
      肩宽与腰宽被同一比例一起撑开，+12cm 的宽松款直接成桶。
   3) 袖子沿手臂轴线生成并带肩头穹顶，不再是插在肩上的圆筒；
      腰带、下摆环这些悬浮的圆环全部取消，改由折边表达布料厚度。

   ============================================================ */
import * as THREE from 'three';
import { SIZE_CHART, SIZES, DB_BY_ID } from './data.js';
import { bodyProfile, radiusAt, shellVarying, topEdgeFn } from './smoothBody.js';

const U = 1 / 50;
const BASE_ROW = SIZE_CHART['EU 38'];
const MIN_EASE = 0.004;          // 布料厚度 + 贴身压力（约 2mm）
const CLOTH = 0.0035;            // 布料与皮肤的净间隙（约 1.75mm）

export function sizeScale(size) {
  return (SIZE_CHART[size] || BASE_ROW).bust / BASE_ROW.bust;
}

/** 分部位放码比例（胸/腰/臀各自档差） */
export function sizeScalePart(size, part) {
  const row = SIZE_CHART[size] || BASE_ROW;
  const base = BASE_ROW[part];
  return base ? row[part] / base : row.bust / BASE_ROW.bust;
}

export function recommendSize(model) {
  if (!model) return 'EU 38';
  const keys = ['bust', 'waist', 'hip'];
  let pick = SIZES[0];
  keys.forEach(k => {
    const v = model[k];
    if (!v) return;
    let hit = SIZES[SIZES.length - 1];
    for (const s of SIZES) { if (SIZE_CHART[s][k] >= v) { hit = s; break; } }
    if (SIZES.indexOf(hit) > SIZES.indexOf(pick)) pick = hit;
  });
  return pick;
}

/* 织物微纹理：程序化画一张平纹布，用作凹凸贴图。
   没有它，程序化服装就是一整块纯色塑料壳——同一个人体、同样的版型，
   有没有布的起伏，观感差一个数量级。零资源、零网络依赖。 */
let _fabricBump = null;
function fabricBump() {
  if (_fabricBump !== null) return _fabricBump;
  if (typeof document === 'undefined') return (_fabricBump = null);
  const N = 256;
  const cv = document.createElement('canvas');
  cv.width = cv.height = N;
  const g = cv.getContext('2d');
  g.fillStyle = '#808080';
  g.fillRect(0, 0, N, N);
  const cell = 16;
  for (let i = 0; i < N / cell; i++) {
    // 经线（竖向凸起）
    g.fillStyle = i % 2 ? '#9a9a9a' : '#6c6c6c';
    g.fillRect(i * cell, 0, cell * 0.55, N);
    // 纬线（横向压过经线）
    g.fillStyle = i % 2 ? '#707070' : '#969696';
    g.fillRect(0, i * cell, N, cell * 0.55);
  }
  // 经纬交叉处的压实点
  for (let y = 0; y < N; y += cell) {
    for (let x = 0; x < N; x += cell) {
      g.fillStyle = 'rgba(60,60,60,0.35)';
      g.fillRect(x + cell * 0.45, y + cell * 0.45, cell * 0.2, cell * 0.2);
    }
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(9, 14);
  tex.anisotropy = 4;
  return (_fabricBump = tex);
}

/* 真实面料：把商品图当贴图用。
   程序化服装最大的失真不是版型，是「面料」——金葱提花、豹纹、亮片被抹成
   一块纯色，怎么调都不像那件衣服。商品图本身就是这件成衣的面料样本，
   取它的中段（一定落在衣身上的区域）作为贴图，花色、明暗、织纹都回来了。
   UV 由壳体栅格给出，再把 0–1 映射压缩到图面中央 72%，
   避免采到浅灰背景，也避免图案在衣服上被放大三倍。 */
const TEX_UV = { u0: 0.32, u1: 0.68, v0: 0.40, v1: 0.70 };

function scaleUV(geo) {
  const uv = geo.attributes.uv;
  if (!uv) return geo;
  const a = uv.array;
  for (let i = 0; i < a.length; i += 2) {
    a[i] = TEX_UV.u0 + (TEX_UV.u1 - TEX_UV.u0) * a[i];
    a[i + 1] = TEX_UV.v0 + (TEX_UV.v1 - TEX_UV.v0) * a[i + 1];
  }
  uv.needsUpdate = true;
  return geo;
}

function fabricMat(hex, rough = 0.82, tex = null) {
  const m = new THREE.MeshStandardMaterial({
    color: tex ? 0xffffff : hex,
    roughness: rough, metalness: 0.02, side: THREE.DoubleSide,
  });
  if (tex) { m.map = tex; m.color.setHex(0xffffff); }
  const bump = fabricBump();
  if (bump) { m.bumpMap = bump; m.bumpScale = tex ? 0.25 : 1.1; }
  return m;
}

function finish(g, mats) {
  g.userData.dyeMaterials = mats;
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

/* 围度(cm) → 半径(局部单位) */
const rOf = cm => Math.max(0.02, cm * U / (2 * Math.PI));

/** 分段线性插值：在给定锚点间求放松量（米） */
function easeAt(e, y, anchors) {
  const { hipY, waistY, bustY, topY } = anchors;
  const pts = [
    [hipY - 0.30, e.hip],
    [hipY, e.hip],
    [waistY, e.waist],
    [bustY, e.bust],
    [topY + 0.20, e.bust],
  ].sort((a, b) => a[0] - b[0]);
  const cl = v => Math.max(v, MIN_EASE);
  if (y <= pts[0][0]) return cl(pts[0][1]);
  if (y >= pts[pts.length - 1][0]) return cl(pts[pts.length - 1][1]);
  for (let i = 1; i < pts.length; i++) {
    if (y <= pts[i][0]) {
      const t = (y - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0] || 1);
      return cl(pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t);
    }
  }
  return MIN_EASE;
}

/* ---------------- 领型 ---------------- */

/** 按版型给领口深度。返回值单位是场景单位（1 = 50cm）。 */
function neckSpec(item, P) {
  const sil = item.silhouette;
  const cat = item.category;
  const shoulder = P.topY + 0.010;
  const arm = P.bustY + 0.055;              // 腋下：比胸点高约 2.7cm
  const span = shoulder - arm;              // 肩线到腋下的距离
  const f = k => shoulder - span * k;       // k=0 肩线，k=1 腋下

  if (sil === 'slip') {
    // 吊带/抹胸：顶边整体压在胸线以上一点，靠肩带连接
    return { yShoulder: P.bustY + 0.10, yArm: f(0.92), yFront: P.bustY + 0.13,
      yBack: P.bustY + 0.15, ySide: f(0.96), strap: true };
  }
  if (cat === 'outer' && (sil === 'blazer' || sil === 'trench')) {
    // 西装／风衣：深 V 驳领，前领深到腰线附近
    return { yShoulder: shoulder, yArm: arm, yFront: P.bustY - 0.02,
      yBack: f(0.18), ySide: f(0.86), lapel: true };
  }
  if (sil === 'blouse') {
    return { yShoulder: shoulder, yArm: f(0.88), yFront: f(0.56),
      yBack: f(0.26), ySide: f(0.9), collar: true };
  }
  if (sil === 'oversize') {
    return { yShoulder: shoulder, yArm: f(0.62), yFront: f(0.42),
      yBack: f(0.30), ySide: f(0.62) };
  }
  if (sil === 'straight' || sil === 'shift') {
    // 直筒／一字领：肩线平直，前领只挖一点点
    return { yShoulder: shoulder, yArm: f(0.93), yFront: f(0.22),
      yBack: f(0.14), ySide: f(0.95) };
  }
  // 默认圆领
  return { yShoulder: shoulder, yArm: f(0.9), yFront: f(0.44),
    yBack: f(0.22), ySide: f(0.92) };
}

/* ---------------- 袖子 ---------------- */

/** 沿手臂实测中心线保温袖筒，顶端收成肩头穹顶。
    轴线取轮廓表里的 armCx（逐切片实测的手臂中心 |x|），不再用 armTilt
    一条直线——手臂是向外撇的弧线，直线袖筒到肘部就离体了。 */
function buildSleeve(P, s, { sleeveCm, ease, mat, nTheta = 26 }) {
  const S = P._src, H = P._H, NY = 200;
  const uAt = y => Math.min(0.999, Math.max(0, (y - P.base) / H));
  const armCxAt = y => {
    const f = uAt(y) * NY;
    const i0 = Math.min(NY - 1, Math.floor(f)), i1 = Math.min(NY - 1, i0 + 1), t = f - i0;
    const a = S.armCx[i0], b = S.armCx[i1];
    const v = (isFinite(a) ? a : 0) * (1 - t) + (isFinite(b) ? b : 0) * t;
    return v > 1e-3 ? v : Math.abs(P.armX);
  };
  const domeH = 0.009;                        // 肩头穹顶高度 ≈ 4.5mm：只做圆角，不做垫肩
  const yTopS = P.topY + domeH;
  const yEnd = P.topY - Math.max(sleeveCm * U, 0.04);
  const N = Math.max(20, Math.round((yTopS - yEnd) / 0.014));

  const pos = [], idx = [], uvs = [];
  const row = nTheta + 1;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const y = yTopS + (yEnd - yTopS) * t;
    // 穹顶段：半径从 0 张到实臂半径，高度只占 domeH，做出圆肩而不是平口
    const domeT = Math.min(1, (yTopS - y) / domeH);
    const domeK = Math.sqrt(Math.max(1 - (1 - domeT) * (1 - domeT), 0));
    const armR = radiusAt(P.arm, Math.min(y, P.topY)) * 0.88;
    const taper = 1 - 0.16 * Math.max(0, (t - 0.5) / 0.5);      // 袖口略收
    const r = Math.max((armR + ease) * taper, 0.014) * Math.max(domeK, 0.05);
    // 向外错开 3mm：袖山与衣身肩部曲面几乎共面，不错开会打架闪烁
    const cx = s * (armCxAt(Math.min(y, P.topY)) + 0.003);
    for (let it = 0; it <= nTheta; it++) {
      const th = (it / nTheta) * Math.PI * 2;
      pos.push(cx + Math.cos(th) * r, y, Math.sin(th) * r * 0.95);
      uvs.push(it / nTheta, t);
    }
  }
  for (let i = 0; i < N; i++) {
    for (let it = 0; it < nTheta; it++) {
      const a = i * row + it, c = a + row;
      if (s > 0) idx.push(a, a + 1, c, a + 1, c + 1, c);
      else idx.push(a, c, a + 1, a + 1, c, c + 1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(scaleUV(geo), mat);
  m.name = 'sleeve';
  return m;
}

/** 肩带（吊带款）：从胸线前沿越过肩峰落到背线，取一条贴合体表的窄带。
    路径在（方位角，高度）平面上定义：前片竖着上升 → 顶部横移过肩 →
    后片竖着下降，两侧边线沿真实体表半径展开。 */
function buildStrap(P, s, { mat, width = 0.020 }) {
  const S = P._src, H = P._H;
  const NY = 200;
  const uOf = y => Math.min(0.999, Math.max(0, (y - P.base) / H));
  const rAt = (u, th) => {
    const iy = Math.min(NY - 1, Math.max(0, Math.round(u * NY)));
    const r = S.rBody[iy * 96 + angIdx(th)];
    return (isFinite(r) && r > 0.005 ? r : 0.05) + MIN_EASE + CLOTH;
  };
  const czAt = (u) => {
    const iy = Math.min(NY - 1, Math.max(0, Math.round(u * NY)));
    return isFinite(S.cz[iy]) ? S.cz[iy] : 0;
  };
  const front = Math.PI / 2 - s * 0.62;        // 前片：距前中约 35°
  const back = Math.PI / 2 + s * 0.62;
  const yA = P.bustY + 0.14, yTopS = P.topY + 0.020, yC = P.bustY + 0.16;

  const path = [];
  const N1 = 8, N2 = 4, N3 = 8;
  for (let i = 0; i <= N1; i++) path.push({ th: front, y: yA + (yTopS - yA) * (i / N1) });
  for (let i = 1; i <= N2; i++) path.push({ th: front + (back - front) * (i / N2), y: yTopS });
  for (let i = 1; i <= N3; i++) path.push({ th: back, y: yTopS + (yC - yTopS) * (i / N3) });

  const pos = [], idx = [], uvs = [];
  let step = 0;
  for (const { th, y } of path) {
    const u = uOf(y), cz = czAt(u);
    for (const w of [-1, 1]) {
      const a = th + w * (width * 0.5) / Math.max(rAt(u, th), 0.02);
      const r = rAt(u, a);
      pos.push(r * Math.cos(a), y, cz + r * Math.sin(a));
      uvs.push(w > 0 ? 1 : 0, step / path.length);
    }
    step++;
  }
  for (let i = 0; i < path.length - 1; i++) {
    const a = i * 2;
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return new THREE.Mesh(scaleUV(geo), mat);
}

/** 方位角 → 轮廓表的列号（φ = π/2 − θ，与 bakeSilhouette 一致） */
function angIdx(th) {
  const NTH = 96, DTH = Math.PI * 2 / NTH;
  let i = Math.floor(((Math.PI * 0.5 - th) + Math.PI) / DTH);
  return ((i % NTH) + NTH) % NTH;
}

/* 主入口 */
export function buildGarment(itemId, size, model, colorHex, useRealBody = true, tex = null) {
  const item = DB_BY_ID[itemId];
  if (!item) return null;

  const P = bodyProfile(model);
  const sizeKey = size || 'EU 38';
  const sc = sizeScale(sizeKey);
  const M = item.measurements || {};
  const sil = item.silhouette;
  const cat = item.category;
  const rough = sil === 'oversize' ? 0.9 : cat === 'outer' ? 0.84 : 0.78;
  const mat = fabricMat(colorHex, rough, tex);

  const g = new THREE.Group();
  const anchors = { hipY: P.hipY, waistY: P.waistY, bustY: P.bustY, topY: P.topY };

  // 成衣围度与模特净体的差值 → 径向放松量（米）
  const ease = {
    bust: rOf((M.bust || 88) * sizeScalePart(sizeKey, 'bust')) - P.rBust,
    waist: rOf((M.waist || 72) * sizeScalePart(sizeKey, 'waist')) - P.rWaist,
    hip: rOf((M.hip || 96) * sizeScalePart(sizeKey, 'hip')) - P.rHip,
  };
  const easeFn = y => easeAt(ease, y, anchors);
  // 外套要留内搭空间
  const outerPad = cat === 'outer' ? 0.012 : 0;
  const easeFnOut = y => easeFn(y) + outerPad;
  /* 布料在胸前是「架」在胸点上的，不是贴着的。
     直接「体表半径 + 间隙」会把乳点一比一复述出来，穿上就成了露点。
     这里在胸点高度额外加一点桥接间隙，配合轮廓的角向平滑，
     布面横过胸部而不是顺着峰顶走。 */
  const bustBridge = (y) => {
    if (cat === 'bottoms') return 0;
    const d = (y - (P.bustY + 0.01)) / 0.062;
    return 0.0085 * Math.exp(-d * d);
  };
  const gapOf = fn => (u, y) => Math.max(fn(y) + CLOTH + bustBridge(y), MIN_EASE);

  const lenCm = M.length || (cat === 'bottoms' ? 60 : 90);
  const sleeveCm = M.sleeve || 0;

  /* ---------- 连衣/上装/外套：一件完整的上身壳 ---------- */
  if (cat === 'dresses' || cat === 'tops' || cat === 'outer') {
    const spec = neckSpec(item, P);
    const yTopFn = topEdgeFn(P, {
      yShoulder: spec.yShoulder, yArm: spec.yArm, yFront: spec.yFront,
      yBack: spec.yBack, ySide: spec.ySide,
      shoulderSpread: spec.strap ? 0.72 : 0.6,
    });
    const hemY = Math.max(P.topY - lenCm * U, P.base + 0.08);

    /* 裙摆／A 字：只在胯线以下扩，不把腰也一起撑开 */
    const flare = (() => {
      if (sil === 'flared') return { amt: 0.34, from: P.hipY + 0.02 };
      if (sil === 'aline') return { amt: 0.16, from: P.hipY + 0.02 };
      if (sil === 'peplum') return { amt: 0.13, from: P.waistY - 0.01 };
      if (sil === 'oversize') return { amt: 0.03, from: P.hipY };
      if (sil === 'straight' || sil === 'shift') return { amt: 0.01, from: P.hipY };
      return { amt: 0.035, from: P.hipY };   // 修身款给一点点活动量
    })();
    const mulFn = (y, th) => {
      if (flare.amt <= 0.01 || y >= flare.from) return 1;
      const k = Math.min(1, (flare.from - y) / Math.max(flare.from - hemY, 0.02));
      return 1 + flare.amt * k * k;
    };

    const geo = shellVarying(P, {
      yBot: hemY, yTop: yTopFn, rows: 72, nTheta: 64,
      gap: gapOf(easeFnOut), mul: mulFn, maxMul: sil === 'flared' ? 2.0 : 1.7,
      rimTop: 0.014, rimBot: 0, rimIn: 0.007,
    });
    g.add(new THREE.Mesh(scaleUV(geo), mat));

    // 袖子
    if (sleeveCm > 0) {
      /* 袖筒放松量必须单独限幅：衣身的 24cm 宽松量折成半径是 3.8cm，
         直接拿来套在袖子上就是一对气球袖。真实袖肥只多 1–2cm。 */
      const sleeveEase = Math.min(0.020, Math.max(0.006, ease.bust * 0.22)) + outerPad * 0.6;
      [-1, 1].forEach(s => g.add(buildSleeve(P, s, {
        sleeveCm, ease: sleeveEase, mat,
      })));
    } else if (spec.strap) {
      [-1, 1].forEach(s => g.add(buildStrap(P, s, { ease: ease.bust, mat })));
    }
  }

  /* ---------- 下装 ---------- */
  else if (cat === 'bottoms') {
    const isSkirt = ['aline', 'pencil', 'flared', 'tiered', 'wrap'].includes(sil);
    if (isSkirt) {
      const hemY = Math.max(P.waistY - lenCm * U, P.base + 0.10);
      const hemR = Math.max(rOf(M.opening || 100) * sc, P.rHip + MIN_EASE);
      // 摆幅按「下摆半径 → 腰线半径」线性收，pencil 几乎不收
      const mulFn = y => {
        if (sil === 'pencil') return 1.0;
        const t = Math.min(1, Math.max(0, (P.waistY + 0.02 - y) / Math.max(P.waistY + 0.02 - hemY, 0.02)));
        const target = hemR / Math.max(P.rHip + CLOTH, 0.02);
        return 1 + (Math.max(target, 1) - 1) * t * t;
      };
      const geo = shellVarying(P, {
        yBot: hemY, yTop: P.waistY + 0.045, rows: 64, nTheta: 64,
        gap: gapOf(y => Math.max(easeFn(y), MIN_EASE)), mul: mulFn, maxMul: 2.1,
        rimTop: 0.018, rimBot: 0, rimIn: 0.008,
      });
      g.add(new THREE.Mesh(scaleUV(geo), mat));
    } else {
      // 裤装：腰臀段用躯干轮廓，裤腿沿腿轴
      const yWaist = P.waistY + 0.05;
      const yCrotch = P.hipY - 0.02;
      const geo = shellVarying(P, {
        yBot: yCrotch, yTop: yWaist, rows: 36, nTheta: 60,
        gap: gapOf(easeFnOut), maxMul: 1.5, rimTop: 0.020, rimIn: 0.008,
      });
      g.add(new THREE.Mesh(scaleUV(geo), mat));

      const yEnd = Math.max(P.base + 0.05, P.waistY - lenCm * U);
      const wide = sil === 'wide' || sil === 'palazzo';
      const legEase = y => Math.max(easeFn(y), MIN_EASE) + (wide ? 0.075 : 0.008);
      [-1, 1].forEach(s => {
        const pts = [];
        const N = 22;
        for (let i = 0; i <= N; i++) {
          const y = yCrotch + 0.01 + (yEnd - yCrotch - 0.01) * (i / N);
          const r = Math.max(radiusAt(P.leg, y) + legEase(y), 0.02);
          pts.push(new THREE.Vector2(r, y));
        }
        const m = new THREE.Mesh(new THREE.LatheGeometry(pts.sort((a, b) => a.y - b.y), 30), mat);
        m.position.x = s * P.legHalf;
        m.scale.z = P.legDepth;
        g.add(m);
      });
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
