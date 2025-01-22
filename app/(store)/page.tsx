
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import Productsview from "@/components/sections/Productsview";
import { getProductFromSlug } from "@/sanity/lib/productBySlug/getProductFromSlug";
import { getProductsSearch } from "@/sanity/lib/products/getProductsSearch";
import FilterComponent from "@/components/ui/filter";


export default async function Home() {
  const products = await getAllProducts()
  // const products = await getProductsSearch("bags")
  const categories = await getAllCategories()

  const checkproduct = await getProductFromSlug("empiron-laptop-backpack-with-usb-connectivity-for-15-6-laptop-elb-02")
  console.log(checkproduct?.title)

  return (
    <main>
      <Productsview products={products}  />
     

     
    
    </main>
    
    
  );
}
