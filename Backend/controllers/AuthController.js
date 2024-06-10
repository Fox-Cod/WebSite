const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const { Users } = require('../models/model')
const client = new OAuth2Client('41978584350-7q77ll8c23fktgf7ehes1piaq5q18jc5.apps.googleusercontent.com');

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

const generateJwt = (idTeacher, role) => {
  return jwt.sign(
      {idTeacher, role},
      jwtSecretKey,
      {expiresIn: '24h'}
  )
}

async function authGoogle(req, res) {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '41978584350-7q77ll8c23fktgf7ehes1piaq5q18jc5.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    const { name, email } = payload;

    // Дополнительно: Найдите или создайте пользователя в своей базе данных
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      // Создайте нового пользователя, если его нет в базе данных
      user = await Users.create({ name, email, role: 'utilizador' }); // Пример создания пользователя
    }

    const jwtToken = generateJwt(user.idTeacher, user.role);
    res.cookie('token', jwtToken, { httpOnly: true });

    res.json({ status: 'Success', userId: user.idTeacher, role: user.role });
  } catch (error) {
    console.error('Ошибка аутентификации через Google:', error);
    res.status(500).json({ message: 'Ошибка аутентификации через Google' });
  }
};


async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ Message: 'Email e palavra-passe necessários' });
  }

  try {
    const teacher = await Users.findOne({ where: { email: email } });
    if (!teacher) {
      return res.status(401).json({ Message: 'Correio eletrónico errado ou não existe' });
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password);
    if (!passwordMatch) {
      return res.status(401).json({ Message: 'Palavra-passe errada' });
    }

    console.log(teacher.idTeacher);

    const token = generateJwt(teacher.idTeacher, teacher.role);
    res.cookie('token', token, { httpOnly: true });
    return res.json({ Status: 'Success', idTeacher: teacher.idTeacher, role: teacher.role });
  } catch (error) {
    console.error('Erro de consulta da base de dados:', error);
    return res.status(500).json({ Message: 'Erro interno do servidor' });
  }
}


async function registration(req, res) {
  try {
    const { name, email, password, group, school } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newProfessor = await Users.create({ name: name, email: email, password: hashedPassword, idGroup: group, idSchool: school, role: 'utilizador', });
    res.status(201).json({ success: true, professor: newProfessor });
  } catch (error) {
    console.error('Erro ao criar um professor:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};



async function tokenValidation(req, res) {
  try {
    const token = req.params.token;
    const user = await Users.findOne({ where: { resetToken: token } });
    if (!user) { return res.status(400).json({ message: 'A ligação de reposição da palavra-passe é inválida ou expirou' }); }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ocorreu um erro ao repor a palavra-passe' });
  }
};


async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    const { password, confPassword } = req.body;
    console.log(password, confPassword)
    if (password !== confPassword) { return res.status(400).json({ message: 'As palavras-passe não coincidem' }); }
    const user = await Users.findOne({ where: { resetToken: token } });
    if (!user) { return res.status(400).json({ message: 'Utilizador não encontrado' }); }
    res.clearCookie('token');
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Ocorreu um erro ao repor a palavra-passe:', err);
    res.status(500).json({ message: 'Ocorreu um erro ao repor a palavra-passe' });
  }
};

async function check(req, res, next) {
  if (!req.userToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log(req.userToken)
  return res.json({ success: true, token: req.userToken });
}

module.exports = { authGoogle, login, registration, tokenValidation, resetPassword, check };
