/* ============================================================
   合身判断引擎
   ------------------------------------------------------------
   核心思想：先为模特建立一条「合身基准线」——即在模特净体三围上
   加这件衣服的合身放松量，得到「这件衣服合身时应该量到多少」。

   而「成衣实测尺寸」必须来自商品自身的平铺尺寸按官方尺码档差放缩，
   两者相减才是真正的偏差：
     · 基准线 = 模特净体 + 该款设计放松量
     · 成衣   = 该款基准码平铺尺寸 × 官方尺码档差
     · 偏差   = 成衣 − 基准线

   旧版本把「成衣」直接写成了基准线本身，于是偏差恒为 0，
   所有款式都判「非常合身 100 分」——那是循环论证，不是判断。
   现在两者来源不同，偏差才有意义：
     · 尺码小于该款设计尺码 → 成衣小于基准线 → 偏紧
     · 尺码大于该款设计尺码 → 成衣大于基准线 → 偏松
   ============================================================ */
import { SIZE_CHART, SIZES, DB_BY_ID } from './data.js';
import { DEFAULT_MODEL } from './body.js';

const BASE_SIZE = 'IT 42';

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

/** 官方尺码档比：该尺码相对基准码，某个部位的围度是几倍。
    直接用 DG 官方 IT 表的数值，不做任何推算或平移。 */
function gradeRatio(size, part) {
  const base = SIZE_CHART[BASE_SIZE] || {};
  const cur = SIZE_CHART[size] || base;
  const b = base[part], c = cur[part];
  if (!b || !c) return 1;
  return c / b;
}

/** 某款式某尺码的成衣实测尺寸：由该款基准码平铺尺寸按官方档比放缩。
    这是「这件衣服实际有多少」，与基准线「应该有多少」相互独立。 */
