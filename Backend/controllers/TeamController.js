const Professor = require('../models/Professor');
const Equipa = require('../models/Equipa');
const Equipa_Atividades = require('../models/Equipa_Atividades');
const RelacaoEquipaUtilizador = require('../models/Relacao_Equipa_Utilizador');

async function showTeams(req, res) {
  const { id_professor } = req.user;

  try {
    const teams = await RelacaoEquipaUtilizador.findAll({
      where: { id_professor: id_professor },
      include: [
        {
          model: Professor,
          as: 'professores',
          attributes: ['id_professor', 'nome_professor'],
        },
        {
          model: Equipa,
          as: 'equipa',
          attributes: ['id_equipa', 'id_professor', 'nome_equipa', 'descricao_equipa', 'industria'],
        },
      ],
    });

    if (!teams || teams.length === 0) {
      return res.status(404).json({ Message: 'Not Found: Пользователь не найден' });
    }

    res.json({
      Status: 'Success',
      teams: teams,
    });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    return res.status(500).json({ Message: 'Internal Server Error' });
  }
}


async function getTeamAndMembers(req, res) {
  try {
    const teamId = req.params.teamId;
    console.log(teamId)

    const team = await Equipa.findOne({
      where: { id_equipa: teamId },
    });

    if (!team) {
      return { error: 'Команда не найдена' };
    }

    const teamMembers = await RelacaoEquipaUtilizador.findAll({
      where: { id_equipa: teamId },
      include: [
        {
          model: Professor,
          as: 'professores',
          attributes: ['nome_professor'],
        }
      ]
    });

    const teamActivity = await Equipa_Atividades.findAll({
      where: { id_equipa: teamId },
      include: [
        {
          model: Professor,
          as: 'professores',
          attributes: ['nome_professor'],
        }
      ]
    });


    res.json({
      Status: 'Success',
      team: team, teamMembers: teamMembers, teamActivity: teamActivity });

  } catch (error) {
    console.error('Error retrieving team and members:', error);
    // Обработайте ошибку по вашему усмотрению
    throw error;
  }
}


async function createTeam(req, res) {
  const { id_professor } = req.user;
  const { teamName, teamDescription, selectedOption, customDiscipline } = req.body;

  try {

    const existingTeam = await Equipa.findOne({
      where: { nome_equipa: teamName },
    });

    if (existingTeam) {
      return res.status(400).json({ error: 'Команда с таким именем уже существует' });
    }
    // Создание команды
    const team = await Equipa.create({
      id_professor: id_professor,
      nome_equipa: teamName,
      descricao_equipa: teamDescription,
      industria: selectedOption === 'Outros' ? customDiscipline : selectedOption,
    });

    // Получение идентификатора только что созданной команды
    const id_equipa = team.id_equipa;

    // Добавление записи в таблицу RelacaoEquipaUtilizador
    const relacaoEquipaUtilizador = await RelacaoEquipaUtilizador.create({
      id_equipa: id_equipa,
      id_professor: id_professor,
      nivel_de_acesso: 'Administrator', // Или установите нужный уровень доступа
    });

    res.status(201).json({ success: true, team, relacaoEquipaUtilizador });
  } catch (error) {
    console.error('Error creating team:', error);
    // Отправка ответа об ошибке
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function addMemberToTeam(req, res) {
  const { nome_professor, nivel_de_acesso } = req.body;

  try {
    // Найти идентификатор текущей группы (команды)
    const teamId = req.params.teamId;

    // Найти идентификатор пользователя по имени
    const professor = await Professor.findOne({
      where: { nome_professor },
    });

    if (!professor) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const professorId = professor.id_professor;

      // Проверить, не является ли пользователь уже членом команды
      const existingRelation = await RelacaoEquipaUtilizador.findOne({
        where: { id_equipa: teamId, id_professor: professorId },
      });

      if (existingRelation) {
        return res.status(400).json({ message: 'Пользователь уже является членом команды' });
      }
      
    const newRelation = await RelacaoEquipaUtilizador.create({
      id_equipa: teamId,
      id_professor: professorId,
      nivel_de_acesso,
    });

    res.status(201).json({ message: 'Пользователь успешно добавлен в команду', newRelation });
  } catch (error) {
    console.error('Ошибка при добавлении пользователя в команду:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function postActivityTeam(req, res) {
  try {
    const { id_professor } = req.user;
    const { descricao } = req.body;
    const teamId = req.params.teamId;

    // Добавленная проверка наличия файла
    if (!req.file) {
      return res.status(433).json({ message: 'Файл не найден' });
    }

    // Получаем бинарные данные из загруженного файла
    const fileData = req.file.buffer;
    const fileSize = req.file.size;
    const fileName = req.file.originalname;

    // Создаем запись в таблице Equipa_Atividades
    const equipaAtividade = await Equipa_Atividades.create({
      id_professor: id_professor,
      descricao: descricao,
      id_equipa: teamId,
      filedata: fileData,
      file_size: fileSize,
      filename: fileName,
    });

    // Отправляем успешный ответ
    res.status(201).json({ message: 'Atividade da equipa criada com sucesso', equipaAtividade });
  } catch (error) {
    console.error('Error in addActivityTeam:', error);

    // Обработка конкретных ошибок
    if (error.name === 'SequelizeValidationError') {
      // Ошибка валидации Sequelize
      res.status(400).json({ message: 'Ошибка валидации данных', error: error.errors });
    } else {
      // Прочие ошибки
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }
}





module.exports = { showTeams, getTeamAndMembers, createTeam, addMemberToTeam, postActivityTeam };