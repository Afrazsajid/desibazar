import {  Product } from '@/sanity.types';
import React from 'react'
import ProductsGrid from '../ProductsGrid';
import FilterComponent from '../ui/filter';
interface ProductsViewProps{
    products:Product[];
   
}
const Productsview = ({products, }:ProductsViewProps) => {
  return (
    <div>
         {/* category */}
        <div className='flex flex-col'>
            {/* <CategoryComponent catogories={categories}/> */}
           
           

        </div>


        {/* products */}
        <div className='flex-1'>

            <div>
               < ProductsGrid products={products}/>
               <hr className='w-1/2 sm:w3/4'/>
            </div>
        </div>
    </div>
     
  
  )
}

export default Productsview