const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
const upload = multer({ storage: storage });

// Токен & Проверка авторизаций
const { authenticateToken } = require('../middleware/authMiddleware');


const dataController = require('../controllers/DataController');
const profileController = require('../controllers/ProfileController');
const activityController = require('../controllers/ActivityController');
const authController = require('../controllers/AuthController');
const teamController = require('../controllers/TeamController');
const emailController = require('../controllers/EmailController');

// Логин & Регистрация
router.post('/login', authController.login);
router.post('/registration', authController.registration)

// Профиль
router.get('/profile', authenticateToken, profileController.getProfileUser);
router.get('/view-profile/:userId', profileController.getProfileOtherUser);
router.get('/view-activity-user', authenticateToken, profileController.getUserActivity)
router.post('/update-profile', authenticateToken, profileController.updateProfile)

// Команда
router.get('/view-team-list', authenticateToken, teamController.showTeams)
router.get('/view-teams/:teamId', teamController.getTeamAndMembers)
router.post('/create-team', authenticateToken, teamController.createTeam)
router.post('/add-member-to-team/:teamId', teamController.addMemberToTeam)
router.post('/add-activity-team/:teamId', authenticateToken, teamController.postActivityTeam)

// Другое
router.get('/view-data', dataController.getSchoolAndGroupData)
router.get('/view-data-activity', dataController.getYearsLessonAndTeachingData)
router.post('/send-email', emailController.sendEmail);
router.get('/token-validation/:token', authController.tokenValidation)
router.post('/reset-password/:token', authController.resetPassword)


// router.post('/add-tool', dataController.postTools)
router.post('/add-tool', upload.single('icone'), dataController.postTools);
router.get('/view-tools', dataController.getTools)


router.get('/view-users', authenticateToken, dataController.getProfileUsers, (req, res) => {
  if (req.user.role === 'administrador') {
    res.json({ message: 'Добро пожаловать на страницу администратора!' });
  } else {
    res.status(403).json({ message: 'Доступ запрещен: Только администраторы имеют доступ' });
  }
});

router.get('/user-info', authenticateToken, (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Не удалось получить информацию о пользователе' });
  }
  res.json({ id: user.id, role: user.role });
});

// Активности
router.get('/activity', activityController.getAllActivity)
router.get('/view-activity/:activityId', activityController.getOneActivity)
router.post('/add-activity', authenticateToken, activityController.saveActivity)
router.post('/edit-activity/:activityId', authenticateToken, activityController.editActivity)

module.exports = router;
