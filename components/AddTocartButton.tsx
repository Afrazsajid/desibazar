"use client";
import React, { useEffect, useState } from "react";
import { PRODUCT_QUERYResult } from "@/sanity.types";
import useBasketStore from "@/stores/store"; // Adjust path as necessary

interface AddToBasketButtonProps {
  product: PRODUCT_QUERYResult;
  disabled: boolean;
}

const AddToCartButton = ({ product, disabled }: AddToBasketButtonProps) => {
  const { addItem, removeItem, getItemCount, removeQuantity } = useBasketStore();
  const [isClient, setIsClient] = useState(false);

  // Get the current quantity of the product in the baskett
  const itemCount = getItemCount(product._id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !product) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Conditional rendering based on item count */}
      {itemCount === 0 ? (
        // Show the "Add to Cart" button if count is 0
        <button
          onClick={() => addItem(product)}
          className="flex-1 px-4 py-3 bg-websecondary text-white font-bold rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Add to Cart
        </button>
      ) : (
        // Show the + and - buttons if count is greater than 0
        <>
          {/* Decrease button */}
          <button
            onClick={() => removeQuantity(product._id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              itemCount === 0 ? "bg-gray-100" : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={itemCount === 0 || disabled}
          >
            <span
              className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}
            >
              -
            </span>
          </button>

          {/* Display current quantity */}
          <span className="w-8 text-center font-semibold">{itemCount}</span>

          {/* Increase button */}
          <button
            onClick={() => addItem(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              disabled ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={disabled}
          >
            <span
              className={`text-xl font-bold ${disabled ? "text-gray-400" : "text-gray-600"}`}
            >
              +
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default AddToCartButton;
