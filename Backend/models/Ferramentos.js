const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Ferramento = sequelize.define('Ferramento', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING(255), allowNull: false },
  link: DataTypes.STRING(255),
  sobre: DataTypes.TEXT,
  aplicacao: DataTypes.STRING(255),
  tipo: DataTypes.STRING(255),
  estado: DataTypes.STRING(255),
  iconeURL: DataTypes.STRING(255),
}, { tableName: 'ferramentos', timestamps: false });

module.exports = Ferramento;
