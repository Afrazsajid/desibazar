import { NextResponse } from 'next/server'; 


import createOrderInSanity from '@/lib/CreateOrderInSanity';
import { Order } from '@/sanity.types';

export async function POST(req: Request) {
  try {
    const orderData: Partial<Order> = await req.json(); // Parse the JSON request body
    console.log('Processing order...');

    // Basic validation
    if (!orderData.userId || !orderData.productPurchase?.product?.length) {
      return NextResponse.json({ message: 'Invalid order data' }, { status: 400 });
    }

    // Convert Partial<Order> to Order by ensuring all required fields are present
    const fullOrder: Order = {
      _id: orderData._id || '', // Generate or pass a placeholder if needed
      _type: 'order',
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      _rev: '',
      title: orderData.title || 'Untitled Order',
      stripecheckoutSessionId: orderData.stripecheckoutSessionId || '',
      stripeCustomerId: orderData.stripeCustomerId || '',
      userId: orderData.userId!,
      address: {
        street: orderData.address?.street || '',
        city: orderData.address?.city || '',
        postalCode: orderData.address?.postalCode || '',
        country: orderData.address?.country || '',
      },
      status: orderData.status || 'pending',
      createdAt: new Date().toISOString(),
      productPurchase: {
        product: orderData.productPurchase?.product?.map((item) => ({
          productbought: item.productbought,
          quantity: item.quantity || 0,
          _key: item._key,
        })) || [],
      },
    };

    // Call the createOrder function with the fullOrder object
    const result = await createOrderInSanity(fullOrder);

    return NextResponse.json({ message: 'Order created successfully', result });
  } catch (error) {
    console.error('Error creating order:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Failed to create order', error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to create order', error: 'Unknown error' },
      { status: 500 }
    );
  }
}