const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

// Определение моделей
const Educations = sequelize.define('Educations', {
  idEducation: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameEducation: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'Educations', timestamps: false });

const Groups = sequelize.define('Groups', {
  idGroup: { type: DataTypes.INTEGER, primaryKey: true },
  codGroup: DataTypes.INTEGER,
  nameGroup: DataTypes.STRING,
}, { tableName: 'groups', timestamps: false });

const Schools = sequelize.define('Schools', {
  idSchool: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameSchool: DataTypes.STRING,
}, { tableName: 'schools', timestamps: false });

const Subjects = sequelize.define('Subjects', {
  idSubject: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameSubject: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'Subjects', timestamps: false });

const Users = sequelize.define('Users', {
  idTeacher: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING(30),
  email: DataTypes.STRING(255),
  password: DataTypes.STRING(500),
  СreateDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  idSchool: { type: DataTypes.INTEGER, references: { model: Schools, key: 'idSchool' } },
  idGroup: { type: DataTypes.INTEGER, references: { model: Groups, key: 'idGroup' } },
  role: { type: DataTypes.STRING, defaultValue: 'utilizador' },
  resetToken: DataTypes.STRING,
}, { tableName: 'users', timestamps: false });

const Teams = sequelize.define('Teams', {
  idTeam: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idTeacher: { type: DataTypes.INTEGER, allowNull: false },
  nameTeam: { type: DataTypes.STRING(255), allowNull: false },
  descriptionTeam: { type: DataTypes.STRING(255), defaultValue: null },
  areasWork: { type: DataTypes.STRING(255), allowNull: false },
  CreateDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  privacy: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'teams', timestamps: false });


const Years = sequelize.define('Years', {
  idYear: { type: DataTypes.INTEGER, primaryKey: true },
  year: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'years', timestamps: false });

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

const Comments = sequelize.define('Comments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idActivity: { type: DataTypes.INTEGER, allowNull: false, references: { model: Activitys, key: 'idActivity' } },
  idTeacher: { type: DataTypes.INTEGER, allowNull: false, references: { model: Users, key: 'idTeacher' } },
  content: { type: DataTypes.TEXT, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW },
}, { tableName: 'comments', timestamps: false });

const Resources = sequelize.define('Resources', {
  idResource: { type: DataTypes.INTEGER, primaryKey: true },
  idTeacher: { type: DataTypes.INTEGER, references: { model: Users, key: 'idTeacher' } },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  link: { type: DataTypes.STRING },
  fileName: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  fileType: { type: DataTypes.STRING },
  fileSize: { type: DataTypes.BIGINT },
  type: { type: DataTypes.STRING },
  publishDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'resources', timestamps: false });

const Tools = sequelize.define('Tools', {
  idTool: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  link: DataTypes.STRING(255),
  about: DataTypes.TEXT,
  application: DataTypes.STRING(255),
  type: DataTypes.STRING(255),
  state: DataTypes.STRING(255),
}, { tableName: 'tools', timestamps: false });

const Activity_Team = sequelize.define('Activity_Team', {
  idActivityTeam: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  idTeam: { type: DataTypes.INTEGER },
  idTeacher: { type: DataTypes.INTEGER },
  descriptionActivityTeam: { type: DataTypes.TEXT },
  fileName: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  fileType: { type: DataTypes.STRING },
  fileSize: { type: DataTypes.BIGINT },
  CreateDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'activity_team', timestamps: false });

const Team_List = sequelize.define('Team_List', {
  idTeamList: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idTeam: DataTypes.INTEGER,
  idTeacher: DataTypes.INTEGER,
  access: { type: DataTypes.STRING, defaultValue: 'guest' },
}, { tableName: 'team_list', timestamps: false });

// В модели Users
Users.belongsTo(Schools, { foreignKey: 'idSchool', as: 'schools' });
Users.belongsTo(Groups, { foreignKey: 'idGroup', as: 'groups' });

// В модели Activity_Team
Activity_Team.belongsTo(Teams, { foreignKey: 'idTeam', targetKey: 'idTeam' });
Activity_Team.belongsTo(Users, { foreignKey: 'idTeacher', targetKey: 'idTeacher', as: 'users' });

// В модели Activity_Team
Comments.belongsTo(Activitys, { foreignKey: 'idActivity', targetKey: 'idActivity' });
Comments.belongsTo(Users, { foreignKey: 'idTeacher', targetKey: 'idTeacher', as: 'users' });

// В модели Team_List
Team_List.belongsTo(Teams, { foreignKey: 'idTeam', as: 'teams' });
Team_List.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });

// В модели Teams
Teams.belongsTo(Users, { foreignKey: 'idTeacher', targetKey: 'idTeacher' });

// В модели Activitys
Activitys.belongsTo(Subjects, { foreignKey: 'idSubject', as: 'subjects' });
Activitys.belongsTo(Years, { foreignKey: 'idYear', as: 'years' });
Activitys.belongsTo(Educations, { foreignKey: 'idEducation', as: 'educations' });
Activitys.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });

// В модели Resources
Resources.belongsTo(Users, { foreignKey: 'idTeacher', as: 'users' });

// Создание всех таблиц
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All tables were created successfully.');
  } catch (error) {
    console.error('Error occurred while creating tables:', error);
  }
})();


module.exports = {
  Educations,
  Subjects,
  Groups,
  Schools,
  Users,
  Teams,
  Activitys,
  Years,
  Tools,
  Resources,
  Activity_Team,
  Team_List,
  Comments,
}
