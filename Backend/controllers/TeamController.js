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
      return res.status(404).json({ error: 'Comando não encontrado' });
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
    console.error('Erro ao receber a equipa e os participantes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function createTeam(req, res) {
  const { idTeacher } = req.userToken;
  const { nameTeam, descriptionTeam, selectedOption, customDiscipline } = req.body;

  try {
    const existingTeam = await Teams.findOne({ where: { nameTeam } });
    if (existingTeam) {
      return res.status(400).json({ error: 'Já existe uma equipa com este nome' });
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
    console.error('Erro ao criar uma equipa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}




async function addMemberToTeam(req, res) {
  const { email, access } = req.body;
  const teamId = req.params.teamId;

  console.log(email, access)

  try {
    const teacher = await Users.findOne({ where: { email: email } });
    if (!teacher) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    const professorId = teacher.idTeacher;

    const existingRelation = await Team_List.findOne({ where: { idTeam: teamId, idTeacher: professorId } });
    if (existingRelation) {
      return res.status(400).json({ message: 'O utilizador já é membro da equipa' });
    }
      
    const newRelation = await Team_List.create({ idTeam: teamId, idTeacher: professorId, access });

    res.status(201).json({ message: 'Usuário adicionado com sucesso à equipe', newRelation });
  } catch (error) {
    console.error('Erro ao adicionar usuário à equipe:', error.message);
    res.status(500).json({ error: 'Erro do Servidor Interno' });
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

    res.status(200).json({ success: true, message: 'Dados salvos com sucesso', data: newActivity });
  } catch (error) {
    console.error('Erro ao salvar dados: ', error);
    res.status(500).json({ success: false, message: 'Erro ao salvar dados' });
  }
}

async function editTeamAcitivty(req, res) {
  const activityId = req.params.activityId;

  try {
    const activity = await Atividades.findByPk(activityId);
    if (!activity) return res.status(404).json({ message: 'Atividade não encontrada' });

    await activity.update(req.body);

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro do Servidor Interno' });
  }
}

// Обработчик POST запроса на присоединение к команде
async function joinTeam(req, res) {
  try {
      const { teamId, userId } = req.body; 

      if (!userId || isNaN(teamId)) {
          return res.status(400).json({ error: 'Formato de dados inválido' });
      }

      const existingRelation = await Team_List.findOne({ where: { idTeam: teamId, idTeacher: userId } });
      if (existingRelation) {
        return res.status(400).json({ message: 'O usuário já é membro da equipe' });
      }

      console.log(teamId, userId)

      const join = await Team_List.create({ idTeam: teamId, idTeacher: userId, access: 'Convidado' })

      res.json({ status: 'Success', join });
  } catch (error) {
      console.error('Erro ao adicionar usuário à equipe:', error);
      res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
}

async function privacy(req, res) {
  const teamId = req.params.teamId;
  const { newPrivacy } = req.body;

  try {
      const team = await Teams.findByPk(teamId);
      if (!team) {
          return res.status(404).json({ error: 'Команда не найдена' });
      }

      // Обновляем статус команды
      team.privacy = newPrivacy;
      await team.save();

      return res.status(200).json({ message: 'Status da equipe atualizado com sucesso' });
  } catch (error) {
      console.error('Erro ao atualizar o status da equipe:', error);
      return res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
}


async function updateActivityTeam(req, res) {
  const { editedText, idActivityTeam } = req.body;
  try {
      const activity = await Activity_Team.findByPk(idActivityTeam);
      if (!activity) {
          return res.status(404).json({ error: 'Mensagem não encontrada' });
      }

      activity.descriptionActivityTeam = editedText;
      await activity.save();

      return res.status(200).json({ message: 'Dados atualizados com sucesso' });
  } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      return res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
}

async function deleteActivityTeam(req, res) {
  const { index, idActivityTeam } = req.body;
  try {
      const activity = await Activity_Team.findByPk(idActivityTeam);
      if (!activity) {
          return res.status(404).json({ error: 'Mensagem não encontrada' });
      }

      activity.descriptionActivityTeam = index;
      await activity.destroy();

      return res.status(200).json({ message: 'Dados atualizados com sucesso' });
  } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      return res.status(500).json({ error: 'Erro do Servidor Interno' });
  }
}






module.exports = { getTeamAndMembers, createTeam, addMemberToTeam, addActivityTeam, editTeamAcitivty, searchTeams, joinTeam, privacy, updateActivityTeam, deleteActivityTeam };