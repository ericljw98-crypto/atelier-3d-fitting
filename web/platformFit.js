/* ============================================================
   平台商品（symbol.ua / domino.ua）的合身判据
   ------------------------------------------------------------
   上一版的错误：成衣尺寸与尺码基准线同源——成衣围度是从 CUT_BASES
   模板反推的，放松量又用「成衣 − IT42 人体」算，于是成衣恰好等于
   基准线，偏差恒为 0，全库清一色 100 分。那是循环论证。

   这一版把「成衣围度 − 模特围度」拆成两段，只有第一段是真偏差：

        成衣围度 = 该码官方净体围度 + 该版型设计余量
        偏差     = (该码官方净体围度 − 模特围度) + 设计余量
                 = 尺码档误差       + 设计余量

   · 尺码档误差：来自**品牌官方尺码表**该档的净体围度，与模特围度
     比较。独立、真实、随平台在售尺码变化。
   · 设计余量：版型的行业余量（T恤 10cm、卫衣 16cm…），是版型属性，
     不是从成衣尺寸反算的量。它不参与「偏紧/偏松」判定，
     而是**放宽容差**：余量大的款（卫衣、廓形）尺码档差几档也还穿得下，
     余量小的款（收腰、贴身）差一档就勒。

   判据链条（三段都来自外部事实）：
     ① 平台在售尺码 → 该款真正能买到的码（字母码按欧码字母序列落
        到 IT 轴；该序列由 Balmain 官方 FR↔IT 对照表与 DG 官方 IT 表
        字母列共同印证）。
     ② 该码官方净体围度 → DG 官方 IT 表原值（各品牌同属欧码体系）。
     ③ 模特围度 → 用户实测档案。

   于是「平台只卖 XS，而这件是修身款」会判成过紧、「平台只卖 XXL，
   而这是直筒卫衣」会判成偏松——这些都来自平台真实尺码数据。
   ============================================================ */

import { SIZE_CHART } from './data.js';

/* 字母码 → IT 码（欧码字母序列）。
   依据：Balmain 官方对照表 XS=FR34=IT38、S=FR36=IT40、M=FR38=IT42、
   L=FR40=IT44…；DG 官方 IT 表字母列同序（XS=IT38 … 3XL=IT50）。 */
export const LETTER_TO_IT = {
  XXS: 38, XS: 38, S: 40, M: 42, L: 44, XL: 46, XXL: 48,
  '2XL': 48, '3XL': 50, '4XL': 52, '5XL': 54,
  XXXS: 38, XXXL: 52, XXXXL: 54,
};

/* 平台尺码栏的写法：字母码、斜杠连写、逗号分隔、纯数字码 */
export function parsePlatformSizes(text) {
  if (!text) return [];
  const out = [];
  String(text).split(/[,/\\s]+/).forEach(raw => {
    const t = String(raw || '').trim().toUpperCase();
    if (!t) return;
    if (/^\d{2}$/.test(t)) { const n = +t; if (n >= 36 && n <= 56) out.push(n); return; }
    const key = t.replace(/[^A-Z0-9]/g, '');
    if (!key) return;
    if (LETTER_TO_IT[key] != null) { out.push(LETTER_TO_IT[key]); return; }
    const m = key.match(/^(X*)L$/);          // XXL / XXXL
    if (m) { const n = 38 + (m[1].length - 1) * 2; if (n <= 54) out.push(n); return; }
    const m2 = key.match(/^(X*)S$/);         // XXXS
    if (m2) { const n = 38 - (m2[1].length - 1) * 2; if (n >= 36) out.push(n); return; }
  });
  return [...new Set(out)].sort((a, b) => a - b);
}

/* 各版型的设计余量（cm）：成衣围度 − 该码净体围度。
   取各品类在欧洲成衣里的常见余量区间，逐项标注口径；
   这些是版型常量，不是从任何成衣尺寸反算出来的量。 */
