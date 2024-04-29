const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Users = require('./Users');
const Teams = require('./Teams');

const Team_List = sequelize.define('Team_List', {
  idTeamList: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idTeam: DataTypes.INTEGER,
  idTeacher: DataTypes.INTEGER,
  access: { type: DataTypes.STRING, defaultValue: 'guest' },
}, { tableName: 'team_list', timestamps: false });

Team_List.belongsTo(Teams, { foreignKey: 'idTeam', as: 'teams' });
Team_List.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });

module.exports = Team_List;
