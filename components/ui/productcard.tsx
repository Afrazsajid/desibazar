"use client";

import React, { useState } from "react";
import { Product, PRODUCT_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import useBasketStore from "@/stores/store";

const ProductCard = ({ product }: { product: PRODUCT_QUERYResult }) => {
  const {addItem}=useBasketStore()
  const [isAdded, setIsAdded] = useState(false); // State to track if the product is added
  const isOutOfStock = product?.stock != null && product.stock <= 0;

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true); // Mark the item as added
  };

  return (
    <Link
      href={`product/${product?.prodslug?.current}`}
      className={` hover:shadow-xl hover:scale-105 w-64 h-96 shadow-md  card relative group flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300 box- ${
        isOutOfStock ? "opacity-75 " : ""
      }`}
    >
      <div className="image-container relative aspect-square w-full h-full overflow-hidden ">
        {product?.prodimages && (
          <Image
            src={product?.prodimages[0]}
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className={`img-fluid rounded thumbnail-image transition-all duration-500 ${
              isOutOfStock ? "blur-sm grayscale " : ""
            }`}
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="product-detail-container p-4 flex flex-col justify-between">
        <h2 className="dress-name text-base font-semibold truncate">
          {product?.title}
        </h2>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {product?.smalldescription}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <span className="new-price text-red-500 text-lg font-bold">
              Rs {product?.price?.toFixed(2)}
            </span>
            {product?.price && (
              <small className="old-price line-through text-gray-400 ml-2">
                Rs {((35/100*product?.price)+product.price).toFixed(2)}
              </small>
            )}
          </div>
              {/* Add to Cart Button */}
              <Button
              disabled={isOutOfStock}
            className={`${
              isAdded
                ? "bg-green-500 text-white"
                : "text-purple-600 hover:bg-purple-600 hover:text-white"
            } font-medium cursor-pointer py-2 px-4 rounded-md transition-all duration-300`}
            onClick={handleAddToCart}
          >
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
