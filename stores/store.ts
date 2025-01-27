import { PRODUCT_QUERYResult } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  product: PRODUCT_QUERYResult;
  quantity: number;
}

// Define the BasketState interface
interface BasketState {
  items: BasketItem[]; // Array of items in the basket
  addItem: (product: PRODUCT_QUERYResult) => void; // Function to add a product to the basket
  removeItem: (productId: string) => void; // Function to remove a product by ID
  removeQuantity: (productId: string) => void; // Function to reduce quantity of a product
  clearBasket: () => void; // Function to clear all items from the basket
  getTotalPrice: () => number; // Function to calculate total price
  getItemCount: (productId: string) => number; // Function to get item count by ID
  getGroupedItems: () => BasketItem[]; // Function to return grouped items
}

// Zustand store with persist middleware
const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [], // Initial state of items

      // Add a product to the basket
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product?._id === product?._id
          );

          if (existingItem) {
            // If the product already exists, update the quantity
            return {
              items: state.items.map((item) =>
                item.product?._id === product?._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // Otherwise, add a new product to the basket
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),

      // Remove a product from the basket by its ID
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product?._id !== productId),
        })),

      // Reduce the quantity of a product in the basket by its ID
      removeQuantity: (productId) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product?._id === productId
          );

          if (existingItem && existingItem.quantity > 1) {
            // If the product exists and quantity is greater than 1, reduce it by 1
            return {
              items: state.items.map((item) =>
                item.product?._id === productId
                  ? { ...item, quantity: item.quantity - 1 } // Reduce the quantity by 1
                  : item
              ),
            };
          } else if (existingItem && existingItem.quantity === 1) {
            // If the quantity is 1, remove the product entirely from the basket
            return {
              items: state.items.filter((item) => item.product?._id !== productId),
            };
          }
          return state; // Return the current state if no matching item is found
        }),

      // Clear all items from the basket
      clearBasket: () => set({ items: [] }),

      // Calculate total price of items in the basket
      getTotalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          const price = item.product?.price ?? 0; // Use 0 if price is undefined
          return total + price * item.quantity;
        }, 0);
      },

      // Get item count by product ID
      getItemCount: (productId) => {
        const items = get().items;
        const item = items.find((item) => item.product?._id === productId);
        return item ? item.quantity : 0;
      },

      // Return grouped items in the basket
      getGroupedItems: () => {
        return get().items;
      },
    }),
    {
      name: "basket-storage", // Key for localStorage
    }
  )
);

export default useBasketStore;
