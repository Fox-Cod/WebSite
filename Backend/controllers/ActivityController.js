const { Users, Activitys, Subjects, Years, Educations, Comments } = require('../models/model')

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
    const activity = await Activitys.findOne({
      where: { idActivity: activityId },
      include: [
        { model: Users, as: 'users', attributes: ['idTeacher', 'name'] },
        { model: Subjects, as: 'subjects', attributes: ['idSubject', 'nameSubject'] },
        { model: Years, as: 'years', attributes: ['idYear', 'year'] },
        { model: Educations, as: 'educations', attributes: ['idEducation', 'nameEducation'] }
      ]
    });


    if (!activity) {
      return res.status(404).json({ error: 'Nenhuma atividade encontrada' });
    }
    res.json(activity);
  } catch (error) {
    console.error('Erro ao receber atividade:', error);
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

async function deleteActivity(req, res) {
  const activityId = req.params.activityId;
  try {
    const activity = await Activitys.findByPk(activityId);
    if (!activity) return res.status(404).json({ message: 'Atividade não encontrada' });

    await activity.destroy();

    res.status(200).json({ message: 'Atividade deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function addComment(req, res) {
  const activityId  = req.params.activityId;
  const { idTeacher } = req.userToken;
  const { content } = req.body;

  console.log(content, activityId)
  try {
    const activity = await Activitys.findByPk(activityId);
    if (!activity) return res.status(404).json({ message: 'Atividade não encontrada' });

    const newComment = await Comments.create({
      idActivity: activityId,
      idTeacher: idTeacher,
      content: content,
    });

    res.status(200).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function getComment(req, res) {
  const activityId = req.params.activityId;
  
  try {
    const comment = await Comments.findAll({
      where: { idActivity: activityId },
      include: { model: Users, as: 'users', attributes: ['idTeacher', 'name'] } });

    if (!comment) {
      return res.status(404).json({ error: 'Nenhuma atividade encontrada' });
    }

    res.json(comment);
  } catch (error) {
    console.error('Erro ao receber atividade:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

module.exports = { getAllActivity, getOneActivity, saveActivity, editActivity, deleteActivity, addComment, getComment }
