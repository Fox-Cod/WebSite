function checkRole(requiredRoles = []) {
    return (req, res, next) => {
      // Проверяем, имеет ли пользователь необходимые роли
      if (requiredRoles.length > 0 && !requiredRoles.some(role => req.user.role === role)) {
        return res.status(403).json({ Message: 'Forbidden: Недостаточно прав' });
      }
  
      next();
    };
  }
  
  module.exports = { checkRole };
  