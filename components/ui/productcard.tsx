"use client";

import React from "react";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";

const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`product/${product.prodslug?.current}`}
      className={`shadow-md  card relative group flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300 box- ${
        isOutOfStock ? "opacity-75" : ""
      }`}
    >
      <div className="image-container relative aspect-square w-full h-full overflow-hidden">
        {product.prodimages && (
          <Image
            src={product.prodimages[0]}
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className={`img-fluid rounded thumbnail-image transition-all duration-500 ${
              isOutOfStock ? "blur-sm grayscale" : ""
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
          {product.title}
        </h2>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {product.smalldescription}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <span className="new-price text-red-500 text-lg font-bold">
              Rs {product.price?.toFixed(2)}
            </span>
            {product.price && (
              <small className="old-price line-through text-gray-400 ml-2">
                Rs {product.price.toFixed(2)}
              </small>
            )}
          </div>
          <Button className="buy text-purple-600 font-medium cursor-pointer">
            BUY 
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
