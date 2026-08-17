import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { categories, products, settingsTable, productPhotos } from "./schema";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "./seed-data";
import { DEFAULT_SETTINGS, isSafeImageDataUrl, type Settings } from "./site";
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

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function seedIfEmpty() {
  const db = getDb();
  const existing = await db.select({ id: products.id }).from(products).limit(1).all();
  if (existing.length > 0) return;

  // D1 caps bound parameters at ~100 per query — batch inserts to stay well
  // under that (a single 17-row x 16-column insert hit "too many SQL
  // variables"). onConflictDoNothing makes this safely re-runnable if a
  // previous attempt partially seeded before failing.
  for (const rows of chunk(SEED_CATEGORIES, 10)) {
    await db
      .insert(categories)
      .values(rows.map((c) => ({ id: c.id, name: c.name, description: c.description, sort: c.sort, image: c.image })))
      .onConflictDoNothing()
      .run();
  }

  for (const rows of chunk(SEED_PRODUCTS, 5)) {
    await db
      .insert(products)
      .values(
        rows.map((p) => ({
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
      )
      .onConflictDoNothing()
      .run();
  }
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
  } catch (err) {
    // D1 unreachable (e.g. first local run before migrations) — never hard-fail the site.
    console.error("getCatalog() fell back to seed data:", err);
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
  } catch (err) {
    console.error("getSettings() fell back to defaults:", err);
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

// ---------- admin: products ----------

export async function getProductById(id: string): Promise<CatProduct | null> {
  const catalog = await getCatalog();
  return catalog.products.find((p) => p.id === id) ?? null;
}

export interface ProductPatch {
  name: string;
  description: string;
  categoryId: string;
  occasionIds: OccasionId[];
  price: number;
  priceUnit: string;
  minOrderQty: number;
  customizable: boolean;
  customizationNote: string | null;
  active: boolean;
  stock: number;
  featured: boolean;
}

export async function updateProduct(id: string, patch: ProductPatch): Promise<void> {
  const db = getDb();
  await db
    .update(products)
    .set({
      name: patch.name,
      description: patch.description,
      categoryId: patch.categoryId,
      occasionIds: JSON.stringify(patch.occasionIds),
      price: patch.price,
      priceUnit: patch.priceUnit,
      minOrderQty: patch.minOrderQty,
      customizable: patch.customizable ? 1 : 0,
      customizationNote: patch.customizationNote,
      active: patch.active ? 1 : 0,
      stock: patch.stock,
      featured: patch.featured ? 1 : 0,
    })
    .where(eq(products.id, id))
    .run();
}

/** Stores an owner-uploaded photo and appends its serving URL to the product's images array. */
export async function addProductPhoto(productId: string, dataUrl: string): Promise<void> {
  if (!isSafeImageDataUrl(dataUrl)) throw new Error("Not a valid image.");
  const db = getDb();
  const inserted = await db.insert(productPhotos).values({ productId, data: dataUrl, v: 1 }).returning({ id: productPhotos.id });
  const photoId = inserted[0].id;
  const url = `/api/product-photo/${photoId}`;

  const product = await getProductById(productId);
  if (!product) return;
  const images = [...product.images, url];
  await db.update(products).set({ images: JSON.stringify(images) }).where(eq(products.id, productId)).run();
}

export async function removeProductImage(productId: string, imageUrl: string): Promise<void> {
  const db = getDb();
  const product = await getProductById(productId);
  if (!product) return;
  const images = product.images.filter((i) => i !== imageUrl);
  await db.update(products).set({ images: JSON.stringify(images) }).where(eq(products.id, productId)).run();

  const match = imageUrl.match(/^\/api\/product-photo\/(\d+)$/);
  if (match) {
    await db.delete(productPhotos).where(eq(productPhotos.id, Number(match[1]))).run();
  }
}

export async function getProductPhotoData(id: number): Promise<string | null> {
  const db = getDb();
  const rows = await db.select().from(productPhotos).where(eq(productPhotos.id, id)).limit(1).all();
  return rows[0]?.data ?? null;
}

// ---------- admin: categories ----------

export interface CategoryPatch {
  name: string;
  description: string;
  image: string | null;
}

export async function updateCategory(id: string, patch: CategoryPatch): Promise<void> {
  const db = getDb();
  await db.update(categories).set(patch).where(eq(categories.id, id)).run();
}