export function garmentMeasurements(itemId, size, model) {
  const item = DB_BY_ID[itemId];
  if (!item) return null;
  const M = item.measurements || {};
  const out = {};
  ['bust', 'waist', 'hip', 'shoulder'].forEach(part => {
    const base = M[part];
    if (!base) return;
    out[part] = Math.round(base * gradeRatio(size, part) * 10) / 10;
  });
  // 衣长等附属尺寸：按同档比的胸围比例缩放（与合身判断无关，但详情要显示）
  const gr = gradeRatio(size, 'bust');
  if (M.length != null) out.length = Math.round(M.length * gr * 10) / 10;
  if (M.sleeve != null) out.sleeve = Math.round(M.sleeve * gr * 10) / 10;
  if (M.opening != null) out.opening = M.opening;
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

/** 该部位参与合身判断的清单：上装没有臀围，外套不看臀围。 */
function fitParts(item) {
  const cat = (item && item.category) || 'tops';
  if (cat === 'bottoms') return ['waist', 'hip'];
  if (cat === 'outer') return ['bust', 'waist', 'shoulder'];
  return ['bust', 'waist'];
}

/**
 * 判断合身度（以合身基准线为参照）
 */
export function evaluateFit(itemId, size, model) {
  const item = DB_BY_ID[itemId];
  if (!item || !model) return null;
  const gm = garmentMeasurements(itemId, size, model) || {};
  const ease = fitEase(item);

  const details = [];
  let totalScore = 0;
  fitParts(item).forEach(part => {
    if (gm[part] == null || model[part] == null) return;
    const baseline = Math.round((model[part] + (ease[part] || 0)) * 10) / 10;
    const delta = Math.round((gm[part] - baseline) * 10) / 10;
    const j = judgePart(delta, TOL[part] || 2.5);
    details.push({
      part, label: PART_LABEL[part] || part,
      garment: gm[part],
      body: model[part],
      baseline,                                   // 合身基准围度
      ease: Math.round((gm[part] - model[part]) * 10) / 10,   // 这件衣服的实际放松量
      designEase: ease[part] || 0,                // 设计放松量
      delta,                                      // 相对基准线的偏差
      status: j.status, statusLabel: j.statusLabel,
      score: j.score,
    });
    totalScore += j.score;
  });

  if (!details.length) return null;
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

/** 某尺码相对基准线的最大偏差（cm）：用于选码时比较「差多少」 */
function maxDeviation(item, size, model) {
  const gm = garmentMeasurements(item.id, size, model) || {};
  const ease = fitEase(item);
  let worst = 0;
  fitParts(item).forEach(part => {
    if (gm[part] == null || model[part] == null) return;
    const baseline = model[part] + (ease[part] || 0);
    worst = Math.max(worst, Math.abs(gm[part] - baseline));
  });
  return worst;
}

/* ============================================================
   满分筛选：找出库里对这个身形最合身的那批商品
   ------------------------------------------------------------
   先说清一件必须说清的事：严格意义的「满分」——各部位同时落进
   合身基准的容差区间、也就是 100 分——全库 2123 款里一款都没有。
   原因不是引擎偷懒，是版型本身：DG / Balmain 官方成衣的胸腰差是
   18–22cm，而这个身形（胸 94.5 / 腰 85）的胸腰差只有 9.5cm。
   一件按 20cm 胸腰差裁的衣服，无论穿 IT42 还是 IT54，
   要么胸围松掉 6cm，要么腰围紧 9cm，两者不可能同时成立。
   换码能解决「同一件衣服偏大/偏小」，解决不了「版型与身形不符」。

   所以等级按这一档的短板来定，分三档：
     ★★★  没有「过紧」「过松」，也没有「一处偏紧、一处偏松」这种
           自相矛盾，并且至少有一个部位完全合身——库里能挑出来的
           最好状态，也就是满分档。
     ★★   没有过紧也没有过松，偏差只在「偏紧/偏松」之间。
     ★    出现「过紧」或「过松」，穿上去会勒住或会垮掉。

   等级跟尺码无关（永远取该款最优的一档），所以它衡量的是
   「这件衣服对这个人有多友好」，可以用来排序与筛选。
   ============================================================ */

/** 该款在可选尺码里合身评分最高的那一档。
    全库 2123 款共用 31 个测量模板，模板相同则结论必然相同，
    按模板缓存，就不用把 2000 多款 × 9 个尺码重算一遍。 */
const _bestFitCache = new Map();
export function bestFitForItem(itemId, model) {
  const item = DB_BY_ID[itemId];
  if (!item) return null;
  const key = `${item.category}|${JSON.stringify(item.measurements || {})}|${JSON.stringify(item.ease || null)}`;
  if (_bestFitCache.has(key)) return _bestFitCache.get(key);
  const sizes = (item.sizes && item.sizes.length) ? item.sizes : SIZES;
  let best = null;
  sizes.forEach(size => {
    const r = evaluateFit(itemId, size, model);
    if (r && (!best || r.score > best.score)) best = r;
  });
  _bestFitCache.set(key, best);
  return best;
}

/** 合身等级（0–3 星）与该款最优尺码。
    星级直接对应合身评分（评分取该款在可选尺码里的最好一档）：
      ★★★ 满分档  评分 ≥ 78，即「合身」及以上。库里只有针织、
                   垂坠缎面这类胸腰差不做收腰的版型能进这一档。
      ★★          评分 70–77，「基本合身」：不勒不垮，但有取舍。
      ★           评分 60–69，「略紧/略松」：能穿，但要留意版型。
      （0 星       评分 < 60，「偏小/偏大」，这一版库里为空）
    等级与尺码无关，永远取该款最优的一档，所以它衡量的是
    「这件衣服对这个身形有多友好」，可以用来排序与筛选。 */
export function fitGrade(itemId, model) {
  const best = bestFitForItem(itemId, model);
  if (!best) return { stars: 0, score: 0, size: null, verdict: '无数据', parts: [] };
  const score = best.score;
  const stars = score >= 78 ? 3 : score >= 70 ? 2 : score >= 60 ? 1 : 0;
  const absd = best.parts.map(p => Math.abs(p.delta));
  return {
    stars, score, size: best.size,
    maxDev: absd.length ? Math.max(...absd) : 0,
    verdict: best.verdict, parts: best.parts,
    level: stars === 3 ? 'perfect' : stars === 2 ? 'good' : stars === 1 ? 'fair' : 'poor',
  };
}

/** 推荐尺码：在该款可选尺码里，取相对合身基准线偏差最小的那一档。
    这是逐款算的——同一品牌的裙子与连衣裙，因为平铺尺寸不同，
    合身码可以不同。 */
export function recommendSizeForItem(itemId, model) {
  const item = DB_BY_ID[itemId];
  if (!item || !model) return fitSizeForModel(model);
  const sizes = (item.sizes && item.sizes.length) ? item.sizes : SIZES;
  let best = null, bestDev = Infinity;
  sizes.forEach(s => {
    const dev = maxDeviation(item, s, model);
    if (dev < bestDev - 1e-6) { bestDev = dev; best = s; }
  });
  return best || fitSizeForModel(model);
}

/** 尺寸落档：某部位净体落在标准表的哪一码 */
function sizeForMeasure(part, value) {
  if (!value) return null;
  for (const s of SIZES) if (SIZE_CHART[s][part] >= value) return s;
  return SIZES[SIZES.length - 1];
}

/** 合身码：以胸围、臀围为主，腰围作参考。
    旧逻辑取三围最紧项，对 B/C 型（胸腰差小）身材会把人误推到特大码：
    例如胸 94.5 / 腰 85 / 臀 99 的 B 型，胸落 XL、臀落 L、腰落 3XL，
    取最紧就变成 3XL，但成衣 S/M 的胸臀本就够穿。
    标准欧码表按胸腰差 16–20cm 的 A 型设计，对 B/C 型必须让腰退居参考位。 */
export function fitSizeForModel(model) {
  const m = { ...DEFAULT_MODEL, ...(model || {}) };
  const byBust = sizeForMeasure('bust', m.bust);
  const byHip = sizeForMeasure('hip', m.hip);
  const byWaist = sizeForMeasure('waist', m.waist);
  const candidates = [byBust, byBust, byHip, byWaist].filter(Boolean); // 胸臀权重更高
  // 取中位数：既不被单一偏大的腰拉飞，也不会低估确实偏大的围度
  candidates.sort((a, b) => SIZES.indexOf(a) - SIZES.indexOf(b));
  return candidates[Math.floor(candidates.length / 2)] || byBust || SIZES[0];
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
