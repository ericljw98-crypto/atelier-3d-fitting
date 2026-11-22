/* ============================================================
   商品图模块
   ------------------------------------------------------------
   按品类和版型程序化生成矢量款式图（fashion flat），主色取自
   商品数据库。全部为本地内联 SVG，不依赖外链，网页版与 APK
   离线环境均可稳定显示。
   ============================================================ */

function clampByte(v) { return Math.max(0, Math.min(255, Math.round(v))); }

/** 按倍率调整颜色明度：k>1 变亮，k<1 变暗 */
function shade(hex, k) {
  const r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
  return '#' + [clampByte(r * k), clampByte(g * k), clampByte(b * k)]
    .map(v => v.toString(16).padStart(2, '0')).join('');
}

/** 由左右对称的 [y, 半宽] 点列生成闭合轮廓路径，中心 x = 60 */
function silhouette(points) {
  if (!points.length) return '';
  const top = points[0], last = points[points.length - 1];
  let d = `M ${60 - top[1]} ${top[0]} L ${60 + top[1]} ${top[0]}`;
  for (let i = 1; i < points.length; i++) d += ` L ${60 + points[i][1]} ${points[i][0]}`;
  d += ` L ${60 - last[1]} ${last[0]}`;
  for (let i = points.length - 2; i >= 0; i--) d += ` L ${60 - points[i][1]} ${points[i][0]}`;
  return d + ' Z';
}

/** 对称袖片 */
function sleeves(y, hw, len, fill) {
  const x = 60 + hw;
  const right = `M ${x - 3} ${y + 1} L ${x + 15} ${y + 8} L ${x + 11} ${y + len} L ${x - 5} ${y + len - 7} Z`;
  const left = `M ${120 - x + 3} ${y + 1} L ${120 - x - 15} ${y + 8} L ${120 - x - 11} ${y + len} L ${120 - x + 5} ${y + len - 7} Z`;
  return `<path d="${right}" fill="${fill}"/><path d="${left}" fill="${fill}"/>`;
}

/** 吊带/无袖细肩带 */
function straps(y, hw, fill) {
  const x = 60 + hw * 0.55;
  return `<path d="M ${x - 3} ${y} L ${x + 1} ${y} L ${x + 4} ${y + 20} L ${x} ${y + 20} Z" fill="${fill}"/>
          <path d="M ${120 - x + 3} ${y} L ${120 - x - 1} ${y} L ${120 - x - 4} ${y + 20} L ${120 - x} ${y + 20} Z" fill="${fill}"/>`;
}

