import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import Productsview from "@/components/sections/Productsview";
import { getProductFromSlug } from "@/sanity/lib/productBySlug/getProductFromSlug";

import { editorclient } from "@/sanity/lib/editorclient";


import { v4 as uuidv4 } from 'uuid';

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // Fetch a product by slug for debugging purposes
  const checkproduct = await getProductFromSlug("bed");
  console.log("idbed:", checkproduct?._id);

  // Define a function to create an order
  const  handleCreateOrder = async () => {
    console.log("Making order request");
    try {
      const newOrder = {
        _type: "order",
        title: "jjrvfs43bjjsdy",
        stripecheckoutSessionId: "cs_test_session_id",
        stripeCustomerId: "cus_test_customer_id",
        userId: "user123",
        address: {
          street: "123 Main Street",
          city: "San Francisco",
          postalCode: "94105",
          country: "USA",
        },
        status: "pending", // Initial order status
        createdAt: new Date().toISOString(),
        productPurchase: {
          _type: "document",
          product: [
            {
              _type: "object",
              _key: uuidv4(),
              productbought: {
                _type: "reference",
                _ref: "3f3ec7a0-285a-4c5e-93ea-5dff1cf52dc4", // Replace with actual product ID
              },
              quantity: 2,
            },
            {
              _type: "object",
              _key: uuidv4(),
              productbought: {
             
                _type: "reference",
                _ref: "dd0dcee8-9fce-4eaa-8ad5-c69710c44303", // Replace with actual product ID
              },
              quantity: 1,
            },
          ],
        },
      };

      // Replace this with your API call logic
      const result = await editorclient.create(newOrder);
      console.log("Order created successfully:", newOrder);
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  // await handleCreateOrder()

  return (
    <main>
      <Productsview products={products} />
     
    </main>
  );
}
