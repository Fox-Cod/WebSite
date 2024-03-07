const Escola = require('../models/Escola');
const Grupo = require('../models/Grupo');
const Professor = require('../models/Professor');
const Atividades = require('../models/Atividades'); 
const Disciplina = require('../models/Disciplina'); 
const Ano = require('../models/Ano'); 
const Ensino = require('../models/Ensino');


async function getProfileUser(req, res) {
  const { id_professor } = req.user;

  try {
    const professor = await Professor.findByPk(id_professor, {
      attributes: { exclude: ['password_professor'] },
      include: [
        {
          model: Escola,
          as: 'escola',
          attributes: ['id_escola', 'nome_escola'],
        },
        {
          model: Grupo,
          as: 'grupo',
          attributes: ['id_grupo', 'cod_grupo', 'nome_grupo'],
        },
      ],
    });

    if (!professor) {
      return res.status(404).json({ Message: 'Not Found: Пользователь не найден' });
    }

    const { nome_escola } = professor.escola;
    const { cod_grupo, nome_grupo } = professor.grupo; 

    res.json({
      Status: 'Success',
      profile: {
        id_professor: professor.id_professor,
        nome_professor: professor.nome_professor,
        email_professor: professor.email_professor,
        data_registro: professor.data_registro,
        id_escola: professor.id_escola,
        id_grupo: professor.id_grupo,
        role: professor.role,
        nome_escola,
        cod_grupo, 
        nome_grupo,
      },
    });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    return res.status(500).json({ Message: 'Internal Server Error' });
  }
}


async function getUserActivity(req, res) {
  const { id_professor } = req.user;

  console.log('ID USERRRRRR! ', id_professor);
  try {
    const userActivity = await Atividades.findAll({
      where: { id_professor: id_professor },
      include: [
        {
          model: Professor,
          as: 'professores',
          attributes: ['nome_professor'],
        },
        {
          model: Disciplina,
          as: 'disciplinas',
          attributes: ['nome_disciplina'],
        },
        {
          model: Ano,
          as: 'anos',
          attributes: ['ano'],
        },
        {
          model: Ensino,
          as: 'nivel_ensino',
          attributes: ['nome_ensino'],
        },
      ],
    });

    res.json({
      Status: 'Success',
      activities: userActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function updateProfile(req, res) {
  try {
    const { nome, group, escola } = req.body;

    const { id_professor } = req.user;

    const existingProfessor = await Professor.findByPk(id_professor);

    if (!existingProfessor) {
      return res.status(404).json({ success: false, message: 'Профессор не найден' });
    }

    existingProfessor.nome_professor = nome;
    existingProfessor.id_grupo = group;
    existingProfessor.id_escola = escola;

    await existingProfessor.save();

    return res.status(200).json({ success: true, message: 'Профессор успешно обновлен', data: existingProfessor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Ошибка при обновлении профессора' });
  }
}


async function getProfileOtherUser(req, res) {
  const userId = req.params.userId;
  console.log("ID Пользувателя для просмотра его профиля", userId)
  try {
    const professor = await Professor.findByPk(userId, {
      attributes: { exclude: ['password_professor'] },
      include: [
        {
          model: Escola,
          as: 'escola',
          attributes: ['id_escola', 'nome_escola'],
        },
        {
          model: Grupo,
          as: 'grupo',
          attributes: ['id_grupo', 'cod_grupo', 'nome_grupo'],
        },
      ],
    });

    if (!professor) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }

    const { nome_escola } = professor.escola;
    const { cod_grupo, nome_grupo } = professor.grupo; 

    res.json({
      status: 'Success',
      profile: {
        id_professor: professor.id_professor,
        nome_professor: professor.nome_professor,
        email_professor: professor.email_professor,
        data_registro: professor.data_registro,
        id_escola: professor.id_escola,
        id_grupo: professor.id_grupo,
        role: professor.role,
        nome_escola,
        cod_grupo, 
        nome_grupo,
      },
    });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
}


module.exports = { getProfileUser, getProfileOtherUser, getUserActivity, updateProfile };


