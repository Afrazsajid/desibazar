
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import Productsview from "@/components/sections/Productsview";


export default async function Home() {
  const products = await getAllProducts()
  // const categories = await getAllCategories()

  return (
    <main>
      <Productsview products={products} />
     
    
    </main>
    
    
  );
}
