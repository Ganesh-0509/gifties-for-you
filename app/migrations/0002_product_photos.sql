-- Owner-uploaded product photos. Seeded/static photos live as URL strings
-- directly in products.images; uploaded ones are stored here as data URLs
-- and served via /api/product-photo/<id>, then their URL is appended to
-- that same products.images JSON array.
CREATE TABLE product_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id TEXT NOT NULL,
  data TEXT NOT NULL,
  v INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX idx_product_photos_product ON product_photos (product_id);
