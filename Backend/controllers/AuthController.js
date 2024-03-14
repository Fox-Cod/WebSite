const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Professor = require('../models/Professor');

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ Message: 'Bad Request: Необходимы email и password' });
  }
  
  try {
    const professor = await Professor.findOne({ where: { email_professor: email } });

    if (professor) {
      const hashedPassword = professor.password_professor;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        const { id_professor, role } = professor;

        const token = jwt.sign({ id_professor, role }, jwtSecretKey, { expiresIn: '7day' });

        // Сохранение токена в куки
        res.cookie('token', token, { httpOnly: true, expiresIn: 604800000 }); // 604800000 миллисекунд = 7 дней
        return res.json({ Status: 'Success', id_professor, role });
      } else {
        return res.status(401).json({ Message: 'Unauthorized: Неверные учетные данные' });
      }
    } else {
      return res.status(401).json({ Message: 'Unauthorized: Неверные учетные данные' });
    }
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    return res.status(500).json({ Message: 'Internal Server Error' });
  }
}


async function registration(req, res) {
  try {
    const { name, email, password, group, escola } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = 'utilizador';

    const newProfessor = await Professor.create({
      nome_professor: name,
      email_professor: email,
      password_professor: hashedPassword,
      id_grupo: group,
      id_escola: escola,
      role: role,
    });

    res.status(201).json({ success: true, professor: newProfessor });
  } catch (error) {
    console.error('Error creating professor:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


async function tokenValidation(req, res) {
  try {
    const token = req.params.token;
    const user = await Professor.findOne({ where: { resetToken: token, resetTokenExpires: { $gt: Date.now() } } });

    if (!user) {
      return res.status(400).json({ message: 'Ссылка для сброса пароля недействительна или истекла' });
    }
    
    res.json({ success: true })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Произошла ошибка при сбросе пароля' });
  }
};

async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Пароли не совпадают' });
    }

    // Поиск пользователя по токену
    const user = await Professor.findOne({ where: { resetToken: token, resetTokenExpires: { $gt: Date.now() } } });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }
    
    res.clearCookie('token');
    // Хеширование нового пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Удаление старого пароля
    user.password_professor = hashedPassword;
    await user.save();

    console.log('Пароль пользователя успешно изменен');
    res.status(201).json({ success: true });  
  } catch (err) {
    console.error('Произошла ошибка при сбросе пароля:', err);
    res.status(500).json({ message: 'Произошла ошибка при сбросе пароля' });
  }
};




module.exports = { login, registration, tokenValidation, resetPassword };
