// utils/genAuthToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAuthToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  // Generar el token con la clave secreta
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return token;
};

module.exports = generateAuthToken;
