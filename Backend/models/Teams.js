// models/Equipa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Users = require('./Users');

const Teams = sequelize.define('Teams', {
  idTeam: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idTeacher: { type: DataTypes.INTEGER, allowNull: false },
  nameTeam: { type: DataTypes.STRING(255), allowNull: false },
  descriptionTeam: { type: DataTypes.STRING(255), defaultValue: null },
  areasWork: { type: DataTypes.STRING(255), allowNull: false },
  CreateDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'teams', timestamps: false });

Teams.belongsTo(Users, { foreignKey: 'idTeacher', targetKey: 'idTeacher' });

module.exports = Teams;
