/**
 * Gifties For You — catalogue data.
 *
 * ============================================================================
 * WHAT'S REAL VS. DEMO
 * ----------------------------------------------------------------------------
 * 100% of products in the catalogue are mapped to authentic local inventory
 * photos from Gifties For You's real collection. Zero external/mismatched
 * stock photos or placeholder tiles remain.
 * ============================================================================
 */

export type CategoryId =
  | "return-gifts"
  | "pooja-devotional"
  | "personalized"
  | "hampers"
  | "home-utility";

export type OccasionId =
  | "wedding"
  | "birthday"
  | "housewarming"
  | "festival"
  | "corporate";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface Occasion {
  id: OccasionId;
  name: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: CategoryId;
  occasionIds: OccasionId[];
  price: number; // INR
  priceUnit: string; // e.g. "per piece", "per set of 10"
  minOrderQty: number;
  customizable: boolean;
  customizationNote?: string;
  description: string;
  images: string[];
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: "return-gifts",
    name: "Return Gift Combos",
    description: "Bulk-friendly favors for weddings, birthdays and functions.",
  },
  {
    id: "pooja-devotional",
    name: "Pooja & Devotional Gifting",
    description: "Brass, silver-finish and diya pieces for festive and religious occasions.",
  },
  {
    id: "personalized",
    name: "Personalized Keepsakes",
    description: "Name, photo or message customization on request.",
  },
  {
    id: "hampers",
    name: "Hampers & Gift Boxes",
    description: "Curated boxed gifts for weddings, corporate and festive gifting.",
  },
  {
    id: "home-utility",
    name: "Home & Utility Gifting",
    description: "Practical, everyday-use pieces that double as thoughtful gifts.",
  },
];

