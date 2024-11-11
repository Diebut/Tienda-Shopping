const express = require("express");
const { createCheckoutSession, handleWebhook } = require("../controllers/stripeController");

const router = express.Router();

// Ruta para crear una sesión de pago en Stripe
router.post("/create-checkout-session", createCheckoutSession);

router.post("/webhook", handleWebhook);

module.exports = router;
