const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

function isAdmin(req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован: Требуется токен авторизации' });
    }
  
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Доступ запрещен: Неверный токен или время его действия истекло' });
      }
      
      if (decoded.role === 'administrador') { 
        req.user = decoded;
        next();
      } else {
        return res.status(403).json({ message: 'Доступ запрещен: Только администраторы имеют доступ' });
      }
    });
}


module.exports = { isAdmin };
