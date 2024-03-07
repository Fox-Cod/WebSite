const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pepp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
