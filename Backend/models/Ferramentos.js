const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Ferramento = sequelize.define('Ferramento', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING(255)
  },
  sobre: {
    type: DataTypes.TEXT
  },
  aplicacao: {
    type: DataTypes.STRING(255)
  },
  tipo: {
    type: DataTypes.STRING(255)
  },
  estado: {
    type: DataTypes.STRING(255)
  },
  iconeURL: {
    type: DataTypes.STRING(255),
  },
}, {
    tableName: 'ferramentos',
    timestamps: false,
  });


module.exports = Ferramento;
