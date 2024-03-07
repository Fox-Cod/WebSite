const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Anos = sequelize.define('Ano', {
  id_ano: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_ensino: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'anos',
  timestamps: false,
});

module.exports = Anos;