export const CUT_EASE = {
  /* 上装 */
  tee:        { bust: 10, shoulder: 2.5, hang: true },   // 厚棉 T 恤
  sweatshirt: { bust: 16, shoulder: 4,   hang: true },   // 套头卫衣
  knit:       { bust: 8,  shoulder: 2,   hang: true },   // 细针织
  polo:       { bust: 8,  shoulder: 1.5, hang: true },
  shirt:      { bust: 12, shoulder: 2,   hang: true },   // 落肩衬衫
  fitted_top: { bust: 4,  shoulder: 0.5 },
  silk_top:   { bust: 6,  shoulder: 1,   hang: true },
  /* 连衣裙 */
  shift_dress: { bust: 10, shoulder: 2.5, hang: true },
  boxy_dress:  { bust: 16, shoulder: 4,   hang: true },
  knit_dress:  { bust: 8,  shoulder: 2,   hang: true },
  aline_dress: { bust: 6,  waist: 4, hip: 6 },
  fitted_dress:{ bust: 3,  waist: 2, hip: 3 },
  silk_dress:  { bust: 6,  shoulder: 1,   hang: true },
  /* 外套 */
  coat:  { bust: 18, waist: 16, shoulder: 5 },
  blazer:{ bust: 14, waist: 12, shoulder: 4 },
  /* 下装 */
  straight_trouser: { waist: 4, hip: 6 },
  wide_trouser:     { waist: 5, hip: 10 },
  aline_skirt:      { waist: 3, hip: 8 },
  pencil_skirt:     { waist: 1, hip: 2 },
  denim:            { waist: 2, hip: 3 },
};

/* 判定部位与角色：垂坠款整片从肩胸挂下来，腰围不随身体走，
   所以只判上身开口；下装按臀围定码；外套按胸围定码。

   腰围为什么只作提示、不参与打分：欧码表的腰围是按标准 A 型身材
   （胸腰差 16–20cm）设计的，而这个身形胸 94.5 / 腰 85，胸腰差只有
   9.5cm。在这张表上，她的胸臀落在 IT42–44，腰围却要 IT50——
   **没有任何一档能同时满足她的胸臀和腰**。这个缺口是码表的体型
   假设造成的，不是任何一件衣服的问题。
   把它算进分数，等于用「她穿不进这个码表的腰围」去否定每一件
   版型完全正确的裙子，那是把测量体系的偏差算到衣服头上。
   所以：下装的主判据是臀围，外套的主判据是胸围，腰围一律只作
   文字提示（「按臀/胸选码，腰围需调整」）。 */
function partsFor(item, ease) {
  const cat = item.category;
  if (cat === 'bottoms') return { primary: ['hip'], reference: ['waist'] };
  if (cat === 'outer') return { primary: ['bust'], reference: ['waist'] };
  if (ease.hang) return { primary: ['bust'], reference: [] };
  /* 收腰款：腰围是成衣结构的一部分，纳入主判据 */
  return { primary: ['bust', 'waist'], reference: [] };
}

/* 参考部位不参与计分（权重 0），只在诊断文字里提示 */
const REF_PART = { waist: 0 };

/* 基础容差：净体围度与模特围度相差多少算「这一档的码不对」。
   余量大的款可以差得更多（卫衣大一码照样穿），所以容差随余量放大。 */
const BASE_TOL = { bust: 2, waist: 2, hip: 2, shoulder: 1 };

function tolOf(part, ease) {
  const e = ease[part] || 0;
  return (BASE_TOL[part] || 2) + e * 0.55;
}

function grade(err, part, ease) {
  const tol = tolOf(part, ease);
  if (err < -tol - 3) return { status: 'tooTight', statusLabel: '过紧', score: 20 };
  if (err < -tol)     return { status: 'tight',    statusLabel: '偏紧', score: 60 };
  if (err > tol + 3)  return { status: 'tooLoose', statusLabel: '过松', score: 25 };
  if (err > tol)      return { status: 'loose',    statusLabel: '偏松', score: 65 };
  return { status: 'good', statusLabel: '合身', score: 100 };
}

