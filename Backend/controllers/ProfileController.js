const { Schools, Groups, Users, Activitys, Comments, Resources, Subjects, Years, Educations, Team_List, Teams, Activity_Team } = require('../models/model')

async function getProfileUser(req, res) {
  const { idTeacher } = req.userToken;

  try {
    const teacher = await Users.findByPk(idTeacher, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Schools, as: 'schools', attributes: ['idSchool', 'nameSchool'] },
        { model: Groups, as: 'groups', attributes: ['idGroup', 'codGroup', 'nameGroup'] }
      ]
    });

    if (!teacher) return res.status(404).json({ Message: 'Not Found: Utilizador não encontrado' });

    const teacherData = teacher.toJSON();
    const nameSchool = teacherData.schools?.nameSchool ?? null;
    const codGroup = teacherData.groups?.codGroup ?? null;
    const nameGroup = teacherData.groups?.nameGroup ?? null;

    // Удаление ненужных свойств для сохранения профиля
    delete teacherData.schools;
    delete teacherData.groups;

    const userActivity = await Activitys.findAll({
      where: { idTeacher },
      include: [
        { model: Users, as: 'users', attributes: ['name'] },
        { model: Subjects, as: 'subjects', attributes: ['nameSubject'] },
        { model: Years, as: 'years', attributes: ['year'] },
        { model: Educations, as: 'educations', attributes: ['nameEducation'] }
      ]
    });

    const userResources = await Resources.findAll({
      where: { idTeacher },
      include: [
        { model: Users, as: 'users', attributes: ['name'] },
      ]
    });

    const teams = await Team_List.findAll({
      where: { idTeacher },
      include: [
        { model: Users, as: 'users', attributes: ['idTeacher', 'name'] },
        { model: Teams, as: 'teams', attributes: ['idTeam', 'idTeacher', 'nameTeam', 'descriptionTeam', 'areasWork', 'privacy'] }
      ]
    });

    res.json({
      Status: 'Success',
      profile: { ...teacherData, nameSchool, codGroup, nameGroup },
      activity: userActivity,
      resources: userResources,
      teams,
    });
  } catch (error) {
    console.error('Erro de consulta da base de dados:', error);
    return res.status(500).json({ Message: 'Erro interno do servidor' });
  }
}


async function updateProfile(req, res) {
  try {
    const { name, group, school } = req.body;
    const { idTeacher } = req.userToken;

    const existingProfessor = await Users.findByPk(idTeacher);

    if (!existingProfessor) return res.status(404).json({ success: false, message: 'Professor não encontrado' });

    await existingProfessor.update({ name, idGroup: group, idSchool: school });

    return res.status(200).json({ success: true, message: 'O Professor foi atualizado com sucesso', data: existingProfessor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erro ao atualizar um professor' });
  }
}

async function getProfileAndActivity(req, res) {
  const userId = req.params.userId;

  try {
    const teacher = await Users.findByPk(userId, {
      include: [
        { model: Schools, as: 'schools', attributes: ['idSchool', 'nameSchool'] },
        { model: Groups, as: 'groups', attributes: ['idGroup', 'codGroup', 'nameGroup'] }
      ]
    });

    if (!teacher) return res.status(404).json({ message: 'Utilizador não encontrado' });

    // Получаем активность пользователя
    const userActivity = await Activitys.findAll({
      where: { idTeacher: userId },
      include: [
        { model: Subjects, as: 'subjects', attributes: ['nameSubject'] },
        { model: Years, as: 'years', attributes: ['year'] },
        { model: Educations, as: 'educations', attributes: ['nameEducation'] }
      ]
    });

    const userResources = await Resources.findAll({
      where: { idTeacher: userId },
      include: [
        { model: Users, as: 'users', attributes: ['name'] },
      ]
    });

    const userTeamList = await Team_List.findAll({
      where: { idTeacher: userId },
      include: [
        { model: Users, as: 'users', attributes: ['idTeacher', 'name'] },
        { model: Teams, as: 'teams', attributes: ['idTeam', 'idTeacher', 'nameTeam', 'descriptionTeam', 'areasWork'] }
      ]
    });

    const { schools, groups, ...profile } = teacher.toJSON();
    const nameSchool = schools ? schools.nameSchool : null;
    const { codGroup, nameGroup } = groups ? groups : {};

    // Отправляем профиль и активность вместе в ответе
    res.json({ profile: { ...profile, nameSchool, codGroup, nameGroup }, activity: userActivity, resources: userResources, teams: userTeamList });
  } catch (error) {
    console.error('Erro de consulta da base de dados:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function adminUpdateProfile(req, res) {
  const { idTeacher } = req.params;
  const { name, email, nameSchool, nameGroup } = req.body;

  try {
    const user = await Users.findByPk(idTeacher);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.idSchool = nameSchool;
    user.idGroup = nameGroup;

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
}

const deleteUser = async (req, res) => {
  const { idTeacher } = req.params;
  try {
      await Comments.destroy({ where: {idTeacher: idTeacher } });
      await Activity_Team.destroy({ where: {idTeacher: idTeacher }});
      await Team_List.destroy({ where: { idTeacher: idTeacher } });
      await Activitys.destroy({ where: { idTeacher: idTeacher } });
      await Teams.destroy({ where: { idTeacher: idTeacher } });
      await Resources.destroy({ where: { idTeacher: idTeacher } });
      await Users.destroy({ where: { idTeacher: idTeacher } });
      res.json({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
  }
};

  

module.exports = { getProfileUser, updateProfile, getProfileAndActivity, adminUpdateProfile, deleteUser };


