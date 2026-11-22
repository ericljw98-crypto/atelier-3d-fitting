/* ============================================================
   合身判断引擎
   ------------------------------------------------------------
   核心思想：成衣是固定尺寸的商品，不随模特变形。
   判断「这件衣服的这个尺码穿在这个模特身上是否合身」，
   方法是比较成衣实测围度与模特身体围度的差值（实际放松量），
   并对照该款式的设计放松量（ease）与品类容差。
   ============================================================ */
import { SIZE_CHART, DB_BY_ID } from './data.js';

const BASE_SIZE = 'IT 40';
const BASE_BUST = SIZE_CHART[BASE_SIZE].bust;

// 各部位的合身容差（cm）：设计 ease 基础上允许的下偏差/上偏差
// 弹力/针织款容忍负值，梭织修身款容差小
const TOLERANCE = {
  bust:  { low: 3, high: 4 },
  waist: { low: 3, high: 4 },
  hip:   { low: 3, high: 4 },
  shoulder: { low: 1.5, high: 1.5 },
};

// 部位中文名
const PART_LABEL = {
  bust: '胸围', waist: '腰围', hip: '臀围', shoulder: '肩宽',
};

export function sizeScale(size) {
  const row = SIZE_CHART[size] || SIZE_CHART[BASE_SIZE];
  return row.bust / BASE_BUST;
}

/** 计算某款式某尺码的成衣实测尺寸 */
export function garmentMeasurements(itemId, size) {
  const item = DB_BY_ID[itemId];
  if (!item) return null;
  const sc = sizeScale(size);
  const m = item.measurements;
  const out = {};
  Object.keys(m).forEach(k => { out[k] = Math.round(m[k] * sc * 10) / 10; });
  return out;
}

/**
 * 判断合身度
 * @returns {
 *   score: 0-100, verdict: 串, level: perfect|good|tight|loose|tooTight|tooLoose,
 *   parts: [{part, garment, body, ease, designEase, delta, status, statusLabel}],
 *   recommendation: 推荐尺码, summary: 结论描述
 * }
 */
export function evaluateFit(itemId, size, model) {
  const item = DB_BY_ID[itemId];
  if (!item || !model) return null;
  const gm = garmentMeasurements(itemId, size);
  const designEase = item.ease || {};
  const category = item.category;

  // 按品类决定参与判断的部位
  let parts;
  if (category === 'bottoms') parts = ['waist', 'hip'];
  else if (category === 'outer') parts = ['bust', 'waist', 'shoulder'];
  else parts = ['bust', 'waist', 'hip']; // dresses / tops

  const details = [];
  let totalScore = 0;

  parts.forEach(part => {
    const garmentVal = gm[part];
    const bodyVal = model[part];
    if (garmentVal == null || bodyVal == null) return;

    // 肩宽是"宽度"而非围度，成衣 shoulder 已是半宽或全宽需按数据语义；
    // 数据库中 shoulder 单位 cm 且与人体肩宽同口径，直接比较
    const actualEase = garmentVal - bodyVal;
    const design = designEase[part] || 0;
    const tol = TOLERANCE[part] || { low: 3, high: 4 };

    // 与设计放松量的偏差：负值=比设计更紧，正值=比设计更松
    const delta = actualEase - design;

    let status, statusLabel, partScore;
    if (delta < -tol.low - 4) {
      status = 'tooTight'; statusLabel = '过紧'; partScore = 20;
    } else if (delta < -tol.low) {
      status = 'tight'; statusLabel = '偏紧'; partScore = 60;
    } else if (delta > tol.high + 5) {
      status = 'tooLoose'; statusLabel = '过松'; partScore = 25;
    } else if (delta > tol.high) {
      status = 'loose'; statusLabel = '偏松'; partScore = 65;
    } else {
      status = 'good'; statusLabel = '合身'; partScore = 100;
    }

    details.push({
      part, label: PART_LABEL[part] || part,
      garment: Math.round(garmentVal * 10) / 10,
      body: Math.round(bodyVal * 10) / 10,
      ease: Math.round(actualEase * 10) / 10,
      designEase: design,
      delta: Math.round(delta * 10) / 10,
      status, statusLabel, score: partScore,
    });
    totalScore += partScore;
  });

  const score = details.length ? Math.round(totalScore / details.length) : 0;

  let level, verdict;
  const hasTooTight = details.some(d => d.status === 'tooTight');
  const hasTooLoose = details.some(d => d.status === 'tooLoose');
  const hasTight = details.some(d => d.status === 'tight');
  const hasLoose = details.some(d => d.status === 'loose');

  if (score >= 92) { level = 'perfect'; verdict = '非常合身'; }
  else if (score >= 78 && !hasTight && !hasLoose) { level = 'good'; verdict = '合身'; }
  else if (score >= 70) { level = 'good'; verdict = '基本合身'; }
  else if (hasTooTight) { level = 'tooTight'; verdict = '偏小 / 过紧'; }
  else if (hasTooLoose) { level = 'tooLoose'; verdict = '偏大 / 过松'; }
  else if (hasTight) { level = 'tight'; verdict = '略紧'; }
  else { level = 'loose'; verdict = '略松'; }

  const recommendation = recommendSizeForItem(itemId, model);
  const summary = buildSummary(verdict, details, recommendation);

  return { score, level, verdict, parts: details, recommendation, summary, size, itemId };
}

/** 为某款式推荐最合身的尺码（遍历所有尺码求最高分） */
export function recommendSizeForItem(itemId, model) {
  const item = DB_BY_ID[itemId];
  if (!item || !model) return BASE_SIZE;
  const sizes = item.sizes || Object.keys(SIZE_CHART);
  let best = BASE_SIZE, bestScore = -1;
  sizes.forEach(s => {
    const r = evaluateScoreOnly(itemId, s, model);
    if (r > bestScore) { bestScore = r; best = s; }
  });
  return best;
}

function evaluateScoreOnly(itemId, size, model) {
  const item = DB_BY_ID[itemId];
  const gm = garmentMeasurements(itemId, size);
  const designEase = item.ease || {};
  const parts = item.category === 'bottoms' ? ['waist', 'hip']
    : item.category === 'outer' ? ['bust', 'waist', 'shoulder']
    : ['bust', 'waist', 'hip'];
  let sum = 0, n = 0;
  parts.forEach(p => {
    const g = gm[p], b = model[p];
    if (g == null || b == null) return;
    const tol = TOLERANCE[p] || { low: 3, high: 4 };
    const delta = (g - b) - (designEase[p] || 0);
    if (delta < -tol.low - 4 || delta > tol.high + 5) sum += 20;
    else if (delta < -tol.low || delta > tol.high) sum += 60;
    else sum += 100;
    n++;
  });
  return n ? sum / n : 0;
}

function buildSummary(verdict, details, recommendation) {
  const tightParts = details.filter(d => d.status.includes('tight')).map(d => d.label);
  const looseParts = details.filter(d => d.status.includes('Loose') || d.status === 'loose' || d.status === 'tooLoose').map(d => d.label);
  let s = `整体评判：${verdict}。`;
  if (tightParts.length) s += `${tightParts.join('、')}偏紧。`;
  if (looseParts.length) s += `${looseParts.join('、')}偏松。`;
  if (!tightParts.length && !looseParts.length) s += '各部位放松量接近设计值。';
  s += ` 建议尺码 ${recommendation}。`;
  return s;
}
