const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Years = sequelize.define('Years', {
  idYear: { type: DataTypes.INTEGER, primaryKey: true },
  year: { type: DataTypes.INTEGER, allowNull: false },
  idEducation: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'years', timestamps: false });

module.exports = Years;
