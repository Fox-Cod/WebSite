const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Professor = require('./Professor');
const Disciplina = require('./Disciplina');
const Ensino = require('./Ensino');
const Ano = require('./Ano');

const Atividades = sequelize.define('Atividades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_professor: {
        type: DataTypes.INTEGER,
        references: {
            model: Professor,
            key: 'id_professor',
        },
    },    
    planificacao: {
        type: DataTypes.STRING
    },
    presentacao: {
        type: DataTypes.STRING
    },
    titulo: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.STRING
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    id_disciplina: {
        type: DataTypes.INTEGER,
        references: {
          model: Disciplina,
          key: 'id_disciplina',
        },
    },
    id_ano: {
        type: DataTypes.INTEGER,
        references: {
            model: Ano,
            key: 'id_ano',
        },
    },
    id_ensino: {
        type: DataTypes.INTEGER,
        references: {
            model: Ensino,
            key: 'id_ensino',
        },
    },
}, {
    tableName: 'atividades',
    timestamps: false,
});

Atividades.belongsTo(Disciplina, {
    foreignKey: 'id_disciplina',
    as: 'disciplinas',
  });
  
Atividades.belongsTo(Ano, {
    foreignKey: 'id_ano',
    as: 'anos',
  });
Atividades.belongsTo(Ensino, {
    foreignKey: 'id_ensino',
    as: 'nivel_ensino',
  });

Atividades.belongsTo(Professor, {
    foreignKey: 'id_professor',
    as: 'professores',
  });

module.exports = Atividades;