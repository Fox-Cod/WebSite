const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Users = require('./Users');
const Subjects = require('./Subjects');
const Educations = require('./Educations');
const Years = require('./Years');

const Activitys = sequelize.define('Activitys', {
    idActivity: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idTeacher: { type: DataTypes.INTEGER, references: { model: Users, key: 'idTeacher' } },
    planning: DataTypes.STRING,
    presentation: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publishDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    idSubject: { type: DataTypes.INTEGER, references: { model: Subjects, key: 'idSubject' } },
    idYear: { type: DataTypes.INTEGER, references: { model: Years, key: 'idYear' } },
    idEducation: { type: DataTypes.INTEGER, references: { model: Educations, key: 'idEducation' } },
}, { tableName: 'Activitys', timestamps: false });

Activitys.belongsTo(Subjects, { foreignKey: 'idSubject', as: 'subjects' });
Activitys.belongsTo(Years, { foreignKey: 'idYear', as: 'years' });
Activitys.belongsTo(Educations, { foreignKey: 'idEducation', as: 'educations' });
Activitys.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });

module.exports = Activitys;
