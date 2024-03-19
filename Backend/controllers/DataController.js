const Escola = require('../models/Escola');
const Grupo = require('../models/Grupo');
const Ano = require('../models/Ano');
const Ensino = require('../models/Ensino');
const Disciplina = require('../models/Disciplina');
const Ferramentos = require('../models/Ferramentos');
const Professor = require('../models/Professor');

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


module.exports = { getSchoolAndGroupData, getYearsLessonAndTeachingData, postTools, getTools, getProfileUsers };


