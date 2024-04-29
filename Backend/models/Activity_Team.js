const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Teams = require('./Teams');
const Users = require('./Users');

const Activity_Team = sequelize.define('Activity_Team', {
  idActivityTeam: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idTeam: { type: DataTypes.INTEGER } ,
  idTeacher: { type: DataTypes.INTEGER },
  descriptionActivityTeam: { type: DataTypes.TEXT },
  fileName: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  fileType: { type: DataTypes.STRING },
  fileSize: { type: DataTypes.BIGINT },
  CreateDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'activity_team', timestamps: false });

Activity_Team.belongsTo(Teams, { foreignKey: 'idTeam', targetKey: 'idTeam' });
Activity_Team.belongsTo(Users, { foreignKey: 'idTeacher', targetKey: 'idTeacher', as: 'users' });

module.exports = Activity_Team;
