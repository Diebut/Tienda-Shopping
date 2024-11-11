const Stripe = require("stripe");
const { Order } = require("../models/orderModel");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        // Datos ficticios de ejemplo
        const cartItems = [
            {
                name: "Producto Ficticio 1",
                price: 1000, // Precio en centavos ($10.00)
                quantity: 2,
            },
            {
                name: "Producto Ficticio 2",
                price: 2000, // Precio en centavos ($20.00)
                quantity: 1,
            }
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cartItems.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};


/* const stripe = Stripe(process.env.STRIPE_KEY);
console.log("Stripe Key:", process.env.STRIPE_KEY);


// Controlador para crear la sesión de checkout
const createCheckoutSession = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        console.log("userId:", userId);
        console.log("cartItems:", cartItems);

        // Crear cliente en Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Sample Item",
                    },
                    unit_amount: 2000, // Precio en centavos, es decir, $20.00
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });
        

        res.send({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send("Internal Server Error...");
    }
}; */

// Controlador para manejar el webhook de Stripe
const handleWebhook = async (req, res) => {
    const webhookSecret = process.env.STRIPE_WEB_HOOK;
    let data;
    let eventType;

    if (!webhookSecret) {
        return res.status(400).send("Webhook secret not set");
    }

    const signature = req.headers["stripe-signature"];

    try {
        // Verificar el evento de webhook
        const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        data = event.data.object;
        eventType = event.type;
    } catch (error) {
        console.error("Webhook signature verification failed:", error.message);
        return res.status(400).send("Webhook signature verification failed");
    }

    // Si el evento es una sesión de checkout completada
    if (eventType === "checkout.session.completed") {
        try {
            const customer = await stripe.customers.retrieve(data.customer);
            await createOrder(customer, data);
        } catch (error) {
            console.error("Error processing completed session:", error.message);
            res.status(500).send("Error processing completed session");
            return;
        }
    }

    res.status(200).end();
};

// Función auxiliar para crear la orden en la base de datos
const createOrder = async (customer, data) => {
    const items = JSON.parse(customer.metadata.cart);
    const products = items.map((item) => ({
        productId: item.id,
        quantity: item.cartQuantity,
    }));

    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products,
        subtotal: data.amount_subtotal / 100, // Convertir de centavos a dólares
        total: data.amount_total / 100, // Convertir de centavos a dólares
        shipping: data.customer_details,
        payment_status: data.payment_status,
    });

    try {
        const savedOrder = await newOrder.save();
        console.log("Processed Order:", savedOrder);
    } catch (error) {
        console.error("Error saving order:", error);
    }
};

module.exports = { createCheckoutSession, handleWebhook };
