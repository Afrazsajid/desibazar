
import {  defineField, defineType } from 'sanity'


export const checktype = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  // You can use a relevant icon here if needed
  fields: [
    defineField({
      name: 'title',
      title: 'Order Number',
      type: 'string',
      description: 'Unique identifier for the order',
    }),
  
   
   
   
   
  ],
})
