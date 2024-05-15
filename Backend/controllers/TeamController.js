const { Users, Teams, Activity_Team, Team_List } = require('../models/model')
const path = require('path');
const fs = require('fs');

async function searchTeams(req, res){
  try{
    const allTeams = await Teams.findAll();
    res.json({ Status: 'Success', allTeams})
  } catch(err) {
    console.log(err)
  }
}


async function getTeamAndMembers(req, res) {
  try {
    const { idTeacher } = req.userToken
    const teamId = req.params.teamId;

    const team = await Teams.findOne({ where: { idTeam: teamId } });

    if (!team) {
      return res.status(404).json({ error: 'Команда не найдена' });
    }

    const [teamMembers, teamActivity] = await Promise.all([
      Team_List.findAll({
        where: { idTeam: teamId },
        include: [{ model: Users, as: 'users', attributes: ['idTeacher', 'name', 'email'] }]
      }),
      Activity_Team.findAll({
        where: { idTeam: teamId },
        include: [{ model: Users, as: 'users', attributes: ['name', 'idTeacher'] }]
      })
    ]);
    
    
    res.json({ Status: 'Success', team, teamMembers, teamActivity, idTeacher });
  } catch (error) {
    console.error('Ошибка при получении команды и участников:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function createTeam(req, res) {
  const { idTeacher } = req.userToken;
  const { nameTeam, descriptionTeam, selectedOption, customDiscipline } = req.body;

  try {
    const existingTeam = await Teams.findOne({ where: { nameTeam } });
    if (existingTeam) {
      return res.status(400).json({ error: 'Команда с таким именем уже существует' });
    }

    const team = await Teams.create({
      idTeacher,
      nameTeam,
      descriptionTeam,
      areasWork: selectedOption === 'Outros' ? customDiscipline : selectedOption,
      CreateDate: new Date(),
    });

    const relacaoEquipaUtilizador = await Team_List.create({
      idTeam: team.idTeam,
      idTeacher,
      access: 'Administrador', // Или установите нужный уровень доступа
    });

    res.status(201).json({ success: true, team, relacaoEquipaUtilizador });
  } catch (error) {
    console.error('Ошибка при создании команды:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




async function addMemberToTeam(req, res) {
  const { email, access } = req.body;
  const teamId = req.params.teamId;

  console.log(email, access)

  try {
    const teacher = await Users.findOne({ where: { email: email } });
    if (!teacher) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const professorId = teacher.idTeacher;

    const existingRelation = await Team_List.findOne({ where: { idTeam: teamId, idTeacher: professorId } });
    if (existingRelation) {
      return res.status(400).json({ message: 'Пользователь уже является членом команды' });
    }
      
    const newRelation = await Team_List.create({ idTeam: teamId, idTeacher: professorId, access });

    res.status(201).json({ message: 'Пользователь успешно добавлен в команду', newRelation });
  } catch (error) {
    console.error('Ошибка при добавлении пользователя в команду:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function addActivityTeam(req, res) {
  const { idTeacher } = req.userToken;
  const teamId = req.params.teamId;

  try {
    let newFileName = null;
    let uploadPath = null;
    let fileSize = null;
    let fileType = null;

    if (req.file) {
      const { originalname, path: tempPath, size } = req.file;

      newFileName = originalname;

      uploadPath = path.resolve(__dirname, `../uploads/${newFileName}`);

      fs.renameSync(tempPath, uploadPath);

      const fileExtension = path.extname(originalname);

      fileSize = size;
      fileType = fileExtension;
    }

    const newActivity = await Activity_Team.create({
      idTeam: teamId,
      idTeacher,
      descriptionActivityTeam: req.body.descricao,
      fileName: newFileName,
      path: uploadPath,
      fileSize,
      fileType,
      CreateDate: new Date(),
    });

    res.status(200).json({ success: true, message: 'Данные успешно сохранены', data: newActivity });
  } catch (error) {
    console.error('Ошибка при сохранении данных: ', error);
    res.status(500).json({ success: false, message: 'Ошибка при сохранении данных' });
  }
}

async function editTeamAcitivty(req, res) {
  const activityId = req.params.activityId;

  try {
    const activity = await Atividades.findByPk(activityId);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    await activity.update(req.body);

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Обработчик POST запроса на присоединение к команде
async function joinTeam(req, res) {
  try {
      const { teamId, userId } = req.body; 

      if (!userId || isNaN(teamId)) {
          return res.status(400).json({ error: 'Неверный формат данных' });
      }

      const existingRelation = await Team_List.findOne({ where: { idTeam: teamId, idTeacher: userId } });
      if (existingRelation) {
        return res.status(400).json({ message: 'Пользователь уже является членом команды' });
      }

      console.log(teamId, userId)

      const join = await Team_List.create({ idTeam: teamId, idTeacher: userId, access: 'Convidado' })

      res.json({ status: 'Success', join });
  } catch (error) {
      console.error('Ошибка при добавлении пользователя в команду:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function privacy(req, res) {
  const teamId = req.params.id; // Получаем teamId из параметра маршрута
  const { newPrivacy } = req.body;
  try {
      const team = await Teams.findByPk(teamId);
      if (!team) {
          return res.status(404).json({ error: 'Команда не найдена' });
      }

      // Обновляем статус команды
      team.privacy = newPrivacy;
      await team.save();

      return res.status(200).json({ message: 'Статус команды успешно обновлен' });
  } catch (error) {
      console.error('Ошибка при обновлении статуса команды:', error);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

async function updateActivityTeam(req, res) {
  const { editedText, idActivityTeam } = req.body;
  try {
      const activity = await Activity_Team.findByPk(idActivityTeam);
      if (!activity) {
          return res.status(404).json({ error: 'Сообщение не найдено' });
      }

      activity.descriptionActivityTeam = editedText;
      await activity.save();

      return res.status(200).json({ message: 'Данные успешно обновлены' });
  } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}






module.exports = { getTeamAndMembers, createTeam, addMemberToTeam, addActivityTeam, editTeamAcitivty, searchTeams, joinTeam, privacy, updateActivityTeam };