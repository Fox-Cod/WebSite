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
  const { title, description, link, type } = req.body;

  try {
    let newFileName = null;
    let uploadPath = null;
    let size = null;
    let fileType = null;

    if (req.file) {
      const { originalname, path: tempPath, size: fileSize } = req.file;
      newFileName = originalname;
      uploadPath = path.resolve(__dirname, `../uploads/${newFileName}`);
      fs.renameSync(tempPath, uploadPath);
      const fileExtension = path.extname(originalname);
      fileType = mimeTypes.lookup(fileExtension);
      size = fileSize;
    }

    const uploadedFile = await Resources.create({
      title: title || null,
      description: description || null,
      link: link || null,
      idTeacher: idTeacher || null,
      fileName: newFileName || null,
      path: uploadPath || null,
      fileSize: size || null,
      fileType: fileType || null,
      type: type || null,
      publishDate: new Date(),
    });

    res.status(200).send({ message: 'Arquivo enviado com sucesso', file: uploadedFile });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao enviar arquivo', error });
  }
}


async function getAllResources(req, res) {
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

async function getOneResource(req, res) {
  const resourceId = req.params.resourceId;
  
  try {
    const resource = await Resources.findOne({
      where: { idResource: resourceId },
      include: [
        { model: Users, as: 'users', attributes: ['idTeacher', 'name'] },
      ]
    });


    if (!resource) {
      return res.status(404).json({ error: 'Nenhuma atividade encontrada' });
    }
    res.json(resource);
  } catch (error) {
    console.error('Erro ao receber atividade:', error);
    res.status(500).send('Erro interno do servidor');
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

async function postDataTable(req, res) {
  const { selectedTable, formData } = req.body;

  try {
    let result;
    switch (selectedTable) {
      case '_Years':
        ex = await Years.findOne({ where: { year: formData.year }})
        if(ex) { return res.status(409).json({ Message: 'O ano já existe' }) }
        result = await Years.create({ year: formData.year });
        break;
      case '_Schools':
        ex = await Schools.findOne({ where: { nameSchool: formData.schoolName }})
        if(ex) { return res.status(409).json({ Message: 'A escola já existe' }) }
        result = await Schools.create({ nameSchool: formData.schoolName });
        break;
      case '_Educations':
        ex = await Educations.findOne({ where: { nameEducation: formData.educationLevel }})
        if(ex) { return res.status(409).json({ Message: 'O nível de escolaridade já existe' }) }
        result = await Educations.create({ nameEducation: formData.educationLevel });
        break;
      case '_Subjects':
        ex = await Subjects.findOne({ where: { nameSubject: formData.nameSubject }})
        if(ex) { return res.status(409).json({ Message: 'O assunto já existe' }) }
        result = await Subjects.create({ nameSubject: formData.nameSubject });
        break;
      case '_Groups':
        ex = await Groups.findOne({ where: { nameGroup: formData.nameGroup }})
        if(ex) { return res.status(409).json({ Message: 'Group already exists' }) }
        result = await Groups.create({ codGroup: formData.codGroup, nameGroup: formData.nameGroup });
        break;
      default:
        return res.status(400).json({ error: 'Nome de tabela inválido' });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Erro ao salvar dados' });
  }
}



module.exports = { getAllData, postTools, getTools, postResourcesFiles, getAllResources, downloadResourcesFiles, getData, getOneResource, postDataTable };


