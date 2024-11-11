const {User} = require('./userModel');
const { Product } = require('./productModel');
const { Order } = require('./orderModel');
const { OrderProducts } = require('./orderProductModel');

// Definir relaciones entre los modelos
Product.belongsToMany(Order, { through: OrderProducts, foreignKey: 'productId' });
Order.belongsToMany(Product, { through: OrderProducts, foreignKey: 'orderId' });

Order.hasMany(OrderProducts, { foreignKey: 'orderId' });
Product.hasMany(OrderProducts, { foreignKey: 'productId' });
