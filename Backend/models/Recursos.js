const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Professor = require('./Professor');

const Recursos = sequelize.define('Ano', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  id_professor: { type: DataTypes.INTEGER, references: { model: Professor, key: 'id_professor' } },
  title: { type: DataTypes.STRING },
  filename: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  fileType: { type: DataTypes.STRING },
  fileSize: { type: DataTypes.BIGINT },
  iconPath: { type: DataTypes.STRING },
  publishDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'recursos', timestamps: false });

Recursos.belongsTo(Professor, { foreignKey: 'id_professor', as: 'professores' });

module.exports = Recursos;
