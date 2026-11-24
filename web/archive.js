/* ============================================================
   档案款（Archive）——品牌历史系列中已停产的版型
   ------------------------------------------------------------
   这些款式按品牌历年成衣的典型版型复原：束腰、垫肩、斜裁、
   大摆等，都是 1990s–2010s 出现、后来停止生产的廓形语言。
   款号为演示编码（AR-xxx），不指向任何在售商品；
   标注的年份为版型所属季别，价格为该版型的当年零售价区间。
   ============================================================ */

export function buildArchiveDB(C, ALL) {
  return [
    /* ================= 连衣裙 Dresses ================= */
    {
      id: 'ar-dr-001', code: 'AR-1998-DR-001', name: '束腰缎面长裙', nameEn: 'Boned satin gown',
      brand: 'AR', category: 'dresses', silhouette: 'fitted', fit: '修身',
      season: 'FW 1998', collection: 'Archive', fabric: '真丝缎',
      colors: [C.black], sizes: ALL,
      measurements: { bust: 84, waist: 64, hip: 92, shoulder: 38, sleeve: 0, length: 128 },
      ease: { bust: -2, waist: -4, hip: -2 },
      priceEUR: 3200, priceCNY: 25500, discontinued: true, archiveYear: '1998',
    },
    {
      id: 'ar-dr-002', code: 'AR-2001-DR-002', name: '斜裁吊带裙', nameEn: 'Bias-cut slip dress',
      brand: 'AR', category: 'dresses', silhouette: 'slip', fit: '吊带',
      season: 'SS 2001', collection: 'Archive', fabric: '醋酸缎',
      colors: [C.ivory], sizes: ALL,
      measurements: { bust: 88, waist: 70, hip: 94, shoulder: 38, sleeve: 0, length: 116 },
      ease: { bust: -1, waist: -1, hip: -1 },
      priceEUR: 1450, priceCNY: 11500, discontinued: true, archiveYear: '2001',
    },
    {
      id: 'ar-dr-003', code: 'AR-2004-DR-003', name: '大摆伞裙礼服', nameEn: 'Full-skirt gown',
      brand: 'AR', category: 'dresses', silhouette: 'flared', fit: '宽松',
      season: 'FW 2004', collection: 'Archive', fabric: '塔夫绸',
      colors: [C.wine], sizes: ALL,
      measurements: { bust: 90, waist: 72, hip: 104, shoulder: 39, sleeve: 20, length: 124 },
      ease: { bust: 2, waist: 0, hip: 6 },
      priceEUR: 4100, priceCNY: 32500, discontinued: true, archiveYear: '2004',
    },
    {
      id: 'ar-dr-004', code: 'AR-1996-DR-004', name: '垫肩直筒裙', nameEn: 'Shoulder-padded shift',
      brand: 'AR', category: 'dresses', silhouette: 'straight', fit: '直筒',
      season: 'FW 1996', collection: 'Archive', fabric: '羊毛华达呢',
      colors: [C.black], sizes: ALL,
      measurements: { bust: 96, waist: 88, hip: 100, shoulder: 44, sleeve: 58, length: 96 },
      ease: { bust: 6, waist: 4, hip: 4 },
      priceEUR: 2200, priceCNY: 17500, discontinued: true, archiveYear: '1996',
    },
    {
      id: 'ar-dr-005', code: 'AR-2009-DR-005', name: '荷叶腰针织裙', nameEn: 'Peplum knit dress',
      brand: 'AR', category: 'dresses', silhouette: 'peplum', fit: '合体',
      season: 'SS 2009', collection: 'Archive', fabric: '黏胶针织',
      colors: [C.wine], sizes: ALL,
      measurements: { bust: 86, waist: 66, hip: 94, shoulder: 38, sleeve: 30, length: 96 },
      ease: { bust: -2, waist: -2, hip: 0 },
      priceEUR: 1650, priceCNY: 13000, discontinued: true, archiveYear: '2009',
    },

    /* ================= 上装 Tops ================= */
    {
      id: 'ar-tp-001', code: 'AR-1992-TP-001', name: '宽肩缎面衬衫', nameEn: 'Strong-shoulder satin shirt',
      brand: 'AR', category: 'tops', silhouette: 'blouse', fit: '宽松',
      season: 'SS 1992', collection: 'Archive', fabric: '真丝素缎',
      colors: [C.ivory], sizes: ALL,
      measurements: { bust: 104, waist: 96, shoulder: 46, sleeve: 62, length: 70 },
      ease: { bust: 12, waist: 8 },
      priceEUR: 980, priceCNY: 7800, discontinued: true, archiveYear: '1992',
    },
    {
      id: 'ar-tp-002', code: 'AR-2003-TP-002', name: '短款提花夹克衫', nameEn: 'Cropped jacquard top',
      brand: 'AR', category: 'tops', silhouette: 'fitted', fit: '修身',
      season: 'FW 2003', collection: 'Archive', fabric: '提花棉',
      colors: [C.gold], sizes: ALL,
      measurements: { bust: 88, waist: 70, shoulder: 38, sleeve: 58, length: 48 },
      ease: { bust: 0, waist: -2 },
      priceEUR: 1350, priceCNY: 10700, discontinued: true, archiveYear: '2003',
    },
    {
      id: 'ar-tp-003', code: 'AR-2011-TP-003', name: '丝质吊带上衣', nameEn: 'Silk camisole top',
      brand: 'AR', category: 'tops', silhouette: 'slip', fit: '吊带',
      season: 'SS 2011', collection: 'Archive', fabric: '真丝雪纺',
      colors: [C.ivory], sizes: ALL,
      measurements: { bust: 92, waist: 80, shoulder: 38, sleeve: 0, length: 56 },
      ease: { bust: 2, waist: 2 },
      priceEUR: 640, priceCNY: 5000, discontinued: true, archiveYear: '2011',
    },
    {
      id: 'ar-tp-004', code: 'AR-1989-TP-004', name: '羊绒大廓形毛衣', nameEn: 'Oversized cashmere sweater',
      brand: 'AR', category: 'tops', silhouette: 'oversize', fit: '宽松',
      season: 'FW 1989', collection: 'Archive', fabric: '羊绒',
      colors: [C.ivory], sizes: ALL,
      measurements: { bust: 112, waist: 108, shoulder: 52, sleeve: 60, length: 72 },
      ease: { bust: 20, waist: 16 },
      priceEUR: 1180, priceCNY: 9400, discontinued: true, archiveYear: '1989',
    },

    /* ================= 下装 Bottoms ================= */
    {
      id: 'ar-bt-001', code: 'AR-1997-BT-001', name: '高腰铅笔裙', nameEn: 'High-waist pencil skirt',
      brand: 'AR', category: 'bottoms', silhouette: 'pencil', fit: '修身',
      season: 'FW 1997', collection: 'Archive', fabric: '羊毛混纺',
      colors: [C.black], sizes: ALL,
      measurements: { waist: 66, hip: 92, length: 66, opening: 82 },
      ease: { waist: -2, hip: -2 },
      priceEUR: 820, priceCNY: 6500, discontinued: true, archiveYear: '1997',
    },
    {
      id: 'ar-bt-002', code: 'AR-2006-BT-002', name: '阔腿长裤', nameEn: 'Wide-leg trousers',
      brand: 'AR', category: 'bottoms', silhouette: 'wide', fit: '宽松',
      season: 'SS 2006', collection: 'Archive', fabric: '亚麻混纺',
      colors: [C.ivory], sizes: ALL,
      measurements: { waist: 72, hip: 98, length: 108, opening: 96 },
      ease: { waist: 0, hip: 4 },
      priceEUR: 760, priceCNY: 6000, discontinued: true, archiveYear: '2006',
    },
    {
      id: 'ar-bt-003', code: 'AR-2013-BT-003', name: 'A 字羊毛短裙', nameEn: 'A-line wool skirt',
      brand: 'AR', category: 'bottoms', silhouette: 'aline', fit: '合体',
      season: 'FW 2013', collection: 'Archive', fabric: '精纺羊毛',
      colors: [C.black], sizes: ALL,
      measurements: { waist: 70, hip: 94, length: 52, opening: 104 },
      ease: { waist: 0, hip: 0 },
      priceEUR: 690, priceCNY: 5500, discontinued: true, archiveYear: '2013',
    },

    /* ================= 外套 Outerwear ================= */
    {
      id: 'ar-ot-001', code: 'AR-1995-OT-001', name: '双排扣宽肩西装', nameEn: 'Double-breasted blazer',
      brand: 'AR', category: 'outer', silhouette: 'blazer', fit: '合体',
      season: 'FW 1995', collection: 'Archive', fabric: '精纺羊毛',
      colors: [C.black], sizes: ALL,
      measurements: { bust: 100, waist: 88, shoulder: 46, sleeve: 62, length: 76 },
      ease: { bust: 8, waist: 6 },
      priceEUR: 2450, priceCNY: 19500, discontinued: true, archiveYear: '1995',
    },
    {
      id: 'ar-ot-002', code: 'AR-2008-OT-002', name: '束腰风衣', nameEn: 'Belted trench coat',
      brand: 'AR', category: 'outer', silhouette: 'trench', fit: '合体',
      season: 'SS 2008', collection: 'Archive', fabric: '防水棉华达呢',
      colors: [C.ivory], sizes: ALL,
      measurements: { bust: 102, waist: 92, shoulder: 42, sleeve: 60, length: 112 },
      ease: { bust: 10, waist: 8 },
      priceEUR: 2800, priceCNY: 22500, discontinued: true, archiveYear: '2008',
    },
  ];
}
