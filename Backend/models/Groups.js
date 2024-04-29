const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Groups = sequelize.define('Groups', {
  idGroup: { type: DataTypes.INTEGER, primaryKey: true },
  codGroup: DataTypes.INTEGER,
  nameGroup: DataTypes.STRING,
}, { tableName: 'groups', timestamps: false });

module.exports = Groups;

