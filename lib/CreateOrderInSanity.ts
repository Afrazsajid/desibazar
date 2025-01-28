import { backendclient } from '@/sanity/lib/backenClient';

import { Order } from '@/sanity.types';
import { editorclient } from '@/sanity/lib/editorclient';

import { v4 as uuidv4 } from 'uuid';

const createOrderInSanity =async (ordeData: Order) => {
    console.log("Making order request");
    try {
      // const newOrder = {
      //   _type: "order",
      //   title: "amyorder123",
      //   stripecheckoutSessionId: "cs_test_session_id",
      //   stripeCustomerId: "cus_test_customer_id",
      //   userId: "user123",
      //   address: {
      //     street: "123 Main Street",
      //     city: "San Francisco",
      //     postalCode: "94105",
      //     country: "USA",
      //   },
      //   status: "pending", // Initial order status
      //   createdAt: new Date().toISOString(),
      //   productPurchase: {
      //     _type: "document",
      //     product: [
      //       {
      //         _type: "object",
      //         _key: uuidv4(),
      //         productbought: {
      //           _type: "reference",
      //           _ref: "3f3ec7a0-285a-4c5e-93ea-5dff1cf52dc4", // Replace with actual product ID
      //         },
      //         quantity: 2,
      //       },
      //       {
      //         _type: "object",
      //         _key: uuidv4(),
      //         productbought: {
             
      //           _type: "reference",
      //           _ref: "dd0dcee8-9fce-4eaa-8ad5-c69710c44303", // Replace with actual product ID
      //         },
      //         quantity: 1,
      //       },
      //     ],
      //   },
      // };
      const newOrder = ordeData

      // Replace this with your API call logic
      const result = await editorclient.create(newOrder);
      console.log("Order created successfully:........", newOrder);
    } catch (error) {
      console.log("Error creating order:", error);
    }
};

export default createOrderInSanity;