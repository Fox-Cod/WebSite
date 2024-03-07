const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database');
const Escola = require('./Escola');
const Grupo = require('./Grupo');

const Professor = sequelize.define('Professor', {
  id_professor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_professor: {
    type: DataTypes.STRING,
  },
  email_professor: {
    type: DataTypes.STRING,
  },
  password_professor: {
    type: DataTypes.STRING,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue('password_professor', hashedPassword);
    },
  },
  data_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_escola: {
    type: DataTypes.INTEGER,
    references: {
      model: Escola,
      key: 'id_escola',
    },
  },
  id_grupo: {
    type: DataTypes.INTEGER,
    references: {
      model: Grupo,
      key: 'id_grupo',
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'utilizador',
  },
  resetToken: {
    type: DataTypes.STRING,
  },
  resetTokenExpires: {
    type: DataTypes.DATE,
  },

}, {
  tableName: 'professores',
  timestamps: false,
});

Professor.belongsTo(Escola, {
  foreignKey: 'id_escola',
  as: 'escola',
});

Professor.belongsTo(Grupo, {
  foreignKey: 'id_grupo',
  as: 'grupo',
});


module.exports = Professor;
