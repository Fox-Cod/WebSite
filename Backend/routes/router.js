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
const upload = multer({ 
  storage: storage,

});


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

// Профиль пользувателя 'Profile'
router.get('/profile', authenticateToken, profileController.getProfileUser);
router.get('/view-activity-user', authenticateToken, profileController.getUserActivity)
router.get('/view-resources-user', authenticateToken, profileController.getUserResources)
router.post('/update-profile', authenticateToken, profileController.updateProfile)

// Просмотр профиля другого пользувателя
router.get('/view-profile/:userId', profileController.getProfileOtherUser);


// Команды пользувателя 'View other user profile'
router.get('/view-team-list', authenticateToken, teamController.showTeams)

// Команда 'Team'
router.get('/view-teams/:teamId', teamController.getTeamAndMembers)
router.post('/create-team', authenticateToken, teamController.createTeam)
router.post('/add-member-to-team/:teamId', teamController.addMemberToTeam)
router.post('/add-activity-team/:teamId', upload.single('file'), authenticateToken, teamController.addActivityTeam)

// Другое
router.get('/view-data', dataController.getSchoolAndGroupData)
router.get('/view-data-activity', dataController.getYearsLessonAndTeachingData)
router.post('/feedback', emailController.feedBack);
router.post('/send-email', emailController.sendEmail);
router.get('/token-validation/:token', authController.tokenValidation)
router.post('/reset-password/:token', authController.resetPassword)

// Робота с файлами 'Resources'
router.post('/upload', upload.single('file'), authenticateToken, dataController.postResourcesFiles)
router.get('/files', dataController.getResourcesFiles)
router.get('/files/:filename', dataController.downloadResourcesFiles);

// Инстурменты 'Tools'
router.post('/add-tool', upload.single('icone'), dataController.postTools);
router.get('/view-tools', dataController.getTools)

// Проверка ролей
router.get('/view-users', authenticateToken, dataController.getProfileUsers, (req, res) => {
  if (req.user.role === 'administrador') return res.json({ message: 'Добро пожаловать на страницу администратора!' });
    return res.status(403).json({ message: 'Доступ запрещен: Только администраторы имеют доступ' });
});

router.get('/user-info', authenticateToken, (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Не удалось получить информацию о пользователе' });
  res.json({ id: user.id, role: user.role });
});

// Активности
router.get('/activity', activityController.getAllActivity)
router.get('/view-activity/:activityId', activityController.getOneActivity)
router.post('/add-activity', authenticateToken, activityController.saveActivity)
router.post('/edit-activity/:activityId', authenticateToken, activityController.editActivity)

module.exports = router;
