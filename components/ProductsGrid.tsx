"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/sanity.types";
import ProductCard from "./ui/productcard";
import { AnimatePresence, motion } from "framer-motion"; // Ensure motion is imported
import FilterComponent from "./ui/filter";

const ProductsGrid = ({ products }: { products: Product[] }) => {


  const handleApplyFilters = (filters: { category: string; price: number }) => {
    console.log('Applied Filters:', filters);
    // You can now use the filters to fetch data or update the UI
  };



  const [visibleProducts, setVisibleProducts] = useState<string[]>([]); // Keep track of visible products

  // Use IntersectionObserver to track when the product card is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const productId = entry.target.getAttribute("data-id");
          if (productId) {
            if (entry.isIntersecting) {
              setVisibleProducts((prev) => [...prev, productId]);
            } else {
              setVisibleProducts((prev) =>
                prev.filter((id) => id !== productId)
              );
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the product is in view
    );

    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="overflow-hidden"> {/* Ensure container can scroll */}
      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {products?.map((product, index) => (
            <motion.div
              key={product._id}
              data-id={product._id} // Store product ID for IntersectionObserver
              initial={{ opacity: 0, y: 20 }} // Start slightly below
              animate={{
                opacity: visibleProducts.includes(product._id) ? 1 : 0, // Fade in when visible
                y: visibleProducts.includes(product._id) ? 0 : 20, // Slide up when visible
              }} // Animate to normal position
              exit={{ opacity: 0, y: 20 }} // Smooth exit downward
              transition={{
                duration: 0.5, // Duration of the animation
                ease: "easeInOut", // Smooth transition
                delay: index * 0.1, // Delay based on index for staggered effect
              }}
              whileInView={{ opacity: 1, y: 0 }} // Make sure it's fully visible once in view
              viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% is in view
              className="flex justify-center w-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>


      {/* checking */}
    
      
    </div>

  );
};

export default ProductsGrid;
