const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Order } = require('./orderModel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    minlength: 3,
    maxlength: 200
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    minlength: 3,
    maxlength: 1024
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: 'users'
});
// Relación: Un usuario puede tener muchas órdenes
User.hasMany(Order, { foreignKey: 'userId' });

module.exports = { User };
