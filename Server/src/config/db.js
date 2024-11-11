const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("dg_tienda", "root", "555+131-xxxAA",
  {
    host: "localhost",
    dialect:'mysql',
    dialectModule: require('mysql2'),
    logging: false,
  }
);

module.exports = sequelize;

