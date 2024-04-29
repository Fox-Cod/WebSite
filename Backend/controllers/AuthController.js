const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Users = require('../models/Users');

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ Message: 'Email e palavra-passe necessários' });
  }
  
  try {
    const teacher = await Users.findOne({ where: { email: email } });

    if (!teacher) {
      return res.status(401).json({ Message: 'Credenciais incorrectas' });
    }

    const passwordMatch = await bcrypt.compareSync(password, teacher.password);

    if (!passwordMatch) {
      return res.status(401).json({ Message: 'Credenciais incorrectas' });
    }

    const { idTeacher, role } = teacher;
    const token = jwt.sign({ idTeacher, role }, jwtSecretKey, { expiresIn: '7day' });

    res.cookie('token', token, { httpOnly: true, expiresIn: 604800000 });
    return res.json({ Status: 'Success', idTeacher, role });
  } catch (error) {
    console.error('Erro de consulta da base de dados:', error);
    return res.status(500).json({ Message: 'Erro interno do servidor' });
  }
}




async function registration(req, res) {
  try {
    const { name, email, password, group, school } = req.body;

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newProfessor = await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
      idGroup: group,
      idSchool: school,
      role: 'utilizador',
    });

    res.status(201).json({ success: true, professor: newProfessor });
  } catch (error) {
    console.error('Error creating professor:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};



async function tokenValidation(req, res) {
  try {
    const token = req.params.token;
    const user = await Users.findOne({ where: { resetToken: token } });

    if (!user) {
      return res.status(400).json({ message: 'Ссылка для сброса пароля недействительна или истекла' });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Произошла ошибка при сбросе пароля' });
  }
};


async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Пароли не совпадают' });
    }

    const user = await Users.findOne({ where: { resetToken: token } });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }
    
    res.clearCookie('token');
    
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = null; // Устанавливаем resetToken в null
    await user.save();

    console.log('Пароль пользователя успешно изменен');
    res.status(201).json({ success: true });  
  } catch (err) {
    console.error('Произошла ошибка при сбросе пароля:', err);
    res.status(500).json({ message: 'Произошла ошибка при сбросе пароля' });
  }
};






module.exports = { login, registration, tokenValidation, resetPassword };
