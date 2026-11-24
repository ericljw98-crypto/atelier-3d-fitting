/* ============================================================
   合身判断引擎
   ------------------------------------------------------------
   核心思想：先为模特建立一条「合身基准线」——即在三围净体尺寸上
   加合理的穿着放松量，得到「这件衣服合身时应该量到多少」。

   成衣尺寸与 2D 图样放缩，全都以这条基准线为唯一参照：
     · 基准尺寸 = 模特净体 + 合身放松量（合身码，判定为合身）
     · 选大码 → 成衣围度按尺码档差增大 → 偏松，图样同比放宽
     · 选小码 → 成衣围度按尺码档差减小 → 偏紧，图样同比收窄

   这样诊断数字与 2D 上身图说的是同一件事，不会再出现
   「数据显示过松、上身看着却偏紧」这种自相矛盾的结论。
   ============================================================ */
import { SIZE_CHART, SIZES, DB_BY_ID } from './data.js';
import { DEFAULT_MODEL } from './body.js';

const BASE_SIZE = 'EU 38';

/* 合身放松量（cm）：净体之上、穿着舒适且外观合身所需的余量。
   这是「合身基准线」的核心参数，全站统一，不再由每件商品各写一套。 */
const FIT_EASE = {
  bust: 8, waist: 8, hip: 8,
  shoulder: 1.5,
};

/* 品类差异：外套要容纳内搭，放松量更大；贴身吊带更小。 */
const CATEGORY_EASE = {
  outer:   { bust: 12, waist: 12, hip: 12 },
  dresses: { bust: 7,  waist: 7,  hip: 7  },
  tops:    { bust: 8,  waist: 8,  hip: 8  },
  bottoms: { waist: 4, hip: 6 },
};
/* 版型微调：修身收紧放松量，宽松款加大。 */
const SILHOUETTE_EASE = {
  fitted: -2, slim: -2, slip: -2, bodycon: -2,
  loose: 4, oversize: 4, flared: 3, straight: 1,
};

/** 合身放松量：以商品自身声明的设计放松量为准（保留修身/宽松的差异），
    超出合理区间的历史脏数据按品类基准夹取。 */
export function fitEase(item) {
  const cat = (item && item.category) || 'tops';
  const base = { ...FIT_EASE, ...(CATEGORY_EASE[cat] || {}) };
  const declared = (item && item.ease) || {};
  const out = {};
  Object.keys(base).forEach(p => {
    const v = Number.isFinite(declared[p]) ? declared[p] : base[p];
    const lo = Math.min(base[p] - 5, 0);
    const hi = base[p] + 14;
    out[p] = Math.round(Math.min(hi, Math.max(lo, v)) * 10) / 10;
  });
  return out;
}

/** 合身基准线：模特穿上「合身尺码」时，衣服各部位应该量到的围度 */
export function fitBaseline(item, model) {
  const m = { ...DEFAULT_MODEL, ...(model || {}) };
  const ease = fitEase(item);
  const out = {};
  ['bust', 'waist', 'hip', 'shoulder'].forEach(p => {
    if (m[p] != null) out[p] = Math.round((m[p] + (ease[p] || 0)) * 10) / 10;
  });
  return out;
}

/** 合身码：净体三围各落在哪一档，取最紧的一档（与尺码提示口径一致） */
export function fitSizeForModel(model) {
  const m = { ...DEFAULT_MODEL, ...(model || {}) };
  let pick = SIZES[0];
  ['bust', 'waist', 'hip'].forEach(k => {
    const v = m[k];
    if (!v) return;
    let hit = SIZES[SIZES.length - 1];
    for (const s of SIZES) { if (SIZE_CHART[s][k] >= v) { hit = s; break; } }
    if (SIZES.indexOf(hit) > SIZES.indexOf(pick)) pick = hit;
  });
  return pick;
}

/** 某尺码相对基准码的档差（cm），分部位按各自档差累计 */
function gradeDelta(size, part, fitSize) {
  const a = SIZE_CHART[fitSize] || SIZE_CHART[BASE_SIZE];
  const b = SIZE_CHART[size] || a;
  return (b[part] ?? b.bust) - (a[part] ?? a.bust);
}

/** 某款式某尺码的成衣实测尺寸：以合身基准线为零点 + 尺码档差 */
export function garmentMeasurements(itemId, size, model) {
  const item = DB_BY_ID[itemId];
  if (!item) return null;
  const baseline = fitBaseline(item, model);
  const fitSize = fitSizeForModel(model);
  const out = {};
  Object.keys(baseline).forEach(part => {
    out[part] = Math.round((baseline[part] + gradeDelta(size, part, fitSize)) * 10) / 10;
  });
  // 衣长等附属尺寸仍按原档差，与合身判断无关，但详情要显示
  if (item.measurements) {
    const len = item.measurements.length, sl = item.measurements.sleeve;
    if (len != null) out.length = Math.round((len * ((SIZE_CHART[size] || SIZE_CHART[BASE_SIZE]).bust / SIZE_CHART[BASE_SIZE].bust)) * 10) / 10;
    if (sl != null) out.sleeve = Math.round((sl * ((SIZE_CHART[size] || SIZE_CHART[BASE_SIZE]).bust / SIZE_CHART[BASE_SIZE].bust)) * 10) / 10;
  }
  return out;
}

