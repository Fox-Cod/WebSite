const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Equipa = require('./Equipa');
const Professor = require('./Professor');

const Equipa_Atividades = sequelize.define('Equipa_Atividades', {
    id_equipa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_professor: {
      type: DataTypes.INTEGER,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    filedata: {
      type: DataTypes.BLOB('long'),
    },
    file_size: {
      type: DataTypes.INTEGER,
    },
    filename: {
      type: DataTypes.STRING,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'equipa_atividades',
    timestamps: false,
});
  
Equipa_Atividades.belongsTo(Equipa, { foreignKey: 'id_equipa', targetKey: 'id_equipa' });

Equipa_Atividades.belongsTo(Professor, { foreignKey: 'id_professor', targetKey: 'id_professor', as: 'professores' });


module.exports = Equipa_Atividades;