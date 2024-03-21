const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Recursos = sequelize.define('Ano', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  filename: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  fileType: { type: DataTypes.STRING },
  fileSize: { type: DataTypes.BIGINT },
  iconPath: { type: DataTypes.STRING },
  publishDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'recursos', timestamps: false });

module.exports = Recursos;
