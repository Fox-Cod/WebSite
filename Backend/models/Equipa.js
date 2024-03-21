// models/Equipa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Professor = require('./Professor');

const Equipa = sequelize.define('Equipa', {
  id_equipa: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_professor: { type: DataTypes.INTEGER, allowNull: false },
  nome_equipa: { type: DataTypes.STRING(255), allowNull: false },
  descricao_equipa: { type: DataTypes.STRING(255), defaultValue: null },
  industria: { type: DataTypes.STRING(255), allowNull: false },
}, { tableName: 'equipa', timestamps: false });

Equipa.belongsTo(Professor, { foreignKey: 'id_professor', targetKey: 'id_professor' });

module.exports = Equipa;
