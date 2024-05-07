const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pepp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  database: 'pepp',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
});

module.exports = sequelize;
