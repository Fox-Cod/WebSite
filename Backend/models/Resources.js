const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Users = require('./Users');

const Resources = sequelize.define('Resources', {
  idResource: { type: DataTypes.INTEGER, primaryKey: true },
  idTeacher: { type: DataTypes.INTEGER, references: { model: Users, key: 'idTeacher' } },
  title: { type: DataTypes.STRING },
  fileName: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  fileType: { type: DataTypes.STRING },
  fileSize: { type: DataTypes.BIGINT },
  publishDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'resources', timestamps: false });

Resources.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });

module.exports = Resources;
