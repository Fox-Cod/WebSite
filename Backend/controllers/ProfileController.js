const Escola = require('../models/Escola');
const Grupo = require('../models/Grupo');
const Professor = require('../models/Professor');
const Atividades = require('../models/Atividades'); 
const Recursos = require('../models/Recursos'); 
const Disciplina = require('../models/Disciplina'); 
const Ano = require('../models/Ano'); 
const Ensino = require('../models/Ensino');


async function getProfileUser(req, res) {
  const { id_professor } = req.user;

  try {
    const professor = await Professor.findByPk(id_professor, {
      attributes: { exclude: ['password_professor'] },
      include: [
        { model: Escola, as: 'escola', attributes: ['id_escola', 'nome_escola'] },
        { model: Grupo, as: 'grupo', attributes: ['id_grupo', 'cod_grupo', 'nome_grupo'] }
      ]
    });

    if (!professor) return res.status(404).json({ Message: 'Not Found: Пользователь не найден' });

    const { escola, grupo, ...profile } = professor.toJSON();
    const { nome_escola } = escola, { cod_grupo, nome_grupo } = grupo;

    res.json({ Status: 'Success', profile: { ...profile, nome_escola, cod_grupo, nome_grupo } });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    return res.status(500).json({ Message: 'Internal Server Error' });
  }
}



async function getUserActivity(req, res) {
  const { id_professor } = req.user;

  try {
    const userActivity = await Atividades.findAll({
      where: { id_professor },
      include: [
        { model: Professor, as: 'professores', attributes: ['nome_professor'] },
        { model: Disciplina, as: 'disciplinas', attributes: ['nome_disciplina'] },
        { model: Ano, as: 'anos', attributes: ['ano'] },
        { model: Ensino, as: 'nivel_ensino', attributes: ['nome_ensino'] }
      ]
    });

    res.json({ Status: 'Success', activity: userActivity });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getUserResources(req, res) {
  const { id_professor } = req.user;

  try {
    const userResources = await Recursos.findAll({
      where: { id_professor },
      include: [
        { model: Professor, as: 'professores', attributes: ['nome_professor'] },
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
    const { nome, group, escola } = req.body;
    const { id_professor } = req.user;

    const existingProfessor = await Professor.findByPk(id_professor);

    if (!existingProfessor) return res.status(404).json({ success: false, message: 'Профессор не найден' });

    await existingProfessor.update({ nome_professor: nome, id_grupo: group, id_escola: escola });

    return res.status(200).json({ success: true, message: 'Профессор успешно обновлен', data: existingProfessor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Ошибка при обновлении профессора' });
  }
}

// View other users with their activities and files

async function getProfileOtherUser(req, res) {
  const userId = req.params.userId;
  try {
    const professor = await Professor.findByPk(userId, {
      include: [
        { model: Escola, as: 'escola', attributes: ['id_escola', 'nome_escola'] },
        { model: Grupo, as: 'grupo', attributes: ['id_grupo', 'cod_grupo', 'nome_grupo'] }
      ]
    });

    if (!professor) return res.status(404).json({ message: 'Пользователь не найден' });

    const { escola, grupo, ...profile } = professor.toJSON();
    const { nome_escola } = escola, { cod_grupo, nome_grupo } = grupo;

    res.json({ status: 'Success', profile: { ...profile, nome_escola, cod_grupo, nome_grupo } });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
}

// ###
// async function getViewUserActivity(req, res) {
//   const { id_professor } = req.user;

//   try {
//     const userActivity = await Atividades.findAll({
//       where: { id_professor },
//       include: [
//         { model: Professor, as: 'professores', attributes: ['nome_professor'] },
//         { model: Disciplina, as: 'disciplinas', attributes: ['nome_disciplina'] },
//         { model: Ano, as: 'anos', attributes: ['ano'] },
//         { model: Ensino, as: 'nivel_ensino', attributes: ['nome_ensino'] }
//       ]
//     });

//     res.json({ Status: 'Success', activity: userActivity });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// }




module.exports = { getProfileUser, getProfileOtherUser, getUserActivity, getUserResources, updateProfile };


