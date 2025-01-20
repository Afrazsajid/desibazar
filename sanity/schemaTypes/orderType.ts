import { defineArrayMember, defineField, defineType } from 'sanity'
import { BasketIcon, TagIcon } from '@sanity/icons'

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon, // You can use a relevant icon here if needed
  fields: [
    defineField({
      name: 'title',
      title: 'Order Number',
      type: 'string',
      description: 'Unique identifier for the order',
    }),
    defineField({
      name: 'stripecheckoutSessionId',
      title: 'Stripe Checkout Session ID',
      type: 'string',
      description: 'Stripe Checkout session ID',
    }),
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      description: 'Stripe customer ID associated with the order',
    }),
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'ID of the user who placed the order',
    }),
    defineField({
      name: 'address',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Street',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
        defineField({
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
        ],
      },
      description: 'The current status of the order',
    }),
    defineField({
      name: 'createdAt',
      title: 'Order Date',
      type: 'datetime',
      description: 'Date when the order was placed',
    }),
    defineField({
    name: 'productPurchase',
    title: 'Product Purchase',
    type: 'document',
    fields: [
      defineField({
        name: 'product',
        title: 'Products',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              defineField({
                name: 'productbought',
                title: 'Product Bought',
                type: 'reference',
                to: [{ type: 'product' }],
              }),
              defineField({
                name: 'quantity',
                title: 'Quantity Purchased',
                type: 'number',
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      select: {
        products: 'products',
      },
      prepare(selection) {
        const { products } = selection;
        const product = products && products[0] ? products[0].product : null;
        const quantity = products && products[0] ? products[0].quantity : null;
        const title = product ? `${product.name} x ${quantity}` : 'No product';
        const subtitle = product ? `${product.price} ${product.currency} x ${quantity}` : 'No price';
        const media = product ? product.image : null;
  
        return {
          title,
          subtitle,
          media,
        };
      },
    }}),
  ],
})