/** 该码的官方净体围度（肩宽按胸围比例推：肩/胸比例在欧码表里基本恒定） */
export function bodyAt(itNum, model) {
  const row = SIZE_CHART['IT ' + itNum];
  if (!row) return null;
  const out = { bust: row.bust, waist: row.waist, hip: row.hip };
  if (model && model.shoulder && model.bust) {
    out.shoulder = Math.round(model.shoulder * row.bust / model.bust * 10) / 10;
  }
  return out;
}

/**
 * 单档码的合身判定。
 * @param item 需含 cut / category / sizesText
 * @param itNum 该档 IT 码号
 * @param model 模特围度
 */
export function judgeAt(item, itNum, model) {
  const body = bodyAt(itNum, model);
  if (!body) return null;
  const ease = CUT_EASE[item.cut] || CUT_EASE.shift_dress;
  const { primary, reference, waistStrong } = partsFor(item, ease);
  const details = [];
  for (const part of [...primary, ...reference]) {
    if (body[part] == null || model[part] == null) continue;
    /* 尺码档误差：该码净体围度与模特围度之差（不含设计余量） */
    const err = Math.round((body[part] - model[part]) * 10) / 10;
    const g = grade(err, part, ease);
    const isPrimary = primary.includes(part);
    details.push({
      part,
      label: { bust: '胸围', waist: '腰围', hip: '臀围', shoulder: '肩宽' }[part] || part,
      /* 成衣围度 = 该码净体围度 + 设计余量 */
      garment: Math.round((body[part] + (ease[part] || 0)) * 10) / 10,
      body: model[part],
      ease: ease[part] || 0,
      delta: err,                       // 尺码档误差
      role: isPrimary ? '主判据' : (waistStrong && part === 'waist' ? '参考' : '参考'),
      status: g.status, statusLabel: g.statusLabel, score: g.score,
    });
  }
  if (!details.length) return null;
  /* 主判据等权计分；参考部位权重为 0，不进分母也不进分子 */
  let wSum = 0, sSum = 0;
  for (const d of details) {
    const w = d.role === '主判据' ? 1 : (REF_PART[d.part] != null ? REF_PART[d.part] : 0);
    if (w <= 0) continue;
    wSum += w; sSum += d.score * w;
  }
  if (!wSum) return null;
  const score = Math.round(sSum / wSum);
  /* 只有主判据能一票否决；参考部位超差给提示但不否决 */
  const prim = details.filter(d => d.role === '主判据');
  const has = (st, arr) => arr.some(d => d.status === st);
  const blocked = has('tooTight', prim) || has('tooLoose', prim);
  const conflict = has('tight', prim) && has('loose', prim);
  return { score, size: 'IT ' + itNum, itNum, parts: details, blocked, conflict };
}

/**
 * 逐款评分：只在**平台真正在售**的尺码里取最优一档。
 * @returns null 表示该款尺码无法解读或没有可判部位
 */
export function scorePlatformItem(item, model) {
  const avail = parsePlatformSizes(item.sizesText || '');
  if (!avail.length) return null;
  const rows = [];
  for (const n of avail) {
    const r = judgeAt(item, n, model);
    if (r) rows.push(r);
  }
  if (!rows.length) return null;
  rows.sort((a, b) => {
    if (a.blocked !== b.blocked) return a.blocked ? 1 : -1;
    if (a.conflict !== b.conflict) return a.conflict ? 1 : -1;
    if (b.score !== a.score) return b.score - a.score;
    const da = Math.max(...a.parts.map(p => Math.abs(p.delta)));
    const db = Math.max(...b.parts.map(p => Math.abs(p.delta)));
    return da - db;
  });
  const best = rows[0];
  return {
    score: best.score, size: best.size, itNum: best.itNum,
    avail, availText: item.sizesText || '',
    parts: best.parts, blocked: best.blocked, conflict: best.conflict,
    all: rows,
  };
}

/** 平台上该款有没有这个码（用于 UI 提示「该款没有这个码」） */
export function hasSize(item, itNum) {
  return parsePlatformSizes(item.sizesText || '').includes(itNum);
}

/** 平台在售尺码 → 与 SIZES 同形的字符串列表（'IT 44'） */
export function platformSizes(text) {
  return parsePlatformSizes(text).map(n => 'IT ' + n);
}
