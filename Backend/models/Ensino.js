const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Ensino = sequelize.define('Ensino', {
  id_ensino: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_ensino: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'nivel_ensino',
  timestamps: false,
});

module.exports = Ensino;
