"use client";
import Image from "next/image";
import useBasketStore from "@/stores/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import CheckOutCard from "@/components/CheckOutCard";
import Link from "next/link";
import createOrderInSanity from "@/lib/CreateOrderInSanity";
import { Order } from "@/sanity.types";

export type Metadata={
  orderNumber:string;
  customerName:string;
  customerEmail:string;
  clerkUserId:string;
}

const Page = () => {
  const { addItem, removeItem, removeQuantity, getTotalPrice } =
    useBasketStore();
  const groupedItems = useBasketStore((state) => state.getGroupedItems());

  // Authentication check
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // State for client-side rendering
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckOut = async () => {
    if (!isSignedIn) return true; // Redirect or notify the user if not signed in
    setIsLoading(true); // Show a loading indicator during the process
  
    try {
      const orderData: Order = {
        _id: crypto.randomUUID(), // Generate a unique ID
        _type: "order", // Set the document type
        _createdAt: new Date().toISOString(), // Set the creation date
        _updatedAt: new Date().toISOString(), // Set the update date
        _rev: "", // Leave empty (Sanity will populate this)
        title: `ORDER-${crypto.randomUUID()}`, // Generate a unique order title
        stripecheckoutSessionId: "cs_test_123", // Replace with actual Stripe session ID
        stripeCustomerId: "cus_123", // Replace with actual Stripe customer ID
        userId: user!.id, // Clerk user ID or your user management system's ID
        address: {
          street: "123 Main St", // Replace with actual address
          city: "New York",
          postalCode: "10001",
          country: "USA",
        },
        status: "pending", // Initial status
        createdAt: new Date().toISOString(), // Order creation timestamp
        productPurchase: {
          product: groupedItems.map((item, index) => ({
            _key: `item-${index}-${crypto.randomUUID()}`, // Generate a unique key for each item
            productbought: { _ref: item.product._id, _type: "reference" }, // Reference to the product in Sanity
            quantity: item.quantity, // Quantity purchased
          })),
        },
      };
  
      const response = await fetch('/api/createorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      
  
      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Order created:', result);
  
      // Optionally, clear the cart after successful order creation
      useBasketStore.getState().clearBasket();
  
      // Redirect to a success page or order confirmation page
      router.push(`/success`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsLoading(false); // Hide the loading indicator
    }
  };
  // Avoid hydration error
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ensure the component doesn't render until client-side
  if (!isClient) {
    return null;
  }

  // Handle empty cart
  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <p className="text-gray-600 text-lg">Your Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col lg:flex-row">
        <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl sm:text-2xl font-bold">Shopping Cart</h4>
            <span className="text-sm text-gray-500">{groupedItems.length} items</span>
          </div>

          {/* Cart items */}
          <div className="space-y-6">
            {groupedItems.map((item, index) => {
              const productImage =
                item.product.prodimages && item.product.prodimages[0]
                  ? item.product.prodimages[0]
                  : "https://rakanonline.com/wp-content/uploads/2022/08/default-product-image.png";

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-center border-b py-4"
                >
                  {/* Product Image */}
                  <Link href={`product/${item.product.prodslug?.current}`}>
                    <div className="w-20 h-20">
                      <Image
                        src={productImage}
                        alt={item.product.title || "Product Image"}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 pl-4 sm:w-1/2">
                    <div className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-1">
                      {item.product.title}
                    </div>
                    {/* Price */}
                    <div className="text-sm sm:text-lg font-semibold text-gray-800 mt-2 sm:mt-0">
                      Rs{item.product.price}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeQuantity(item.product._id)}
                        className="text-white bg-gray-400 hover:bg-gray-600 px-3 py-1 rounded-md text-sm sm:text-xl"
                      >
                        -
                      </button>
                      <span className="text-sm sm:text-lg text-gray-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addItem(item.product)}
                        className="text-white bg-gray-400 hover:bg-gray-600 px-3 py-1 rounded-md text-sm sm:text-xl"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Item Button */}
                    <div className="text-red-500 text-lg cursor-pointer p-5">
                      <span onClick={() => removeItem(item.product._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 6h18M9 6v12M15 6v12M5 6l1 14h12l1-14H5z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back to Shop Button */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-500 hover:underline">
              ← Back to shop
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 h-fit bg-white p-6 border rounded-lg shadow-lg mt-6 lg:mt-0 lg:fixed lg:top-16 lg:right-4 lg:h-[calc(100vh-4rem)]">
          <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>

          {/* No items in cart */}
          <div className="mt-4">
            {groupedItems.length === 0 ? (
              <p className="text-lg text-gray-500">No items in your cart</p>
            ) : (
              <div>
                {/* Optional: Display item list here */}
              </div>
            )}
          </div>

          {/* Separator line */}
          <div className="my-4 border-t border-gray-200"></div>

          {/* Total Price */}
          <div className="mt-6">
            <p className="text-2xl font-bold text-gray-900">Rs {getTotalPrice()}</p>
          </div>

          {/* Checkout or Sign In */}
          <div className="mt-6">
            {isSignedIn ? (
              <button  onClick={()=>handleCheckOut()} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
               Checkout
              </button>
            ) : (
              <SignInButton>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Sign In to Check Out
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
