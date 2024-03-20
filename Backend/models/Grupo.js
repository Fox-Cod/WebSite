const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Grupo = sequelize.define('Grupo', {
  id_grupo: { type: DataTypes.INTEGER, primaryKey: true },
  cod_grupo: DataTypes.INTEGER,
  nome_grupo: DataTypes.STRING,
}, { tableName: 'grupo', timestamps: false });

module.exports = Grupo;

