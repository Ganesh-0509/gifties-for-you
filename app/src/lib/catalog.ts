import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { categories, products, settingsTable } from "./schema";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "./seed-data";
import { DEFAULT_SETTINGS, type Settings } from "./site";
import type { CatCategory, CatProduct, Catalog, OccasionId } from "./catalog-types";

function toCatCategory(row: typeof categories.$inferSelect): CatCategory {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    sort: row.sort,
    image: row.image,
  };
}

function toCatProduct(row: typeof products.$inferSelect): CatProduct {
  let occasionIds: OccasionId[] = [];
  let images: string[] = [];
  try {
    occasionIds = JSON.parse(row.occasionIds);
  } catch {
    occasionIds = [];
  }
  try {
    images = JSON.parse(row.images);
  } catch {
    images = [];
  }
  return {
    id: row.id,
    categoryId: row.categoryId,
    occasionIds,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: row.price,
    priceUnit: row.priceUnit,
    minOrderQty: row.minOrderQty,
    customizable: row.customizable === 1,
    customizationNote: row.customizationNote,
    active: row.active === 1,
    stock: row.stock,
    sort: row.sort,
    featured: row.featured === 1,
    images,
  };
}

async function seedIfEmpty() {
  const db = getDb();
  const existing = await db.select({ id: products.id }).from(products).limit(1).all();
  if (existing.length > 0) return;

  await db.insert(categories).values(
    SEED_CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      sort: c.sort,
      image: c.image,
    })),
  ).run();

  await db.insert(products).values(
    SEED_PRODUCTS.map((p) => ({
      id: p.id,
      categoryId: p.categoryId,
      occasionIds: JSON.stringify(p.occasionIds),
      slug: p.slug,
      name: p.name,
      description: p.description,
      price: p.price,
      priceUnit: p.priceUnit,
      minOrderQty: p.minOrderQty,
      customizable: p.customizable ? 1 : 0,
      customizationNote: p.customizationNote,
      active: p.active ? 1 : 0,
      stock: p.stock,
      sort: p.sort,
      featured: p.featured ? 1 : 0,
      images: JSON.stringify(p.images),
    })),
  ).run();
}

export async function getCatalog(): Promise<Catalog> {
  try {
    await seedIfEmpty();
    const db = getDb();
    const [catRows, prodRows] = await Promise.all([
      db.select().from(categories).all(),
      db.select().from(products).all(),
    ]);
    return {
      categories: catRows.map(toCatCategory).sort((a, b) => a.sort - b.sort),
      products: prodRows.map(toCatProduct).sort((a, b) => a.sort - b.sort),
    };
  } catch {
    // D1 unreachable (e.g. first local run before migrations) — never hard-fail the site.
    return {
      categories: SEED_CATEGORIES,
      products: SEED_PRODUCTS,
    };
  }
}

export async function getProductBySlug(slug: string): Promise<CatProduct | null> {
  const catalog = await getCatalog();
  return catalog.products.find((p) => p.slug === slug) ?? null;
}

export async function getSettings(): Promise<Settings> {
  try {
    const db = getDb();
    const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "site")).limit(1).all();
    if (rows.length === 0) return DEFAULT_SETTINGS;
    const stored = JSON.parse(rows[0].value);
    return { ...DEFAULT_SETTINGS, ...stored };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const db = getDb();
  const current = await getSettings();
  const next = { ...current, ...patch };
  await db
    .insert(settingsTable)
    .values({ key: "site", value: JSON.stringify(next) })
    .onConflictDoUpdate({ target: settingsTable.key, set: { value: JSON.stringify(next) } })
    .run();
  return next;
}
