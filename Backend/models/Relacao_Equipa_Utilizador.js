// models/RelacaoEquipaUtilizador.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Professor = require('./Professor');
const Equipa = require('./Equipa');

const RelacaoEquipaUtilizador = sequelize.define('RelacaoEquipaUtilizador', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_equipa: DataTypes.INTEGER,
  id_professor: DataTypes.INTEGER,
  nivel_de_acesso: { type: DataTypes.STRING, defaultValue: 'guest' },
}, { tableName: 'relacao_equipa_utilizador', timestamps: false });

RelacaoEquipaUtilizador.belongsTo(Equipa, { foreignKey: 'id_equipa', as: 'equipa' });
RelacaoEquipaUtilizador.belongsTo(Professor, { foreignKey: 'id_professor', as: 'professores' });

module.exports = RelacaoEquipaUtilizador;
