import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Fetches products based on a search string.
 * @param searchParam - The search string to filter products by.
 * @returns A promise resolving to an array of products.
 */
export const getProductsSearch = async (searchParam: string) => {
  const SEARCH_PRODUCTS_QUERY = defineQuery(`
    *[_type == "product" && (
      !defined($search) || 
      title match $search || 
      categories[]->title match $search || 
      prodslug.current match $search
    )] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      prodslug,
      prodimages,
      categories[]->{
        _id,
        title
      },
      description,
      smalldescription,
      price,
      sizes,
      stock
    }
  `);

  try {
    // Execute the query with the search parameter
    const products = await sanityFetch({
      query: SEARCH_PRODUCTS_QUERY,
      params: {
        search: searchParam ? `*${searchParam}*` : undefined, // Wildcard search for flexibility
      },
    });

    // Return the fetched products or an empty array
    return products?.data || [];
  } catch (error) {
    console.error("Error in fetching products:", error);
    return [];
  }
};
