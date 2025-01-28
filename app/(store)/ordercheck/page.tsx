"use client"

import { editorclient } from '@/sanity/lib/editorclient';
import React from 'react';


const CreateOrderButton = () => {
  const handleCreateOrder = async () => {
    console.log("making order request")
    try {
      // Sample order data
      const newOrder = {
        _type: 'order', // This must match the schema type
        title: 'Order#14g2gds3fk4',
        stripecheckoutSessionId: 'cs_test_session_id',
        stripeCustomerId: 'cus_test_customer_id',
        userId: 'user123',
        address: {
          street: '123 Main Street',
          city: 'San Francisco',
          postalCode: '94105',
          country: 'USA',
        },
        status: 'pending', // Initial order status
        createdAt: new Date().toISOString(),
        productPurchase: {
          _type: 'document',
          product: [
            {
              _type: 'object',
              productbought: {
                _type: 'reference',
                _ref: '3f3ec7a0-285a-4c5e-93ea-5dff1cf52dc4', // Replace with actual product ID
              },
              quantity: 2,
            },
            {
              _type: 'object',
              productbought: {
                _type: 'reference',
                _ref: 'dd0dcee8-9fce-4eaa-8ad5-c69710c44303', // Replace with actual product ID
              },
              quantity: 1,
            },
          ],
        },
      };

      // Save the order to Sanity
      const result = await editorclient.create(newOrder);
      console.log('Order created:', result);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return <button onClick={handleCreateOrder}>Create Order</button>;
};

export default CreateOrderButton;
