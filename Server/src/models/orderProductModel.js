const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderProducts = sequelize.define('OrderProducts', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: true,
  tableName: 'orderProducts'
});

module.exports = { OrderProducts };
