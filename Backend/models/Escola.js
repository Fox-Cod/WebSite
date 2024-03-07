const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Escola = sequelize.define('Escola', {
  id_escola: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_escola: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'escola',
  timestamps: false,
});

module.exports = Escola;
