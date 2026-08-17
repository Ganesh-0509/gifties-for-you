// Client-safe catalog types — no server/D1 imports here.

export type OccasionId = "wedding" | "birthday" | "housewarming" | "festival" | "corporate";

export interface Occasion {
  id: OccasionId;
  name: string;
}

// Fixed, small taxonomy — not owner-editable, unlike categories/products.
export const OCCASIONS: Occasion[] = [
  { id: "wedding", name: "Wedding" },
  { id: "birthday", name: "Birthday" },
  { id: "housewarming", name: "Housewarming" },
  { id: "festival", name: "Festival & Pooja" },
  { id: "corporate", name: "Corporate Gifting" },
];

export function getOccasion(id: OccasionId): Occasion | undefined {
  return OCCASIONS.find((o) => o.id === id);
}

export interface CatCategory {
  id: string;
  name: string;
  description: string;
  sort: number;
  image: string | null;
}

export interface CatProduct {
  id: string;
  categoryId: string;
  occasionIds: OccasionId[];
  slug: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  minOrderQty: number;
  customizable: boolean;
  customizationNote: string | null;
  active: boolean;
  stock: number; // -1 = unlimited, 0 = out of stock, >0 = units in stock
  sort: number;
  featured: boolean;
  images: string[];
}

export interface Catalog {
  categories: CatCategory[];
  products: CatProduct[];
}

export const SITE_IMAGE_GROUPS = ["logo", "about", "banner"] as const;
export type SiteImageGroup = (typeof SITE_IMAGE_GROUPS)[number];

export interface SiteImage {
  id: number;
  groupKey: SiteImageGroup;
  v: number;
  caption: string | null;
  sort: number;
}

export function siteImageUrl(id: number, v: number): string {
  return v === 0 ? "" : `/api/site-image/${id}?v=${v}`;
}

export function inStock(p: CatProduct): boolean {
  return p.stock === -1 || p.stock > 0;
}
