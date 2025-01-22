import React from "react";
import { Product } from "@/sanity.types";
import ProductsGrid from "@/components/ProductsGrid";
import { getProductsSearch } from "@/sanity/lib/products/getProductsSearch";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams?.query || ""; // Ensure query is always a string
  let searchproducts: Product[] = [];

  try {
    // Fetch search results
    searchproducts = query ? await getProductsSearch(query) : [];
  } catch (error) {
    console.error("Error fetching search results:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          {query ? `Search Results` : `Welcome to the Search`}
        </h1>
        <p className="text-gray-600 text-lg mt-4">
          {query
            ? `Showing results for: `
            : `Enter a keyword to find what you're looking for.`}
          {query && (
            <span className="text-blue-600 font-semibold">
              "{query}"
            </span>
          )}
        </p>
      </div>
    
      {/* Animated Separator */}
      <div className="relative mx-auto my-6 h-1 max-w-2xl bg-blue-100 rounded-full">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    
      {/* Example Placeholder for Results Section */}
      <div className="max-w-7xl mx-auto">
        {query ? (
          <div className="text-center">
            {/* Check if products exist */}
            {searchproducts.length > 0 ? (
              <ProductsGrid products={searchproducts} />
            ) : (
              <p className="text-lg text-gray-700">
                No results found for "{query}". Please try a different search.
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              Please enter a search term to begin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
