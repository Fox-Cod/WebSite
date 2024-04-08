const Professor = require('../models/Professor');
const Equipa = require('../models/Equipa');
const Equipa_Atividades = require('../models/Equipa_Atividades');
const RelacaoEquipaUtilizador = require('../models/Relacao_Equipa_Utilizador');

async function showTeams(req, res) {
  const { id_professor } = req.user;

  try {
    const teams = await RelacaoEquipaUtilizador.findAll({
      where: { id_professor },
      include: [
        { model: Professor, as: 'professores', attributes: ['id_professor', 'nome_professor'] },
        { model: Equipa, as: 'equipa', attributes: ['id_equipa', 'id_professor', 'nome_equipa', 'descricao_equipa', 'industria'] }
      ]
    });

    if (!teams || teams.length === 0) {
      return res.status(404).json({ Message: 'Not Found: Пользователь не найден' });
    }

    res.json({ Status: 'Success', teams });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    res.status(500).json({ Message: 'Internal Server Error' });
  }
}



async function getTeamAndMembers(req, res) {
  try {
    const teamId = req.params.teamId;

    const team = await Equipa.findOne({ where: { id_equipa: teamId } });

    if (!team) {
      return res.status(404).json({ error: 'Команда не найдена' });
    }

    const [teamMembers, teamActivity] = await Promise.all([
      RelacaoEquipaUtilizador.findAll({
        where: { id_equipa: teamId },
        include: [{ model: Professor, as: 'professores', attributes: ['id_professor', 'nome_professor'] }]
      }),
      Equipa_Atividades.findAll({
        where: { id_equipa: teamId },
        include: [{ model: Professor, as: 'professores', attributes: ['nome_professor'] }]
      })
    ]);

    res.json({ Status: 'Success', team, teamMembers, teamActivity });
  } catch (error) {
    console.error('Ошибка при получении команды и участников:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function createTeam(req, res) {
  const { id_professor } = req.user;
  const { teamName, teamDescription, selectedOption, customDiscipline } = req.body;

  try {
    const existingTeam = await Equipa.findOne({ where: { nome_equipa: teamName } });
    if (existingTeam) {
      return res.status(400).json({ error: 'Команда с таким именем уже существует' });
    }

    const team = await Equipa.create({
      id_professor,
      nome_equipa: teamName,
      descricao_equipa: teamDescription,
      industria: selectedOption === 'Outros' ? customDiscipline : selectedOption,
    });

    const relacaoEquipaUtilizador = await RelacaoEquipaUtilizador.create({
      id_equipa: team.id_equipa,
      id_professor,
      nivel_de_acesso: 'Administrator', // Или установите нужный уровень доступа
    });

    res.status(201).json({ success: true, team, relacaoEquipaUtilizador });
  } catch (error) {
    console.error('Ошибка при создании команды:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




async function addMemberToTeam(req, res) {
  const { nome_professor, nivel_de_acesso } = req.body;

  try {
    const teamId = req.params.teamId;

    const professor = await Professor.findOne({ where: { nome_professor } });
    if (!professor) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const professorId = professor.id_professor;

    const existingRelation = await RelacaoEquipaUtilizador.findOne({ where: { id_equipa: teamId, id_professor: professorId } });
    if (existingRelation) {
      return res.status(400).json({ message: 'Пользователь уже является членом команды' });
    }
      
    const newRelation = await RelacaoEquipaUtilizador.create({ id_equipa: teamId, id_professor: professorId, nivel_de_acesso,  });

    res.status(201).json({ message: 'Пользователь успешно добавлен в команду', newRelation });
  } catch (error) {
    console.error('Ошибка при добавлении пользователя в команду:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function addActivityTeam(req, res) {
  try {
    const { id_professor } = req.user;
    const teamId = req.params.teamId;

    let newFileName = null;
    let uploadPath = null;
    let size = null;
    let fileExtension = null;

    // Проверяем, был ли загружен файл
    if (req.file) {
      const { originalname, path: tempPath } = req.file;

      // Генерируем уникальное имя файла
      newFileName = originalname;

      // Путь для сохранения файла
      uploadPath = path.resolve(__dirname, `../uploads/${newFileName}`);

      // Перемещаем файл в папку uploads с оригинальным именем
      fs.renameSync(tempPath, uploadPath);

      // Определяем расширение файла
      fileExtension = path.extname(originalname);

      // Устанавливаем размер файла
      size = req.file.size;
    }

    // Сохраняем информацию о файле в базе данных
    const newActivity = await Equipa_Atividades.create({
      id_equipa: teamId,
      id_professor,
      descricao: req.body.descricao,
      filename: newFileName,
      path: uploadPath,
      fileSize: size,
      fileType: fileExtension,
      data_criacao: new Date(),
    });

    res.status(200).json({ success: true, message: 'Данные успешно сохранены', data: newActivity });
  } catch (error) {
    console.error('Ошибка при сохранении данных: ', error);
    res.status(500).json({ success: false, message: 'Ошибка при сохранении данных' });
  }
}






module.exports = { showTeams, getTeamAndMembers, createTeam, addMemberToTeam, addActivityTeam };