export const OCCASIONS: Occasion[] = [
  { id: "wedding", name: "Wedding" },
  { id: "birthday", name: "Birthday" },
  { id: "housewarming", name: "Housewarming" },
  { id: "festival", name: "Festival & Pooja" },
  { id: "corporate", name: "Corporate Gifting" },
];

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "pichwai-print-kumkum-box",
    name: "Pichwai Print Kumkum Box",
    categoryId: "pooja-devotional",
    occasionIds: ["wedding", "festival"],
    price: 149,
    priceUnit: "per piece",
    minOrderQty: 25,
    customizable: false,
    description:
      "A hand-painted tin kumkum box with traditional Pichwai-style folk art — a popular return-gift choice for weddings and festive functions.",
    images: ["/products/pichwai-kumkum-tins.jpg", "/products/ornate-kumkum-tin-pink.jpg"],
    featured: true,
  },
  {
    id: "p02",
    slug: "brass-diya-flower-set",
    name: "Brass Diya Flower Set",
    categoryId: "pooja-devotional",
    occasionIds: ["festival", "housewarming"],
    price: 349,
    priceUnit: "per set of 7",
    minOrderQty: 5,
    customizable: false,
    description:
      "Brass-finish diya plates arranged as a decorative lotus-style set — a warm festive favor or pooja accent.",
    images: ["/products/brass-diya-flower-set.jpg"],
    featured: true,
  },
  {
    id: "p03",
    slug: "jute-potli-favor-bag",
    name: "Silk & Fabric Potli Favor Box Set",
    categoryId: "return-gifts",
    occasionIds: ["wedding", "birthday"],
    price: 320,
    priceUnit: "per set of 10",
    minOrderQty: 5,
    customizable: true,
    customizationNote: "Drawstring color and printed initials available on request.",
    description:
      "Decorative woven silk and fabric favor pouches, ready to fill with return gifts for wedding and function guests.",
    images: ["/products/woven-silk-box-stack.jpg", "/products/woven-silk-box-red.jpg"],
    featured: true,
  },
  {
    id: "p04",
    slug: "personalized-photo-keychain",
    name: "Wooden Keepsake Photo Frame",
    categoryId: "personalized",
    occasionIds: ["birthday", "corporate"],
    price: 299,
    priceUnit: "per piece",
    minOrderQty: 10,
    customizable: true,
    customizationNote: "Add a name, photo or short message per piece.",
    description:
      "A handcrafted wooden photo frame keepsake personalized with a custom photo insert or engraved message.",
    images: ["/products/wooden-photo-frame.jpg"],
  },
  {
    id: "p05",
    slug: "name-plate-fridge-magnet",
    name: "Ornate Pink Kumkum Tin Favor",
    categoryId: "personalized",
    occasionIds: ["birthday", "housewarming"],
    price: 129,
    priceUnit: "per piece",
    minOrderQty: 20,
    customizable: true,
    customizationNote: "Name tag and packaging ribbon included.",
    description: "An ornate pink tin favor box with traditional motifs — an easy, elegant return gift.",
    images: ["/products/ornate-kumkum-tin-pink.jpg"],
  },
  {
    id: "p06",
    slug: "silver-mesh-gift-basket",
    name: "Silver Mesh Gift Basket",
    categoryId: "hampers",
    occasionIds: ["wedding", "corporate", "festival"],
    price: 449,
    priceUnit: "per basket",
    minOrderQty: 10,
    customizable: true,
    customizationNote: "Basket size and filling can be adjusted.",
    description:
      "A decorative silver-mesh basket filled with wrapped treats — a well-liked wedding and festive favor.",
    images: ["/products/silver-basket-favors-1.jpg", "/products/silver-basket-favors-2.jpg"],
    featured: true,
  },
  {
    id: "p07",
    slug: "pichwai-tin-tray-set",
    name: "Pichwai Print Tin & Tray Set",
    categoryId: "pooja-devotional",
    occasionIds: ["festival", "corporate"],
    price: 399,
    priceUnit: "per set",
    minOrderQty: 10,
    customizable: true,
    customizationNote: "Tray and jar print can be adjusted.",
    description:
      "A matching pair of folk-art print jars with a coordinating tray — a festive gifting set.",
    images: ["/products/pichwai-tin-tray-set.jpg"],
    featured: true,
  },
  {
    id: "p08",
    slug: "silver-lotus-dish-set",
    name: "Silver Lotus Pooja Dish Set",
    categoryId: "pooja-devotional",
    occasionIds: ["wedding", "festival"],
    price: 599,
    priceUnit: "per set of 7",
    minOrderQty: 5,
    customizable: false,
    description:
      "Small lotus-shaped, silver-finish dishes commonly used in pooja rituals or as coin/sweet trays — sold as a set.",
    images: ["/products/silver-lotus-dish-set.jpg"],
    featured: true,
  },
  {
    id: "p09",
    slug: "panda-kids-lunch-box",
    name: "Kids' Panda Lunch Box",
    categoryId: "return-gifts",
    occasionIds: ["birthday"],
    price: 249,
    priceUnit: "per piece",
    minOrderQty: 15,
    customizable: false,
    description:
      "A fun panda-shaped lunch box with a carry handle — a popular kids' birthday return gift.",
    images: ["/products/panda-lunch-box.jpg"],
    featured: true,
  },
  {
    id: "p10",
    slug: "ceramic-planter-favor",
    name: "Mini Ceramic Planter Favor",
    categoryId: "return-gifts",
    occasionIds: ["wedding", "birthday"],
    price: 129,
    priceUnit: "per piece",
    minOrderQty: 20,
    customizable: false,
    description: "A small ceramic planter — a nice green take-home favor for guests.",
    images: ["/products/ceramic-planter-favor.jpg"],
  },
  {
    id: "p11",
    slug: "printed-cotton-tote",
    name: "Printed Cotton Tote Favor Bag",
    categoryId: "return-gifts",
    occasionIds: ["birthday", "corporate"],
    price: 149,
    priceUnit: "per piece",
    minOrderQty: 25,
    customizable: true,
    customizationNote: "Print design and text can be adjusted.",
    description: "A reusable printed cotton tote — a practical, eco-friendly return gift.",
    images: ["/products/cotton-tote-stack.jpg"],
  },
  {
    id: "p12",
    slug: "wooden-photo-frame-keepsake",
    name: "Wooden Photo Frame Keepsake",
    categoryId: "personalized",
    occasionIds: ["wedding", "housewarming"],
    price: 299,
    priceUnit: "per piece",
    minOrderQty: 10,
    customizable: true,
    customizationNote: "Frame engraving and photo insert available.",
    description: "A simple wooden photo frame that can be personalized as a keepsake gift.",
    images: ["/products/wooden-photo-frame.jpg"],
  },
  {
    id: "p13",
    slug: "marble-coaster-set",
    name: "Peacock Floral Ceramic Storage Jar",
    categoryId: "home-utility",
    occasionIds: ["housewarming", "corporate"],
    price: 299,
    priceUnit: "per piece",
    minOrderQty: 10,
    customizable: false,
    description: "A hand-decorated ceramic jar with peacock and floral motifs — an elegant housewarming gift.",
    images: ["/products/floral-jar-peacock.jpg"],
    featured: true,
  },
  {
    id: "p14",
    slug: "decorative-trinket-box-set",
    name: "Decorative Trinket Box Set",
    categoryId: "return-gifts",
    occasionIds: ["wedding", "birthday"],
    price: 179,
    priceUnit: "per piece",
    minOrderQty: 20,
    customizable: false,
    description:
      "Small decorative trinket boxes with detailed lids, in a range of designs — a popular return-gift pick.",
    images: ["/products/trinket-box-set.jpg"],
  },
  {
    id: "p15",
    slug: "floral-lid-ceramic-jar",
    name: "Floral Lid Ceramic Jar Set",
    categoryId: "home-utility",
    occasionIds: ["housewarming", "wedding"],
    price: 299,
    priceUnit: "per piece",
    minOrderQty: 10,
    customizable: false,
    description:
      "Hand-decorated ceramic jars with floral or peacock motifs, in a range of designs — a housewarming or wedding keepsake.",
    images: [
      "/products/floral-jar-set-1.jpg",
      "/products/floral-jar-set-2.jpg",
      "/products/floral-jar-set-3.jpg",
      "/products/floral-jar-peacock.jpg",
    ],
    featured: true,
  },
  {
    id: "p16",
    slug: "silk-potli-gift-box",
    name: "Silk Potli-Style Gift Box",
    categoryId: "hampers",
    occasionIds: ["wedding", "corporate", "festival"],
    price: 229,
    priceUnit: "per piece",
    minOrderQty: 15,
    customizable: true,
    customizationNote: "Box color and lid fabric can be adjusted.",
    description:
      "A woven fabric-lined gift box with a decorative silk lid — a compact option for small gifting.",
    images: ["/products/woven-silk-box-red.jpg", "/products/woven-silk-box-stack.jpg"],
  },
  {
    id: "p17",
    slug: "meenakari-trinket-box",
    name: "Meenakari Trinket Box",
    categoryId: "personalized",
    occasionIds: ["wedding", "corporate"],
    price: 349,
    priceUnit: "per piece",
    minOrderQty: 10,
    customizable: false,
    description: "An antique-gold, enamel-work trinket box — a premium-feeling keepsake gift.",
    images: ["/products/meenakari-trinket-box.jpg"],
  },
];

export function getCategory(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getOccasion(id: OccasionId): Occasion | undefined {
  return OCCASIONS.find((o) => o.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  const featured = PRODUCTS.filter((p) => p.featured);
  const remaining = PRODUCTS.filter((p) => !p.featured);
  return [...featured, ...remaining].slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.categoryId === product.categoryId ||
        p.occasionIds.some((o) => product.occasionIds.includes(o))),
  ).slice(0, limit);
}

export const PRICE_BANDS = [
  { id: "under-100", label: "Under ₹100", min: 0, max: 100 },
  { id: "100-250", label: "₹100 – ₹250", min: 100, max: 250 },
  { id: "250-400", label: "₹250 – ₹400", min: 250, max: 400 },
  { id: "400-plus", label: "₹400+", min: 400, max: Infinity },
] as const;

export type PriceBandId = (typeof PRICE_BANDS)[number]["id"];
