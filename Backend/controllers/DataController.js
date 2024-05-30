const { Schools, Groups, Years, Educations, Subjects, Tools, Users, Resources } = require('../models/model')

const fs = require('fs');
const path = require('path');
const mimeTypes = require('mime-types');


async function getAllData(req, res) {
  try {
    const [teachers, schools, groups, years, educations, subjects] = await Promise.all([
      Users.findAll({
        include: [
          { model: Schools, as: 'schools', attributes: ['idSchool', 'nameSchool'] },
          { model: Groups, as: 'groups', attributes: ['idGroup', 'codGroup', 'nameGroup'] }
        ]
      }),
      Schools.findAll({ attributes: ['idSchool', 'nameSchool'] }),
      Groups.findAll({ attributes: ['idGroup', 'codGroup', 'nameGroup'] }),
      Years.findAll(),
      Educations.findAll(),
      Subjects.findAll()
    ]);

    res.json({
        teachers,
        schools,
        groups,
        years,
        educations,
        subjects
    });
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}


async function postTools(req, res) {
  try {
    const { title, link, about, application, type, state } = req.body;
    const tool = await Tools.create({ title, link, about, application, type, state });
    res.status(201).json({ success: true, ferramenta: tool });
  } catch (error) {
    res.status(500).json({ Message: 'Erro interno do servidor', error });
  }
}


async function getTools(req, res) {
  try {
    const ferramentas = await Tools.findAll();
    res.json(ferramentas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter ferramentas' });
  }
}

async function postResourcesFiles(req, res) {
  const { idTeacher } = req.userToken;
  const { title } = req.body;

  try {
    if (!req.file) {
      return res.status(400).send({ message: 'Nenhum arquivo enviado' });
    }

    const { originalname, path: tempPath, size } = req.file;
    const newFileName = originalname;
    const uploadPath = path.resolve(__dirname, `../uploads/${newFileName}`);
    fs.renameSync(tempPath, uploadPath);
    const fileExtension = path.extname(originalname);

    const uploadedFile = await Resources.create({
      title: title,
      idTeacher: idTeacher,
      fileName: newFileName,
      path: uploadPath,
      fileSize: size,
      fileType: mimeTypes.lookup(fileExtension),
      publishDate: new Date(),
    });

    res.status(200).send({ message: 'Arquivo enviado com sucesso', file: uploadedFile });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao enviar arquivo', error });
  }
}

async function getResourcesFiles(req, res) {
  try {
    const files = await Resources.findAll({
      include: [
        { model: Users, as: 'users', attributes: ['idTeacher', 'name'] },
      ]
    });
    res.status(200).send(files);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar arquivos', error });
  }
}

async function downloadResourcesFiles(req, res) {
  try {
    const filename = req.params.filename;
    const filePath = path.resolve(__dirname, `../uploads/${filename}`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send({ message: 'Arquivo não encontrado' });
    }

    const fileMime = mimeTypes.lookup(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', fileMime);
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao baixar arquivo', error });
  }
}

async function getData(req, res) {
  try {
    const [professors, anos, escolas, grupos, ensinos, disciplinas] = await Promise.all([
      Users.findAll({
        include: [
          { model: Schools, as: 'schools', attributes: ['idSchool', 'nameSchool'] },
          { model: Groups, as: 'groups', attributes: ['idGroup', 'codGroup', 'nameGroup'] }
        ]
      }),
      Years.findAll(),
      Schools.findAll(),
      Groups.findAll(),
      Educations.findAll(),
      Subjects.findAll()
    ]);

    return res.json({ professors, anos, escolas, grupos, ensinos, disciplinas, status: true });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' , error});
  }
}

async function addComment(req, res) {
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


module.exports = { getAllData, postTools, getTools, postResourcesFiles, getResourcesFiles, downloadResourcesFiles, getData };


