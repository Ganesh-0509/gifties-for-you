import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at").notNull(),
  status: text("status").notNull().default("pending_payment"),

  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  deliveryMethod: text("delivery_method").notNull().default("delivery"),
  addressLine: text("address_line"),
  city: text("city"),
  area: text("area"),
  pincode: text("pincode"),

  itemsJson: text("items_json").notNull(),
  itemCount: integer("item_count").notNull(),
  subtotal: integer("subtotal").notNull(),
  discount: integer("discount").notNull().default(0),
  discountLabel: text("discount_label"),
  shippingFee: integer("shipping_fee").notNull().default(0),
  grandTotal: integer("grand_total").notNull(),

  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpaySignature: text("razorpay_signature"),
  paymentMethod: text("payment_method"),

  adminNote: text("admin_note"),
  source: text("source").notNull().default("website"),
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  sort: integer("sort").notNull().default(0),
  image: text("image"), // static URL path, e.g. /products/xyz.jpg
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").notNull(),
  occasionIds: text("occasion_ids").notNull().default("[]"),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  price: integer("price").notNull(),
  priceUnit: text("price_unit").notNull().default("per piece"),
  minOrderQty: integer("min_order_qty").notNull().default(1),
  customizable: integer("customizable").notNull().default(0),
  customizationNote: text("customization_note"),
  active: integer("active").notNull().default(1),
  stock: integer("stock").notNull().default(-1),
  sort: integer("sort").notNull().default(0),
  featured: integer("featured").notNull().default(0),
  images: text("images").notNull().default("[]"), // JSON array of URL strings
});

export const settingsTable = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const siteImages = sqliteTable("site_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupKey: text("group_key").notNull(),
  data: text("data").notNull(),
  v: integer("v").notNull().default(1),
  caption: text("caption"),
  sort: integer("sort").notNull().default(0),
});
