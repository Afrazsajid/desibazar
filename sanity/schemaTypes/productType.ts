import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";


export const prodcutType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon:TrolleyIcon,
    fields: [
      
        defineField({
            name: 'title',
            title: 'Product Name',
            type: 'string',
      
          
            validation:(Rule) => Rule.required(),
                
                
            }),
            defineField({
                name: 'prodslug',
                title: 'Slug',
                type:"slug",
                options:{
                    source:"title",
                    maxLength:96
                },
               
                validation:(Rule) => Rule.required(),
                
                
            }),
            defineField({
                name: 'prodimages',
                title: 'Product Images',
                type:"array",
                of: [{ type: 'string' }],
            
                validation:(Rule) => Rule.required(),
                
                
            }),

            defineField({
                name: 'categories',
                title: 'Categories',
                type: 'array',
                of: [{ type: 'reference',to:{type:"category"} }],
                description: 'List of product tags',
              }),

              defineField({
                name: 'description',
                title: 'Description',
                type: 'markdown',
               
                
              }),
              defineField({
                name: 'smalldescription',
                title: 'Small Description',
                type: 'string',
               
                
              }),

              defineField({
                name: 'price',
                title: 'Price',
                type:"number",
             
            
                validation:(Rule) => Rule.required(),
                
                
            }),
              defineField({
                name: 'stock',
                title: 'Stock',
                type:"number",
             
            
                validation:(Rule) => Rule.required(),
                
                
            }),

            
        
        
    ],
    preview: {
        select: {
            title: "title",
            price: "price"
        },
        prepare(select) {
            return {
                title: select.title, // Fix: Correct the typo here
                subtitle: `Rs${select.price}`
            }
        }
    }
})