/* 品类 + 版型 → 轮廓点、袖型、细节 */
function design(item) {
  const sil = item.silhouette;
  const cat = item.category;
  const long = 58, short = 18;

  if (cat === 'dresses') {
    const base = {
      slip:     { pts: [[24, 15], [40, 26], [62, 19], [78, 25], [132, 30]], strap: true,  detail: 'seam' },
      fitted:   { pts: [[22, 20], [38, 28], [58, 20], [76, 25], [122, 23]], sleeve: short, detail: 'seam' },
      aline:    { pts: [[22, 20], [38, 28], [58, 21], [76, 27], [126, 44]], sleeve: short, detail: 'waist' },
      flared:   { pts: [[22, 20], [38, 28], [58, 20], [76, 25], [134, 54]], strap: true,  detail: 'waist' },
      wrap:     { pts: [[22, 21], [38, 28], [58, 20], [76, 26], [126, 32]], sleeve: long,  detail: 'wrap' },
      peplum:   { pts: [[22, 20], [38, 27], [56, 19], [66, 34], [74, 24], [116, 27]], sleeve: short, detail: 'peplum' },
      blouse:   { pts: [[22, 21], [38, 28], [58, 22], [78, 28], [120, 33]], sleeve: long,  detail: 'shirt' },
      straight: { pts: [[22, 20], [38, 27], [58, 21], [76, 25], [116, 29]], sleeve: short, detail: 'seam' },
      cape:     { pts: [[22, 20], [38, 30], [58, 22], [78, 30], [124, 42]], detail: 'cape' },
      knit:     { pts: [[22, 20], [36, 27], [56, 20], [74, 24], [118, 24]], sleeve: long,  detail: 'knit' },
    };
    return base[sil] || base.fitted;
  }
  if (cat === 'tops') {
    const base = {
      fitted:   { pts: [[24, 20], [38, 28], [58, 21], [88, 23]], sleeve: short, detail: 'seam' },
      blouse:   { pts: [[24, 21], [38, 28], [58, 23], [90, 28]], sleeve: long,  detail: 'shirt' },
      knit:     { pts: [[24, 20], [38, 27], [58, 21], [86, 22]], sleeve: long,  detail: 'knit' },
      slip:     { pts: [[26, 16], [40, 26], [58, 20], [86, 22]], strap: true,  detail: 'seam' },
      oversize: { pts: [[24, 26], [38, 32], [58, 30], [92, 34]], sleeve: long,  detail: 'knit' },
    };
    return base[sil] || base.fitted;
  }
  if (cat === 'bottoms') {
    const shortLen = 74;
    const base = {
      straight: { pts: [[24, 22], [42, 27], [76, 23], [126, 21]], detail: 'waistband' },
      wide:     { pts: [[24, 22], [42, 28], [76, 31], [126, 36]], detail: 'waistband' },
      skinny:   { pts: [[24, 21], [42, 26], [76, 18], [124, 13]], detail: 'waistband' },
      pencil:   { pts: [[24, 21], [42, 26], [76, 24], [118, 23]], detail: 'waistband' },
      aline:    { pts: [[24, 21], [42, 27], [62, 31], [shortLen, 40]], detail: 'waistband' },
      mini:     { pts: [[24, 21], [42, 26], [58, 28], [shortLen, 32]], detail: 'waistband' },
      flared:   { pts: [[24, 21], [42, 27], [76, 29], [114, 46]], detail: 'waistband' },
    };
    return base[sil] || base.straight;
  }
  const base = {
    blazer:   { pts: [[22, 24], [38, 31], [62, 27], [104, 30]], sleeve: long,  detail: 'lapel' },
    trench:   { pts: [[22, 25], [38, 32], [62, 29], [128, 38]], sleeve: long,  detail: 'trench' },
    biker:    { pts: [[22, 24], [38, 30], [58, 26], [92, 27]],  sleeve: long,  detail: 'zip' },
    oversize: { pts: [[22, 28], [38, 35], [62, 33], [124, 44]], sleeve: long,  detail: 'lapel' },
    knit:     { pts: [[22, 24], [38, 30], [58, 27], [94, 29]],  sleeve: long,  detail: 'knit' },
    cape:     { pts: [[22, 23], [38, 34], [62, 34], [116, 46]], detail: 'cape' },
  };
  return base[sil] || base.blazer;
}

