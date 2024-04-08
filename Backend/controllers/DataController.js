const Escola = require('../models/Escola');
const Grupo = require('../models/Grupo');
const Ano = require('../models/Ano');
const Ensino = require('../models/Ensino');
const Disciplina = require('../models/Disciplina');
const Ferramentos = require('../models/Ferramentos');
const Professor = require('../models/Professor');
const Recursos = require('../models/Recursos');

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mimeTypes = require('mime-types');
const sharp = require('sharp');


async function getSchoolAndGroupData(req, res) {
  try {
    const [escolas, grupos] = await Promise.all([
      Escola.findAll({ attributes: ['id_escola', 'nome_escola'] }),
      Grupo.findAll({ attributes: ['id_grupo', 'cod_grupo', 'nome_grupo'] })
    ]);

    res.json({ Status: 'Success', data: { escolas, grupos } });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    return res.status(500).json({ Message: 'Internal Server Error' });
  }
}


async function getYearsLessonAndTeachingData(req, res) {
  try {
    const [anos, ensino, disciplinas] = await Promise.all([
      Ano.findAll(),
      Ensino.findAll(),
      Disciplina.findAll()
    ]);

    res.status(200).json({ anos, ensino, disciplinas });
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



async function postTools(req, res) {
  try {
    const { titulo, link, sobre, aplicacao, tipo, estado } = req.body;
    const iconeURL = req.file ? `http://localhost:8081/uploads/${req.file.filename}` : null;
    
    const tool = await Ferramentos.create({ titulo, link, sobre, aplicacao, tipo, estado, iconeURL });

    res.status(201).json({ success: true, ferramento: tool });
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    res.status(500).json({ Message: 'Internal Server Error' });
  }
}


async function getTools(req, res) {
  try {
    const ferramentos = await Ferramentos.findAll();
    res.json(ferramentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении инструментов' });
  }
};

async function getProfileUsers(req, res) {
  try {
    const users = await Professor.findAll({
      include: [
        { model: Escola, as: 'escola', attributes: ['id_escola', 'nome_escola'] },
        { model: Grupo, as: 'grupo', attributes: ['id_grupo', 'cod_grupo', 'nome_grupo'] }
      ]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



async function postResourcesFiles(req, res) {
  const { id_professor } = req.user;
  const { title } = req.body;

  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const { originalname, path: tempPath, size } = req.file;

    // Генерируем уникальное имя файла
    const newFileName = originalname;

    // Путь для сохранения файла
    const uploadPath = path.resolve(__dirname, `../uploads/${newFileName}`);

    // Перемещаем файл в папку uploads с оригинальным именем
    fs.renameSync(tempPath, uploadPath);

    // Определяем расширение файла
    const fileExtension = path.extname(originalname);

    // Сохраняем информацию о файле в базе данных
    const uploadedFile = await Recursos.create({
      title: title,
      id_professor: id_professor,
      filename: newFileName,
      path: uploadPath,
      fileSize: size, // Размер файла
      fileType: mimeTypes.lookup(fileExtension), // MIME-тип файла
      publishDate: new Date(), // Дата публикации файла
    });

    res.status(200).send({ message: 'File uploaded successfully', file: uploadedFile });
  } catch (error) {
    console.error('Error uploading file: ', error);
    res.status(500).send({ message: 'Error uploading file' });
  }
}

async function getResourcesFiles(req, res) {
  try {
    const files = await Recursos.findAll({
      include: [
        { model: Professor, as: 'professores', attributes: ['id_professor', 'nome_professor'] },
      ]
    });;

    // Динамически определить абсолютный путь к иконке файла на основе расширения файла
    files.forEach(file => {
      const fileExtension = path.extname(file.fileType);
      file.iconPath = path.join(__dirname, `../FrontEnd/public/assets/svg/brands/${fileExtension.substring(1)}.svg`); // Абсолютный путь к иконке файла на сервере
    });

    res.status(200).send(files);
  } catch (error) {
    console.error('Error fetching files: ', error);
    res.status(500).send({ message: 'Error fetching files' });
  }
};

async function downloadResourcesFiles(req, res) {
  try {
    const filename = req.params.filename;
    const filePath = path.resolve(__dirname, `../uploads/${filename}`);

    // Проверяем, существует ли файл
    if (!fs.existsSync(filePath)) {
      return res.status(404).send({ message: 'File not found' });
    }

    // Определяем MIME-тип файла
    const fileMime = mimeTypes.lookup(filePath);

    // Устанавливаем заголовки для скачивания файла
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', fileMime);

    // Отправляем файл клиенту
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error downloading file: ', error);
    res.status(500).send({ message: 'Error downloading file' });
  }
};




module.exports = { getSchoolAndGroupData, getYearsLessonAndTeachingData, postTools, getTools, getProfileUsers, postResourcesFiles, getResourcesFiles, downloadResourcesFiles };


