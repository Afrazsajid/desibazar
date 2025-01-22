"use client";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { PRODUCT_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

type Size = "S" | "M" | "L" | "XL" | "XXL";
type Color = "black" | "red" | "blue";

interface ProductFullCardProps {
  product: PRODUCT_QUERYResult | null;
}

const rating = 4.5; // Example rating
const reviewCount = 6;

const ProductFullCard: React.FC<ProductFullCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const sizes = product?.sizes?.length ? product.sizes : [];
  const colors: { name: Color; className: string }[] = [
    { name: "black", className: "bg-black" },
    { name: "red", className: "bg-red-500" },
    { name: "blue", className: "bg-secondary" },
  ];

  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      comment: "Great quality and fits perfectly! Highly recommend this t-shirt.",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Good material, but the color was slightly off from the pictures.",
    },
    {
      name: "Mark Taylor",
      rating: 3,
      comment: "It's okay, but I expected better stitching quality.",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={`mr-1 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
        />
      );
    }
    return stars;
  };

  if (!product) {
    return <div className="text-center text-gray-600 py-10">Product not found</div>;
  }

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex flex-col items-center bg-gray-100 py-8">
      {/* Product Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-screen-lg p-6 bg-white shadow-lg rounded-lg"
      >
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {/* Product Images */}
          <div className="w-full md:w-1/2">
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {product.prodimages && product.prodimages.length > 0 ? (
                    <Image
                      src={product.prodimages[selectedImageIndex] || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}
                      alt={product.title || "Product Image"}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="text-gray-500">No image available</div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex gap-2 mt-4">
              {product.prodimages?.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <div className="text-sm text-gray-500 mb-4">
              <Link href="/" className="text-blue-500 hover:underline">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/products" className="text-blue-500 hover:underline">
                Products
              </Link>{" "}
              / <span className="text-gray-700">{product.title || "Unnamed Product"}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{product.title || "Unnamed Product"}</h2>
            <div className="flex items-center text-yellow-400 space-x-1 mb-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <i key={index} className="bx bxs-star"></i>
                ))}
              <div className="flex items-center">
                <div className="flex items-center">{renderStars(rating)}</div>
                <span className="text-sm text-gray-600 ml-2">({reviewCount} Reviews)</span>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-gray-800">${product.price?.toFixed(2) || "N/A"}</span>
              {isOutOfStock && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="ml-4 px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full"
                >
                  Out of Stock
                </motion.span>
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-medium text-lg">Description</h3>
              <p className="text-sm text-gray-700 mt-2">
                {product.smalldescription || "No description available"}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-lg">Categories</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.categories?.map((category) => (
                  <motion.span
                    key={category._id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {category.title || "Uncategorized"}
                  </motion.span>
                ))}
              </div>
            </div>
            {/* Conditionally render the size section */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-lg">Size</h4>
                <div className="flex gap-2 mt-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-md font-bold text-sm ${
                        selectedSize === size
                          ? "bg-gray-800 text-white shadow-md"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-4">
              <h4 className="font-medium text-lg">Color</h4>
              <div className="flex gap-2 mt-2">
                {colors.map((color) => (
                  <motion.div
                    key={color.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-md cursor-pointer ${
                      color.className
                    } ${
                      selectedColor === color.name ? "shadow-lg ring-2 ring-gray-400" : ""
                    }`}
                    onClick={() => setSelectedColor(color.name)}
                  ></motion.div>
                ))}
              </div>
            </div>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 bg-webprimary text-white font-bold rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isOutOfStock}
              >
                <i className="bx bxs-zap"></i> Buy Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isOutOfStock}
              >
                <i className="bx bxs-cart"></i> Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!isOutOfStock}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="bx bxs-heart"></i> Wishlist
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductFullCard;