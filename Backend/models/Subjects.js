const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Subjects = sequelize.define('Subjects', {
  idSubject: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameSubject: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'Subjects', timestamps: false });

module.exports = Subjects;
