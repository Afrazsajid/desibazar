import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'; 

 



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
        email:orderData.address?.email || ""

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


       // Send the email to the customer
       const transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this to your email provider
        auth: {
          user: process.env.EMAIL_USER, // Your email address (e.g., your Gmail)
          pass: process.env.EMAIL_PASS, // Your email password or app password
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: orderData.address?.email, // Recipient's email from the order data
        subject: 'Order Confirmation - ' + fullOrder.title, // Email subject
        text: `
          Hello ${orderData.address?.email},
  
          Thank you for your order! We have received the following details:
  
          Order ID: ${fullOrder._id}
          Order Title: ${fullOrder.title}
          Status: ${fullOrder.status}
  
          Shipping Address:
          ${orderData.address?.street}, ${orderData.address?.city}, ${orderData.address?.postalCode}, ${orderData.address?.country}
  
          We will notify you once your order has been processed and shipped.
  
          Thank you for shopping with us!
  
          Best regards,
          Your Company Name
        `,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);

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