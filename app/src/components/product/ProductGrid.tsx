import type { Product } from "../../data/products";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "../ui/EmptyState";
import { motion, AnimatePresence } from "framer-motion";

export function ProductGrid({
  products,
  emptyTitle = "No products match these filters",
  emptyDescription = "Try a different category, occasion or price range — or just ask us directly.",
  emptyAction,
}: {
  products: Product[];
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
}) {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 items-stretch"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full flex flex-col"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
