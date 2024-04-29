const Schools = require('../models/Schools');
const Groups = require('../models/Groups');
const Users = require('../models/Users');
const Activitys = require('../models/Activitys'); 
const Resources = require('../models/Resources'); 
const Subjects = require('../models/Subjects'); 
const Years = require('../models/Years'); 
const Educations = require('../models/Educations');


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

    if (!teacher) return res.status(404).json({ Message: 'Not Found: Пользователь не найден' });

    const { schools, groups, ...profile } = teacher.toJSON();
    const { nameSchool } = schools, { codGroup, nameGroup } = groups;

    res.json({ Status: 'Success', profile: { ...profile, nameSchool, codGroup, nameGroup } });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    return res.status(500).json({ Message: 'Internal Server Error' });
  }
}



async function getUserActivity(req, res) {
  const { idTeacher } = req.userToken;

  try {
    const userActivity = await Activitys.findAll({
      where: { idTeacher: idTeacher },
      include: [
        { model: Users, as: 'users', attributes: ['name'] },
        { model: Subjects, as: 'subjects', attributes: ['nameSubject'] },
        { model: Years, as: 'years', attributes: ['year'] },
        { model: Educations, as: 'educations', attributes: ['nameEducation'] }
      ]
    });

    res.json({ Status: 'Success', activity: userActivity });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getUserResources(req, res) {
  const { idTeacher } = req.userToken;

  try {
    const userResources = await Resources.findAll({
      where: { idTeacher },
      include: [
        { model: Users, as: 'users', attributes: ['name'] },
      ]
    });

    res.json({ Status: 'Success', resources: userResources });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


async function updateProfile(req, res) {
  try {
    const { name, group, school } = req.body;
    const { idTeacher } = req.userToken;

    const existingProfessor = await Users.findByPk(idTeacher);

    if (!existingProfessor) return res.status(404).json({ success: false, message: 'Профессор не найден' });

    await existingProfessor.update({ name, idGroup: group, idSchool: school });

    return res.status(200).json({ success: true, message: 'Профессор успешно обновлен', data: existingProfessor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Ошибка при обновлении профессора' });
  }
}

// View other users with their activities and files

async function getProfileAndActivity(req, res) {
  const userId = req.params.userId;

  try {
    // Получаем профиль другого пользователя
    const teacher = await Users.findByPk(userId, {
      include: [
        { model: Schools, as: 'schools', attributes: ['idSchool', 'nameSchool'] },
        { model: Groups, as: 'groups', attributes: ['idGroup', 'codGroup', 'nameGroup'] }
      ]
    });

    // Если пользователь не найден, возвращаем 404
    if (!teacher) return res.status(404).json({ message: 'Пользователь не найден' });

    // Получаем активность пользователя
    const userActivity = await Activitys.findAll({
      where: { userId },
      include: [
        { model: Subjects, as: 'subjects', attributes: ['nameSubject'] },
        { model: Years, as: 'years', attributes: ['year'] },
        { model: Educations, as: 'educations', attributes: ['nameEducation'] }
      ]
    });


    const { schools, groups, ...profile } = teacher.toJSON();
    const nameSchool = schools ? schools.nameSchool : null; 
    const { codGroup, nameGroup } = groups ? groups : {};

    // Отправляем профиль и активность вместе в ответе
    res.json({ status: 'Success', profile: { ...profile, nameSchool, codGroup, nameGroup }, activity: userActivity });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
}





module.exports = { getProfileUser, getUserActivity, getUserResources, updateProfile, getProfileAndActivity };


