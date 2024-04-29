const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Educations = sequelize.define('Educations', {
  idEducation: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameEducation: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'Educations', timestamps: false });

module.exports = Educations;

