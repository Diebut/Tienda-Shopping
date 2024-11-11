const express = require('express');
const { verifyToken } = require('../controllers/authController');
const {auth} = require('../middleware/auth');

const router = express.Router();

// Ruta protegida que requiere verificación de token
router.get('/userinfo', auth, verifyToken);

module.exports = router;

