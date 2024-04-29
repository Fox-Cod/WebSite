const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database');
const Schools = require('./Schools');
const Groups = require('./Groups');

const Users = sequelize.define('Users', {
  idTeacher: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  createDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  idSchool: { type: DataTypes.INTEGER, references: { model: Schools, key: 'idSchool' } },
  idGroup: { type: DataTypes.INTEGER, references: { model: Groups, key: 'idGroup' } },
  role: { type: DataTypes.STRING, defaultValue: 'utilizador' },
  resetToken: DataTypes.STRING,
}, { tableName: 'users', timestamps: false });


Users.belongsTo(Schools, { foreignKey: 'idSchool', as: 'schools' });
Users.belongsTo(Groups, { foreignKey: 'idGroup', as: 'groups' });

module.exports = Users;
