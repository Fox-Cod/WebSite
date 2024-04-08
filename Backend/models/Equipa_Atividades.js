const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Equipa = require('./Equipa');
const Professor = require('./Professor');

const Equipa_Atividades = sequelize.define('Equipa_Atividades', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_equipa: { type: DataTypes.INTEGER } ,
  id_professor: { type: DataTypes.INTEGER },
  descricao: { type: DataTypes.TEXT },
  filename: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  fileType: { type: DataTypes.STRING },
  fileSize: { type: DataTypes.BIGINT },
  data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'equipa_atividades', timestamps: false });

Equipa_Atividades.belongsTo(Equipa, { foreignKey: 'id_equipa', targetKey: 'id_equipa' });
Equipa_Atividades.belongsTo(Professor, { foreignKey: 'id_professor', targetKey: 'id_professor', as: 'professores' });

module.exports = Equipa_Atividades;