function detailSVG(kind, fill, dark) {
  const stroke = dark;
  switch (kind) {
    case 'seam':
      return `<path d="M 60 26 L 60 118" stroke="${stroke}" stroke-width="0.6" opacity="0.35" fill="none"/>
              <path d="M 46 40 Q 60 46 74 40" stroke="${stroke}" stroke-width="0.7" opacity="0.4" fill="none"/>`;
    case 'waist':
      return `<path d="M 40 58 Q 60 63 80 58" stroke="${stroke}" stroke-width="1" opacity="0.5" fill="none"/>`;
    case 'wrap':
      return `<path d="M 42 24 L 74 62 M 78 24 L 46 62" stroke="${stroke}" stroke-width="0.9" opacity="0.45" fill="none"/>
              <circle cx="60" cy="62" r="1.8" fill="${stroke}" opacity="0.6"/>`;
    case 'peplum':
      return `<path d="M 42 54 Q 60 72 78 54" stroke="${stroke}" stroke-width="1" opacity="0.5" fill="none"/>`;
    case 'shirt':
      return `<path d="M 60 24 L 60 88" stroke="${stroke}" stroke-width="0.7" opacity="0.4" fill="none"/>
              ${[36, 50, 64, 78].map(y=>`<circle cx="60" cy="${y}" r="1.1" fill="${stroke}" opacity="0.55"/>`).join('')}
              <path d="M 52 24 L 60 32 L 68 24" stroke="${stroke}" stroke-width="0.9" opacity="0.5" fill="none"/>`;
    case 'knit':
      return `<path d="M 44 34 H 76 M 43 44 H 77 M 43 54 H 77 M 43 64 H 77" stroke="${stroke}" stroke-width="0.5" opacity="0.22" fill="none"/>`;
    case 'waistband':
      return `<path d="M 38 30 H 82 M 38 34 H 82" stroke="${stroke}" stroke-width="0.8" opacity="0.45" fill="none"/>
              <circle cx="60" cy="32" r="1.4" fill="${stroke}" opacity="0.6"/>`;
    case 'lapel':
      return `<path d="M 46 22 L 60 40 L 74 22 M 60 40 L 60 102" stroke="${stroke}" stroke-width="0.9" opacity="0.55" fill="none"/>
              <circle cx="60" cy="54" r="1.2" fill="${stroke}" opacity="0.6"/><circle cx="60" cy="70" r="1.2" fill="${stroke}" opacity="0.6"/>`;
    case 'trench':
      return `<path d="M 60 24 L 60 126 M 42 58 H 78" stroke="${stroke}" stroke-width="0.8" opacity="0.45" fill="none"/>
              <path d="M 46 22 L 60 36 L 74 22" stroke="${stroke}" stroke-width="0.9" opacity="0.5" fill="none"/>
              ${[46, 62, 78].map(y=>`<circle cx="66" cy="${y}" r="1.3" fill="${stroke}" opacity="0.6"/>`).join('')}`;
    case 'zip':
      return `<path d="M 60 24 L 60 92" stroke="${stroke}" stroke-width="1.2" opacity="0.6" fill="none"/>
              <path d="M 46 22 L 60 32 L 74 22" stroke="${stroke}" stroke-width="0.9" opacity="0.5" fill="none"/>`;
    case 'cape':
      return `<path d="M 44 30 Q 30 60 34 96 M 76 30 Q 90 60 86 96" stroke="${stroke}" stroke-width="0.8" opacity="0.4" fill="none"/>`;
    default:
      return '';
  }
}

/**
 * 生成商品款式图 SVG 字符串
 * @param {object} item 数据库条目
 * @returns {string} 可直接插入 innerHTML 的 <svg>
 */
export function garmentArt(item) {
  const hex = item.colors?.[0]?.hex ?? 0x888888;
  const fill = '#' + (hex >>> 0).toString(16).padStart(6, '0');
  const light = shade(hex, 1.16);
  const dark = shade(hex, 0.62);
  const d = design(item);
  const body = silhouette(d.pts);
  const sleevePart = d.sleeve ? sleeves(d.pts[0][0] + 2, d.pts[0][1], d.sleeve, fill) : '';
  const strapPart = d.strap ? straps(d.pts[0][0], d.pts[0][1], fill) : '';

  return `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.name}">
    <defs>
      <linearGradient id="bg-${item.id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f2ece1"/><stop offset="1" stop-color="#d9d0c1"/>
      </linearGradient>
      <linearGradient id="cl-${item.id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${dark}"/><stop offset="0.32" stop-color="${light}"/>
        <stop offset="0.7" stop-color="${fill}"/><stop offset="1" stop-color="${dark}"/>
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="118" height="138" rx="8" fill="url(#bg-${item.id})" stroke="#b8ad99" stroke-width="0.8"/>
    <ellipse cx="60" cy="130" rx="30" ry="3.5" fill="#000" opacity="0.14"/>
    ${strapPart}${sleevePart}
    <path d="${body}" fill="url(#cl-${item.id})" stroke="${dark}" stroke-width="0.8"/>
    ${detailSVG(d.detail, fill, dark)}
    <text x="8" y="16" fill="#6c6355" font-size="6" font-family="monospace" letter-spacing="0.7">${item.brand === 'BL' ? 'BALMAIN' : 'D&amp;G'}</text>
  </svg>`;
}
