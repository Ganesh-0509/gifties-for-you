-- Orders (cart checkout + Razorpay payment)
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_payment',

  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  delivery_method TEXT NOT NULL DEFAULT 'delivery',
  address_line TEXT,
  city TEXT,
  area TEXT,
  pincode TEXT,

  items_json TEXT NOT NULL,
  item_count INTEGER NOT NULL,
  subtotal INTEGER NOT NULL,
  discount INTEGER NOT NULL DEFAULT 0,
  discount_label TEXT,
  shipping_fee INTEGER NOT NULL DEFAULT 0,
  grand_total INTEGER NOT NULL,

  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  payment_method TEXT,

  admin_note TEXT,
  source TEXT NOT NULL DEFAULT 'website'
);
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX idx_orders_status ON orders (status);

-- Catalog
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  image TEXT
);

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  occasion_ids TEXT NOT NULL DEFAULT '[]',
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL,
  price_unit TEXT NOT NULL DEFAULT 'per piece',
  min_order_qty INTEGER NOT NULL DEFAULT 1,
  customizable INTEGER NOT NULL DEFAULT 0,
  customization_note TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  stock INTEGER NOT NULL DEFAULT -1,
  sort INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  images TEXT NOT NULL DEFAULT '[]'
);
CREATE INDEX idx_products_category ON products (category_id);
CREATE UNIQUE INDEX idx_products_slug ON products (slug);

-- Key/value settings store (site config JSON blob, admin auth record)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Owner-uploaded site photos (logo / about / banner groups)
CREATE TABLE site_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_key TEXT NOT NULL,
  data TEXT NOT NULL,
  v INTEGER NOT NULL DEFAULT 1,
  caption TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_site_images_group ON site_images (group_key, sort);
