const Users = require('../models/Users'); 
const Activitys = require('../models/Activitys'); 
const Subjects = require('../models/Subjects'); 
const Years = require('../models/Years'); 
const Educations = require('../models/Educations');

async function getAllActivity(req, res) {
  try {
    const allActivity = await Activitys.findAll({
      include: [
        { model: Users, as: 'users', attributes: ['idTeacher', 'name'] },
        { model: Subjects, as: 'subjects', attributes: ['idSubject', 'nameSubject'] },
        { model: Years, as: 'years', attributes: ['idYear', 'year'] },
        { model: Educations, as: 'educations', attributes: ['idEducation', 'nameEducation'] }
      ]
    });
    res.json(allActivity);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
}


async function getOneActivity(req, res) {
  const activityId = req.params.activityId;
  try {
    const oneActivity = await Activitys.findOne({where: { idActivity: activityId },
      include: [
        { model: Users, as: 'users', attributes: ['idTeacher', 'name'] },
        { model: Subjects, as: 'subjects', attributes: ['idSubject', 'nameSubject'] },
        { model: Years, as: 'years', attributes: ['idYear', 'year'] },
        { model: Educations, as: 'educations', attributes: ['idEducation', 'nameEducation'] }
      ]
    });
    res.json(oneActivity);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
}


async function saveActivity(req, res) {
  try {
    const { idTeacher } = req.userToken;
    const createActivity = await Activitys.create({ ...req.body, idTeacher });
    res.json(createActivity);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
}


async function editActivity(req, res) {
  const activityId = req.params.activityId;
  try {
    const activity = await Activitys.findByPk(activityId);
    if (!activity) return res.status(404).json({ message: 'Atividade não encontrada' });

    await activity.update(req.body);

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}




module.exports = { getAllActivity, getOneActivity, saveActivity, editActivity }
