import { getProductFromSlug } from "@/sanity/lib/productBySlug/getProductFromSlug";
import ProductPage from "@/components/sections/ProductPage";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

// This is a server-side component and will fetch the product data at runtime
const ProductSlugPage = async ({ params }: ProductPageProps) => {
  const { slug } = params;

  // Fetch product details from the backend or CMS
  const product = await getProductFromSlug(slug);
  // console.log(product)

  // If no product is found, redirect to 404 page
  if (!product) {
    notFound();
  }

  // Pass the product data to the ProductPage component
  return <ProductPage product={product} />;
};

export default ProductSlugPage;
