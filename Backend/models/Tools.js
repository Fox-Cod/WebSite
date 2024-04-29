const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tools = sequelize.define('Tools', {
  idTool: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  link: DataTypes.STRING(255),
  about: DataTypes.TEXT,
  application: DataTypes.STRING(255),
  type: DataTypes.STRING(255),
  state: DataTypes.STRING(255),
}, { tableName: 'tools', timestamps: false });

module.exports = Tools;
