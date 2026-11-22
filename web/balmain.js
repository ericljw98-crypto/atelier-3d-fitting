/* ============================================================
   BALMAIN 女装参数数据库
   ------------------------------------------------------------
   与杜嘉班纳库采用同一尺码体系与字段口径：
   - measurements 为成衣平铺尺寸（cm），基准 IT 40
   - ease 为设计放松量（成衣 − 人体净体），cm
   - silhouette 决定 3D 版型构建方式
   款号为演示编码，非官方商品编号。
   ============================================================ */

/** 由主数据库的调色板与尺码表构造，避免循环依赖 */
export function buildBalmainDB(C, ALL) {
  return [
    /* ================= 连衣裙 Dresses ================= */
    {
      id: 'bl-dr-001', code: 'BL-SS25-DR-001', name: '金扣针织连衣裙', nameEn: 'Gold-Button Knit Dress',
      category: 'dresses', silhouette: 'knit', fit: '修身', season: 'SS 2025', collection: 'Signature',
      fabric: '弹力针织', colors: [C.black, C.navy, C.ivory, C.wine], sizes: ALL,
      measurements: { bust: 86, waist: 68, hip: 92, shoulder: 40, sleeve: 60, length: 102 },
      ease: { bust: -4, waist: -2, hip: -4 },
    },
    {
      id: 'bl-dr-002', code: 'BL-FW25-DR-002', name: '结构肩西装连衣裙', nameEn: 'Structured Shoulder Blazer Dress',
      category: 'dresses', silhouette: 'fitted', fit: '修身', season: 'FW 2025', collection: 'Tailoring',
      fabric: '精纺羊毛', colors: [C.black, C.ivory, C.navy, C.red], sizes: ALL,
      measurements: { bust: 90, waist: 70, hip: 96, shoulder: 44, sleeve: 60, length: 92 },
      ease: { bust: 0, waist: 0, hip: 0 },
    },
    {
      id: 'bl-dr-003', code: 'BL-FW25-DR-003', name: '皮革裹身连衣裙', nameEn: 'Leather Wrap Dress',
      category: 'dresses', silhouette: 'wrap', fit: '修身', season: 'FW 2025', collection: 'Rock Chic',
      fabric: '软羊皮', colors: [C.black, C.chocolate, C.wine], sizes: ALL,
      measurements: { bust: 88, waist: 70, hip: 96, shoulder: 40, sleeve: 58, length: 100 },
      ease: { bust: -2, waist: 0, hip: 0 },
    },
    {
      id: 'bl-dr-004', code: 'BL-FW25-DR-004', name: '格纹羊毛 A 字裙', nameEn: 'Checked Wool A-Line Dress',
      category: 'dresses', silhouette: 'aline', fit: '合体', season: 'FW 2025', collection: 'Heritage',
      fabric: '格纹羊毛', colors: [C.camel, C.black, C.olive, C.wine], sizes: ALL,
      measurements: { bust: 92, waist: 74, hip: 100, shoulder: 41, sleeve: 0, length: 98 },
      ease: { bust: 2, waist: 4, hip: 4 },
    },
    {
      id: 'bl-dr-005', code: 'BL-FW25-DR-005', name: '流苏晚礼服', nameEn: 'Fringe Evening Gown',
      category: 'dresses', silhouette: 'flared', fit: '宽松', season: 'FW 2025', collection: 'Couture',
      fabric: '丝绒 / 流苏', colors: [C.black, C.gold, C.emerald, C.wine], sizes: ALL,
      measurements: { bust: 90, waist: 70, hip: 98, shoulder: 40, sleeve: 0, length: 138 },
      ease: { bust: 0, waist: 0, hip: 2 },
    },
    {
      id: 'bl-dr-006', code: 'BL-SS25-DR-006', name: '军装风衬衫裙', nameEn: 'Military Shirt Dress',
      category: 'dresses', silhouette: 'blouse', fit: '合体', season: 'SS 2025', collection: 'Military',
      fabric: '棉质斜纹', colors: [C.olive, C.black, C.camel, C.navy], sizes: ALL,
      measurements: { bust: 94, waist: 76, hip: 102, shoulder: 43, sleeve: 59, length: 104 },
      ease: { bust: 4, waist: 6, hip: 6 },
    },
    {
      id: 'bl-dr-007', code: 'BL-SS25-DR-007', name: '缎面吊带长裙', nameEn: 'Satin Slip Gown',
      category: 'dresses', silhouette: 'slip', fit: '修身', season: 'SS 2025', collection: 'Signature',
      fabric: '重磅真丝缎', colors: [C.black, C.nude, C.red, C.emerald], sizes: ALL,
      measurements: { bust: 88, waist: 70, hip: 94, shoulder: 0, sleeve: 0, length: 128 },
      ease: { bust: -2, waist: 0, hip: -2 },
    },
    {
      id: 'bl-dr-008', code: 'BL-SS25-DR-008', name: '荷叶腰迷你裙', nameEn: 'Peplum Mini Dress',
      category: 'dresses', silhouette: 'peplum', fit: '合体', season: 'SS 2025', collection: 'Signature',
      fabric: '羊毛混纺', colors: [C.black, C.ivory, C.red, C.navy], sizes: ALL,
      measurements: { bust: 90, waist: 72, hip: 98, shoulder: 44, sleeve: 22, length: 90 },
      ease: { bust: 0, waist: 2, hip: 2 },
    },
    {
      id: 'bl-dr-009', code: 'BL-FW25-DR-009', name: '直筒针织长裙', nameEn: 'Column Knit Dress',
      category: 'dresses', silhouette: 'straight', fit: '修身', season: 'FW 2025', collection: 'Knitwear',
      fabric: '罗纹羊绒', colors: [C.black, C.camel, C.chocolate, C.olive], sizes: ALL,
      measurements: { bust: 86, waist: 70, hip: 92, shoulder: 39, sleeve: 0, length: 118 },
      ease: { bust: -4, waist: 0, hip: -4 },
    },
    {
      id: 'bl-dr-010', code: 'BL-FW25-DR-010', name: '斗篷式礼服裙', nameEn: 'Cape Column Gown',
      category: 'dresses', silhouette: 'cape', fit: '宽松', season: 'FW 2025', collection: 'Couture',
      fabric: '羊毛绒 / 真丝', colors: [C.black, C.red, C.gold, C.navy], sizes: ALL,
      measurements: { bust: 92, waist: 72, hip: 98, shoulder: 44, sleeve: 0, length: 124 },
      ease: { bust: 2, waist: 2, hip: 2 },
    },
    {
      id: 'bl-dr-011', code: 'BL-SS25-DR-011', name: '波点雪纺长裙', nameEn: 'Polka Dot Chiffon Maxi',
      category: 'dresses', silhouette: 'flared', fit: '宽松', season: 'SS 2025', collection: 'Retro',
      fabric: '真丝雪纺', colors: [C.ivory, C.black, C.red, C.sky], sizes: ALL,
      measurements: { bust: 94, waist: 76, hip: 104, shoulder: 40, sleeve: 20, length: 132 },
      ease: { bust: 4, waist: 6, hip: 8 },
    },
    {
      id: 'bl-dr-012', code: 'BL-FW25-DR-012', name: '丝绒紧身长裙', nameEn: 'Velvet Bodycon Gown',
      category: 'dresses', silhouette: 'fitted', fit: '修身', season: 'FW 2025', collection: 'Rock Chic',
      fabric: '弹力丝绒', colors: [C.wine, C.black, C.emerald, C.navy], sizes: ALL,
      measurements: { bust: 86, waist: 66, hip: 92, shoulder: 39, sleeve: 58, length: 130 },
      ease: { bust: -4, waist: -4, hip: -4 },
    },

    /* ================= 上装 Tops ================= */
    {
      id: 'bl-tp-001', code: 'BL-SS25-TP-001', name: '金扣双排扣上衣', nameEn: 'Gold-Button Double-Breasted Top',
      category: 'tops', silhouette: 'blouse', fit: '合体', season: 'SS 2025', collection: 'Signature',
      fabric: '棉质混纺', colors: [C.black, C.ivory, C.navy, C.red], sizes: ALL,
      measurements: { bust: 94, waist: 88, shoulder: 44, sleeve: 60, length: 64 },
      ease: { bust: 4, waist: 2 },
    },
    {
      id: 'bl-tp-002', code: 'BL-FW25-TP-002', name: '结构肩针织衫', nameEn: 'Structured Shoulder Knit',
      category: 'tops', silhouette: 'knit', fit: '修身', season: 'FW 2025', collection: 'Knitwear',
      fabric: '羊毛针织', colors: [C.black, C.ivory, C.camel, C.wine], sizes: ALL,
      measurements: { bust: 88, waist: 82, shoulder: 44, sleeve: 61, length: 60 },
      ease: { bust: -2, waist: 0 },
    },
    {
      id: 'bl-tp-003', code: 'BL-FW25-TP-003', name: '皮革短上衣', nameEn: 'Cropped Leather Top',
      category: 'tops', silhouette: 'fitted', fit: '修身', season: 'FW 2025', collection: 'Rock Chic',
      fabric: '小牛皮', colors: [C.black, C.chocolate, C.red], sizes: ALL,
      measurements: { bust: 86, waist: 78, shoulder: 40, sleeve: 58, length: 44 },
      ease: { bust: -4, waist: -4 },
    },
    {
      id: 'bl-tp-004', code: 'BL-SS25-TP-004', name: '条纹海军衫', nameEn: 'Breton Stripe Top',
      category: 'tops', silhouette: 'blouse', fit: '合体', season: 'SS 2025', collection: 'Retro',
      fabric: '棉质针织', colors: [C.ivory, C.navy, C.red], sizes: ALL,
      measurements: { bust: 92, waist: 88, shoulder: 41, sleeve: 22, length: 62 },
      ease: { bust: 2, waist: 2 },
    },
    {
      id: 'bl-tp-005', code: 'BL-FW25-TP-005', name: '廓形羊毛衫', nameEn: 'Oversize Wool Sweater',
      category: 'tops', silhouette: 'oversize', fit: '宽松', season: 'FW 2025', collection: 'Knitwear',
      fabric: '粗纺羊毛', colors: [C.camel, C.black, C.chocolate, C.olive], sizes: ALL,
      measurements: { bust: 112, waist: 108, shoulder: 48, sleeve: 61, length: 72 },
      ease: { bust: 22, waist: 20 },
    },
    {
      id: 'bl-tp-006', code: 'BL-SS25-TP-006', name: '蕾丝吊带上衣', nameEn: 'Lace Camisole',
      category: 'tops', silhouette: 'slip', fit: '修身', season: 'SS 2025', collection: 'Signature',
      fabric: '弹力蕾丝', colors: [C.black, C.ivory, C.powder, C.red], sizes: ALL,
      measurements: { bust: 86, waist: 76, shoulder: 0, sleeve: 0, length: 48 },
      ease: { bust: -4, waist: -2 },
    },
    {
      id: 'bl-tp-007', code: 'BL-SS25-TP-007', name: '荷叶边衬衫', nameEn: 'Ruffle Blouse',
      category: 'tops', silhouette: 'blouse', fit: '宽松', season: 'SS 2025', collection: 'Romantic',
      fabric: '真丝雪纺', colors: [C.ivory, C.black, C.powder, C.navy], sizes: ALL,
      measurements: { bust: 100, waist: 98, shoulder: 43, sleeve: 57, length: 66 },
      ease: { bust: 10, waist: 10 },
    },
    {
      id: 'bl-tp-008', code: 'BL-FW25-TP-008', name: '罗纹修身背心', nameEn: 'Ribbed Fitted Vest',
      category: 'tops', silhouette: 'fitted', fit: '修身', season: 'FW 2025', collection: 'Knitwear',
      fabric: '罗纹弹力针织', colors: [C.black, C.ivory, C.olive, C.wine], sizes: ALL,
      measurements: { bust: 82, waist: 76, shoulder: 0, sleeve: 0, length: 58 },
      ease: { bust: -8, waist: -4 },
    },
    {
      id: 'bl-tp-009', code: 'BL-FW25-TP-009', name: '军装金扣上衣', nameEn: 'Military Gold-Button Top',
      category: 'tops', silhouette: 'blouse', fit: '合体', season: 'FW 2025', collection: 'Military',
      fabric: '羊毛混纺', colors: [C.olive, C.black, C.navy, C.camel], sizes: ALL,
      measurements: { bust: 96, waist: 90, shoulder: 45, sleeve: 60, length: 66 },
      ease: { bust: 6, waist: 4 },
    },
    {
      id: 'bl-tp-010', code: 'BL-SS25-TP-010', name: '镂空针织上衣', nameEn: 'Crochet Knit Top',
      category: 'tops', silhouette: 'knit', fit: '修身', season: 'SS 2025', collection: 'Knitwear',
      fabric: '棉线钩织', colors: [C.ivory, C.nude, C.sky, C.powder], sizes: ALL,
      measurements: { bust: 88, waist: 82, shoulder: 39, sleeve: 24, length: 56 },
      ease: { bust: -2, waist: 0 },
    },

    /* ================= 下装 Bottoms ================= */
    {
      id: 'bl-bt-001', code: 'BL-FW25-BT-001', name: '高腰紧身皮裤', nameEn: 'High-Rise Leather Leggings',
      category: 'bottoms', silhouette: 'skinny', fit: '修身', season: 'FW 2025', collection: 'Rock Chic',
      fabric: '弹力皮革', colors: [C.black, C.chocolate, C.wine], sizes: ALL,
      measurements: { waist: 68, hip: 92, length: 102, opening: 26 },
      ease: { waist: -2, hip: -4 },
    },
    {
      id: 'bl-bt-002', code: 'BL-SS25-BT-002', name: '阔腿西装裤', nameEn: 'Tailored Wide-Leg Trousers',
      category: 'bottoms', silhouette: 'wide', fit: '宽松', season: 'SS 2025', collection: 'Tailoring',
      fabric: '精纺羊毛', colors: [C.black, C.camel, C.navy, C.ivory], sizes: ALL,
      measurements: { waist: 74, hip: 100, length: 110, opening: 58 },
      ease: { waist: 4, hip: 4 },
    },
    {
      id: 'bl-bt-003', code: 'BL-SS25-BT-003', name: '直筒牛仔裤', nameEn: 'Straight Jeans',
      category: 'bottoms', silhouette: 'straight', fit: '合体', season: 'SS 2025', collection: 'Denim',
      fabric: '弹力丹宁', colors: [C.navy, C.black, C.sky, C.ivory], sizes: ALL,
      measurements: { waist: 72, hip: 96, length: 106, opening: 40 },
      ease: { waist: 2, hip: 0 },
    },
    {
      id: 'bl-bt-004', code: 'BL-FW25-BT-004', name: 'A 字皮革短裙', nameEn: 'Leather A-Line Mini',
      category: 'bottoms', silhouette: 'aline', fit: '合体', season: 'FW 2025', collection: 'Rock Chic',
      fabric: '软羊皮', colors: [C.black, C.chocolate, C.red], sizes: ALL,
      measurements: { waist: 72, hip: 96, length: 42, opening: 108 },
      ease: { waist: 2, hip: 0 },
    },
    {
      id: 'bl-bt-005', code: 'BL-FW25-BT-005', name: '羊毛铅笔裙', nameEn: 'Wool Pencil Skirt',
      category: 'bottoms', silhouette: 'pencil', fit: '修身', season: 'FW 2025', collection: 'Tailoring',
      fabric: '精纺羊毛', colors: [C.black, C.wine, C.navy, C.leopard], sizes: ALL,
      measurements: { waist: 70, hip: 94, length: 66, opening: 92 },
      ease: { waist: 0, hip: -2 },
    },
    {
      id: 'bl-bt-006', code: 'BL-SS25-BT-006', name: '百褶中长裙', nameEn: 'Pleated Midi Skirt',
      category: 'bottoms', silhouette: 'flared', fit: '宽松', season: 'SS 2025', collection: 'Retro',
      fabric: '压褶雪纺', colors: [C.ivory, C.black, C.navy, C.gold], sizes: ALL,
      measurements: { waist: 72, hip: 98, length: 78, opening: 158 },
      ease: { waist: 2, hip: 2 },
    },
    {
      id: 'bl-bt-007', code: 'BL-SS25-BT-007', name: '高腰短裤', nameEn: 'High-Rise Shorts',
      category: 'bottoms', silhouette: 'mini', fit: '合体', season: 'SS 2025', collection: 'Casual',
      fabric: '棉质斜纹', colors: [C.ivory, C.black, C.camel, C.sky], sizes: ALL,
      measurements: { waist: 72, hip: 96, length: 40, opening: 54 },
      ease: { waist: 2, hip: 0 },
    },
    {
      id: 'bl-bt-008', code: 'BL-FW25-BT-008', name: '格纹锥形裤', nameEn: 'Checked Tapered Trousers',
      category: 'bottoms', silhouette: 'straight', fit: '合体', season: 'FW 2025', collection: 'Heritage',
      fabric: '格纹羊毛', colors: [C.camel, C.black, C.olive, C.wine], sizes: ALL,
      measurements: { waist: 74, hip: 98, length: 102, opening: 36 },
      ease: { waist: 4, hip: 2 },
    },
    {
      id: 'bl-bt-009', code: 'BL-FW25-BT-009', name: '流苏迷你裙', nameEn: 'Fringe Mini Skirt',
      category: 'bottoms', silhouette: 'aline', fit: '合体', season: 'FW 2025', collection: 'Couture',
      fabric: '皮革 / 流苏', colors: [C.black, C.gold, C.red], sizes: ALL,
      measurements: { waist: 72, hip: 96, length: 40, opening: 110 },
      ease: { waist: 2, hip: 0 },
    },

    /* ================= 外套 Outerwear ================= */
    {
      id: 'bl-ot-001', code: 'BL-FW25-OT-001', name: '双排扣西装外套', nameEn: 'Double-Breasted Blazer',
      category: 'outer', silhouette: 'blazer', fit: '合体', season: 'FW 2025', collection: 'Tailoring',
      fabric: '精纺羊毛', colors: [C.black, C.ivory, C.navy, C.camel], sizes: ALL,
      measurements: { bust: 98, waist: 90, shoulder: 46, sleeve: 61, length: 72 },
      ease: { bust: 8, waist: 8 },
    },
    {
      id: 'bl-ot-002', code: 'BL-FW25-OT-002', name: '军装风长风衣', nameEn: 'Military Trench Coat',
      category: 'outer', silhouette: 'trench', fit: '合体', season: 'FW 2025', collection: 'Military',
      fabric: '防雨棉华达呢', colors: [C.olive, C.black, C.camel, C.navy], sizes: ALL,
      measurements: { bust: 102, waist: 96, shoulder: 46, sleeve: 62, length: 116 },
      ease: { bust: 12, waist: 10 },
    },
    {
      id: 'bl-ot-003', code: 'BL-FW25-OT-003', name: '皮革机车夹克', nameEn: 'Leather Biker Jacket',
      category: 'outer', silhouette: 'biker', fit: '修身', season: 'FW 2025', collection: 'Rock Chic',
      fabric: '小牛皮', colors: [C.black, C.chocolate, C.red], sizes: ALL,
      measurements: { bust: 92, waist: 84, shoulder: 43, sleeve: 60, length: 56 },
      ease: { bust: 2, waist: 2 },
    },
    {
      id: 'bl-ot-004', code: 'BL-FW25-OT-004', name: '廓形羊毛大衣', nameEn: 'Oversize Wool Coat',
      category: 'outer', silhouette: 'oversize', fit: '宽松', season: 'FW 2025', collection: 'Tailoring',
      fabric: '羊毛双面呢', colors: [C.camel, C.black, C.chocolate, C.olive], sizes: ALL,
      measurements: { bust: 116, waist: 112, shoulder: 50, sleeve: 62, length: 120 },
      ease: { bust: 26, waist: 24 },
    },
    {
      id: 'bl-ot-005', code: 'BL-SS25-OT-005', name: '短款针织开衫', nameEn: 'Cropped Knit Cardigan',
      category: 'outer', silhouette: 'knit', fit: '合体', season: 'SS 2025', collection: 'Knitwear',
      fabric: '棉线针织', colors: [C.ivory, C.black, C.powder, C.sky], sizes: ALL,
      measurements: { bust: 94, waist: 88, shoulder: 42, sleeve: 58, length: 50 },
      ease: { bust: 4, waist: 2 },
    },
    {
      id: 'bl-ot-006', code: 'BL-FW25-OT-006', name: '斗篷披肩', nameEn: 'Cape Coat',
      category: 'outer', silhouette: 'cape', fit: '宽松', season: 'FW 2025', collection: 'Couture',
      fabric: '羊毛绒', colors: [C.black, C.red, C.camel, C.gold], sizes: ALL,
      measurements: { bust: 112, waist: 108, shoulder: 46, sleeve: 0, length: 94 },
      ease: { bust: 20, waist: 20 },
    },
    {
      id: 'bl-ot-007', code: 'BL-FW25-OT-007', name: '金扣丝绒夹克', nameEn: 'Gold-Button Velvet Jacket',
      category: 'outer', silhouette: 'blazer', fit: '修身', season: 'FW 2025', collection: 'Signature',
      fabric: '印花丝绒', colors: [C.wine, C.black, C.emerald, C.navy], sizes: ALL,
      measurements: { bust: 92, waist: 84, shoulder: 45, sleeve: 60, length: 66 },
      ease: { bust: 2, waist: 2 },
    },
    {
      id: 'bl-ot-008', code: 'BL-FW25-OT-008', name: '格纹风衣', nameEn: 'Checked Trench Coat',
      category: 'outer', silhouette: 'trench', fit: '合体', season: 'FW 2025', collection: 'Heritage',
      fabric: '格纹羊毛', colors: [C.camel, C.black, C.olive, C.wine], sizes: ALL,
      measurements: { bust: 100, waist: 94, shoulder: 45, sleeve: 61, length: 110 },
      ease: { bust: 10, waist: 10 },
    },
    {
      id: 'bl-ot-009', code: 'BL-FW25-OT-009', name: '皮草感长外套', nameEn: 'Faux Fur Long Coat',
      category: 'outer', silhouette: 'oversize', fit: '宽松', season: 'FW 2025', collection: 'Couture',
      fabric: '环保皮草', colors: [C.leopard, C.chocolate, C.ivory, C.black], sizes: ALL,
      measurements: { bust: 118, waist: 114, shoulder: 50, sleeve: 61, length: 108 },
      ease: { bust: 28, waist: 26 },
    },
  ];
}
