const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization']; 

  if (!authHeader) {
    return res.status(403).json({ message: "No se proporcionó token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId, isAdmin: Number(decoded.isAdmin) };
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user && req.user.isAdmin === 1) {
      next();
    } else {
      res.status(403).json({ message: 'Acceso restringido a administradores' });
    }
  });
};

const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (!req.user || req.user.isAdmin !== 1) {
      next();
    } else {
      res.status(403).json({ message: 'Acceso restringido a usuarios no administradores' });
    }
  });
};

module.exports = { auth, isUser, isAdmin };



