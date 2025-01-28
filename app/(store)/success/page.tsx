


import { Button } from "@/components/ui/button"
import Link from "next/link"
import useBasketStore from "@/stores/store"

import React from 'react'
import { useSearchParams } from "next/navigation"


const page = async ({
    searchParams,
  }: {
    searchParams: { orderrNumber?: string };
  })=> {
    const orderNumber = searchParams?.orderrNumber || "h"; 



     

    
    
  



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                {/* Green Tick Icon with Round Border and Light Green Fill */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </div>
                </div>

                {/* Thank You Message */}
                <h1 className="text-2xl font-bold mt-6 text-gray-800">Thank You for Your Order!</h1>
                
                {/* Display Order Number */}
                {true && (
                    <p className="mt-2 text-sm text-green-500">Order Number: {orderNumber}</p>
                )}

                {/* Separator Line */}
                <hr className="my-4 border-t border-gray-200" />

                {/* Confirmation Email Message */}
                <p className="mt-2 text-gray-600">
                    A confirmatory email has been sent to your email address.
                </p>

                {/* Buttons */}
                <div className="mt-6 space-y-4">
                    <button
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        View My Order
                    </button>
                    <button
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page