/** 判断一个部位相对合身基准线的偏差，返回状态与分数 */
function judgePart(delta, tol) {
  if (delta < -tol - 5) return { status: 'tooTight', statusLabel: '过紧', score: 20 };
  if (delta < -tol)     return { status: 'tight',    statusLabel: '偏紧', score: 60 };
  if (delta > tol + 5)  return { status: 'tooLoose', statusLabel: '过松', score: 25 };
  if (delta > tol)      return { status: 'loose',    statusLabel: '偏松', score: 65 };
  return { status: 'good', statusLabel: '合身', score: 100 };
}

const PART_LABEL = { bust: '胸围', waist: '腰围', hip: '臀围', shoulder: '肩宽' };
const TOL = { bust: 2.5, waist: 2.5, hip: 2.5, shoulder: 1.2 };

/**
 * 判断合身度（以合身基准线为参照）
 */
export function evaluateFit(itemId, size, model) {
  const item = DB_BY_ID[itemId];
  if (!item || !model) return null;
  const gm = garmentMeasurements(itemId, size, model);
  const ease = fitEase(item);

  let parts;
  if (item.category === 'bottoms') parts = ['waist', 'hip'];
  else if (item.category === 'outer') parts = ['bust', 'waist', 'shoulder'];
  else parts = ['bust', 'waist', 'hip'];

  const details = [];
  let totalScore = 0;
  parts.forEach(part => {
    if (gm[part] == null || model[part] == null) return;
    const baseline = Math.round((model[part] + (ease[part] || 0)) * 10) / 10;
    const delta = Math.round((gm[part] - baseline) * 10) / 10;
    const j = judgePart(delta, TOL[part] || 2.5);
    details.push({
      part, label: PART_LABEL[part] || part,
      garment: gm[part],
      body: model[part],
      baseline,                                   // 合身基准围度
      ease: Math.round((gm[part] - model[part]) * 10) / 10,
      designEase: ease[part] || 0,                // 合身放松量
      delta,                                      // 相对基准线的偏差
      status: j.status, statusLabel: j.statusLabel,
      score: j.score,
    });
    totalScore += j.score;
  });

  const score = details.length ? Math.round(totalScore / details.length) : 0;
  const has = s => details.some(d => d.status === s);
  let level, verdict;
  if (score >= 92) { level = 'perfect'; verdict = '非常合身'; }
  else if (score >= 78 && !has('tight') && !has('loose')) { level = 'good'; verdict = '合身'; }
  else if (score >= 70) { level = 'good'; verdict = '基本合身'; }
  else if (has('tooTight')) { level = 'tooTight'; verdict = '偏小 / 过紧'; }
  else if (has('tooLoose')) { level = 'tooLoose'; verdict = '偏大 / 过松'; }
  else if (has('tight')) { level = 'tight'; verdict = '略紧'; }
  else { level = 'loose'; verdict = '略松'; }

  const recommendation = recommendSizeForItem(itemId, model);
  const summary = buildSummary(verdict, details, recommendation);
  return { score, level, verdict, parts: details, recommendation, summary, size, itemId };
}

/** 推荐尺码：让成衣围度最接近合身基准线的那一码 */
export function recommendSizeForItem(itemId, model) {
  const item = DB_BY_ID[itemId];
  if (!item || !model) return fitSizeForModel(model);
  const sizes = item.sizes || SIZES;
  let best = fitSizeForModel(model), bestScore = -1;
  sizes.forEach(s => {
    const r = evaluateScoreOnly(itemId, s, model);
    if (r > bestScore) { bestScore = r; best = s; }
  });
  return best;
}

function evaluateScoreOnly(itemId, size, model) {
  const item = DB_BY_ID[itemId];
  const gm = garmentMeasurements(itemId, size, model);
  const ease = fitEase(item);
  const parts = item.category === 'bottoms' ? ['waist', 'hip']
    : item.category === 'outer' ? ['bust', 'waist', 'shoulder']
    : ['bust', 'waist', 'hip'];
  let sum = 0, n = 0;
  parts.forEach(p => {
    const baseline = model[p] + (ease[p] || 0);
    const d = gm[p] - baseline;
    const tol = TOL[p] || 2.5;
    if (d < -tol - 5 || d > tol + 5) sum += 20;
    else if (d < -tol || d > tol) sum += 60;
    else sum += 100;
    n++;
  });
  return n ? sum / n : 0;
}

function buildSummary(verdict, details, recommendation) {
  const tightParts = details.filter(d => d.status.includes('tight')).map(d => d.label);
  const looseParts = details.filter(d => d.status.includes('Loose') || d.status === 'loose').map(d => d.label);
  let s = `以合身基准线判断：${verdict}。`;
  if (tightParts.length) s += `${tightParts.join('、')}小于合身基准。`;
  if (looseParts.length) s += `${looseParts.join('、')}大于合身基准。`;
  if (!tightParts.length && !looseParts.length) s += '各部位均落在合身基准区间。';
  s += ` 建议尺码 ${recommendation}。`;
  return s;
}
