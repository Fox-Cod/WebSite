const Professor = require('../models/Professor'); 
const Atividades = require('../models/Atividades'); 
const Disciplina = require('../models/Disciplina'); 
const Ano = require('../models/Ano'); 
const Ensino = require('../models/Ensino');

async function getAllActivity(req, res) {
  try {
    const allAtividades = await Atividades.findAll({
      include: [
        { model: Professor, as: 'professores', attributes: ['id_professor', 'nome_professor'] },
        { model: Disciplina, as: 'disciplinas', attributes: ['id_disciplina', 'nome_disciplina'] },
        { model: Ano, as: 'anos', attributes: ['id_ano', 'ano'] },
        { model: Ensino, as: 'nivel_ensino', attributes: ['id_ensino', 'nome_ensino'] }
      ]
    });
    res.json(allAtividades);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


async function getOneActivity(req, res) {
  try {
    const activityId = req.params.activityId;
    const OneAtividades = await Atividades.findOne({
      where: { id: activityId },
      include: [
        { model: Professor, as: 'professores', attributes: ['id_professor', 'nome_professor'] },
        { model: Disciplina, as: 'disciplinas', attributes: ['id_disciplina', 'nome_disciplina'] },
        { model: Ano, as: 'anos', attributes: ['id_ano', 'ano'] },
        { model: Ensino, as: 'nivel_ensino', attributes: ['id_ensino', 'nome_ensino'] }
      ]
    });
    res.json({ Status: "Success", OneAtividades });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


async function saveActivity(req, res) {
  try {
    const { id_professor } = req.user;

    const createdAtividade = await Atividades.create({ ...req.body, id_professor });

    res.json({ Status: "Success", createdAtividade });
  } catch (error) {
    console.error('Error saving Atividade:', error);

    return res.status(500).json({
      success: false,
      message: 'Error saving Atividade',
      error: error.message,
    });
  }
}


async function editActivity(req, res) {
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




module.exports = { getAllActivity, getOneActivity, saveActivity, editActivity }
