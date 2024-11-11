const { Order, Product  } = require("../models/orderModel");

const createOrder = async (req, res) => {
    const { userId, cartItems } = req.body;

    if (!userId || !cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: "Missing userId or cartItems" });
    }

    // Calcular el total de la compra
    let total = 0;
    const orderProducts = [];

    for (const item of cartItems) {
        const product = await Product.findByPk(item.productId); // Obtén el producto desde la base de datos
        if (product) {
            total += product.price * item.quantity;
            orderProducts.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price
            });
        }
    }

    // Crear la orden en la base de datos
    try {
        const order = await Order.create({
            userId, 
            total,
            status: 'pending', // Estado inicial de la orden
        });

        // Guardar los productos de la orden en la tabla `order_products`
        for (const orderProduct of orderProducts) {
            await order.addProduct(orderProduct.productId, {
                through: { quantity: orderProduct.quantity, price: orderProduct.price }
            });
        }

        res.status(201).json({ order }); // Devuelve la orden creada
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
            if (!updatedOrder) return res.status(404).send("Orden no encontrada.");
            res.status(200).send(updatedOrder);
    } catch (err) {
            res.status(500).send(err.message || "Error interno del servidor.");
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
            if (!order) return res.status(404).send("Orden no encontrada.");
            await order.deleteOne();
        res.status(200).send("Orden eliminada correctamente.");
    } catch (err) {
        res.status(500).send(err.message || "Error interno del servidor.");
    }
};

const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.findAll(); // Ajusta según tu ORM o base de datos
        res.status(200).json(orders);
} catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
            if (!order) return res.status(404).send("Orden no encontrada.");
            
            if (req.user.isAdmin || req.user.id === order.userId) {
                return res.status(200).send(order);
        } else {
            return res.status(403).send("Acceso denegado. No autorizado.");
        }
    } catch (err) {
            res.status(500).send(err.message || "Error interno del servidor.");
    }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
};
