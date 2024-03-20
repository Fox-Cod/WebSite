const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Disciplinas = sequelize.define('Disciplina', {
  id_disciplina: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome_disciplina: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'disciplinas', timestamps: false });

module.exports = Disciplinas;
