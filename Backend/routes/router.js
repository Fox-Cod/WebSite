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
router.post('/registration', authController.registration)
router.post('/user/login', authController.login);
router.get('/user/auth', authenticateToken, authController.check)

// Профиль пользувателя 'Profile'
router.get('/user/profile', authenticateToken, profileController.getProfileUser);
router.post('/update-profile', authenticateToken, profileController.updateProfile)

// Просмотр профиля другого пользувателя
router.get('/user-profile-and-activity/:userId', profileController.getProfileAndActivity);


// Команды пользувателя 'View other user profile'
router.get('/search-teams', teamController.searchTeams)

router.get('/team/view-teams/:teamId', authenticateToken, teamController.getTeamAndMembers)
// Команда 'Team'
router.post('/update-activity-team', teamController.updateActivityTeam)
router.put('/team/:id/privacy', teamController.privacy);
router.post('/join-team', authenticateToken, teamController.joinTeam)
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
router.get('/getData', authenticateToken, dataController.getData, (req, res) => {
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
