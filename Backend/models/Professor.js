const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database');
const Escola = require('./Escola');
const Grupo = require('./Grupo');

const Professor = sequelize.define('Professor', {
  id_professor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome_professor: DataTypes.STRING,
  email_professor: DataTypes.STRING,
  password_professor: DataTypes.STRING,
  data_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  id_escola: { type: DataTypes.INTEGER, references: { model: Escola, key: 'id_escola' } },
  id_grupo: { type: DataTypes.INTEGER, references: { model: Grupo, key: 'id_grupo' } },
  role: { type: DataTypes.STRING, defaultValue: 'utilizador' },
  resetToken: DataTypes.STRING,
  resetTokenExpires: DataTypes.DATE,
}, { tableName: 'professores', timestamps: false });


Professor.belongsTo(Escola, { foreignKey: 'id_escola', as: 'escola' });
Professor.belongsTo(Grupo, { foreignKey: 'id_grupo', as: 'grupo' });

module.exports = Professor;
