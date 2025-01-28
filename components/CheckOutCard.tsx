
  import React from 'react'
  
  const CheckOutCard = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Checkout</h2>
        
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-800">$100.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold text-gray-800">$5.00</span>
          </div>
          <div className="flex justify-between mt-2 border-t pt-2">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-xl font-semibold text-gray-900">$105.00</span>
          </div>
        </div>
        
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Proceed to Checkout</button>
      </div>
    )
  }
  
  export default CheckOutCard
  