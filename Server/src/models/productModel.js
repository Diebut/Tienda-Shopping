const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Order } = require('./orderModel');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'products',
});

// Definir la relación: Un producto pertenece a muchas órdenes
Product.belongsToMany(Order, { through: 'OrderProducts', foreignKey: 'productId' });

module.exports = { Product };


