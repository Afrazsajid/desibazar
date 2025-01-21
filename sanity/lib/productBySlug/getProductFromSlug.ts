import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductFromSlug = async (slug: string) => {
  const PRODUCT_QUERY = defineQuery(`
    *[_type == "product" && prodslug.current == $slug][0] {
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
    const product = await sanityFetch({
      query: PRODUCT_QUERY,
      params: { slug },
    });

    return product.data || null;
  } catch (error) {
    console.error("ERROR IN FETCHING PRODUCT", error);
    return null;
  }
};
