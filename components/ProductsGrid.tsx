"use client"
import React from "react";
import { Product } from "@/sanity.types";
import ProductCard from "./ui/productcard";
import { AnimatePresence, motion } from "framer-motion";  // Ensure motion is imported

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
      {products?.map((product) => {
        return (
          <AnimatePresence key={product._id}>
            <motion.div
              layout
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center w-full"
            >
              <ProductCard product={product} />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
