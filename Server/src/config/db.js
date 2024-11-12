const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,
  {
    host: "localhost",
    dialect:'mysql',
    dialectModule: require('mysql2'),
    logging: false,
  }
);

module.exports = sequelize;

