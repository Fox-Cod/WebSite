const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Schools = sequelize.define('Schools', {
  idSchool: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameSchool: DataTypes.STRING,
}, { tableName: 'schools', timestamps: false });

module.exports = Schools;

