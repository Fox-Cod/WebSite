const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

function authenticateToken(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Не авторизован: Требуется токен авторизации' });
    }

    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return res.status(402).json({ message: 'Ошибка: Неверный формат токена' });
        } else if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ message: 'Ошибка: Время действия токена истекло' });
        } else {
          return res.status(404).json({ message: 'Ошибка: Токен недействителен' });
        }
      }

      req.user = user;
      console.log("ID Пользователя: ", req.user);
      next();
    });
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    return res.status(500).json({ message: 'Ошибка сервера при аутентификации' });
  }
}


module.exports = { authenticateToken };
