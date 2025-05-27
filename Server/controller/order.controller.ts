import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { order } from "../models/Order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionRequest = {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number
    }[],
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string
    },
    restaurantId: string
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await order.find({ user: req.id }).populate('user').populate('restaurant');
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
       
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createCheckoutSession = async (req: Request, res: Response): Promise<any> => {
  try {
   
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
  

    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus');
    if (!restaurant) {
      
      return res.status(404).json({
        success: false,
        message: "Restaurant not found."
      });
    }

    const menuItems = restaurant.menus;

    // Create line items for Stripe
    const lineItems = createLineItems(checkoutSessionRequest, menuItems);
   

    // Calculate total amount in paise (smallest currency unit)
    const totalAmount = lineItems.reduce(
      (acc, item) => acc + item.price_data.unit_amount * Number(item.quantity),
      0
    );

    // Minimum amount check (₹50 = 5000 paise)
    const MIN_AMOUNT = 5000;
    if (totalAmount < MIN_AMOUNT) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹50. Your order total is ₹${(totalAmount / 100).toFixed(2)}`
      });
    }

    // Create new order with totalAmount set
    const newOrder: any = new order({
      restaurant: restaurant._id,
      user: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "pending",
      totalAmount: totalAmount / 100, // convert back to rupees if your schema expects INR in rupees, else keep paise
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA']
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: newOrder._id.toString(),
        images: JSON.stringify(menuItems.map((item: any) => item.image))
      }
    });

    if (!session.url) {
  
      return res.status(400).json({ success: false, message: "Error while creating session" });
    }

    await newOrder.save();


    return res.status(200).json({ session });
  } catch (error) {
    
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const stripeWebhook = async (req: Request, res: Response):Promise<any> => {
    let event;

    try {
        const signature = req.headers["stripe-signature"];

        // Construct the payload string for verification
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

        // Generate test header string for event construction
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });

        // Construct the event using the payload string and header
        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error: any) {
      
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
        try {
            const session = event.data.object as Stripe.Checkout.Session;
            const Order = await order.findById(session.metadata?.orderId);

            if (!Order) {
                return res.status(404).json({ message: "Order not found" });
            }

            // Update the order with the amount and status
            const totalAmount = session.amount_total ? session.amount_total : 0;
            await order.findByIdAndUpdate(Order._id, {
                totalAmount: totalAmount,
                status: "confirmed"
            });

        } catch (error) {
           
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    // Send a 200 response to acknowledge receipt of the event
    res.status(200).send();
};



export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: any) => {
    // 1. create line items
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);
        if (!menuItem) throw new Error(`Menu item id not found`);

        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image],
                },
                unit_amount: menuItem.price * 100
            },
            quantity: cartItem.quantity,
        }
    })
    // 2. return lineItems
    return lineItems;
}