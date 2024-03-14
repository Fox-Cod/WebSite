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
const { authenticateToken, validateParamsAndToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware')


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

// Проверка ролей
router.get('/check-user-role', isAdmin, (req, res) => {
  res.json({ message: 'Пользователь является администратором', user: req.user });
});

router.get('/validation', validateParamsAndToken)

// router.post('/add-tool', dataController.postTools)
router.post('/add-tool', upload.single('icone'), dataController.postTools);
router.get('/view-tools', dataController.getTools)
router.get('/view-users', isAdmin, dataController.getProfileUsers)

// Активности
router.get('/activity', activityController.getAllActivity)
router.get('/view-activity/:activityId', activityController.getOneActivity)
router.post('/add-activity', authenticateToken, activityController.saveActivity)
router.post('/edit-activity/:activityId', authenticateToken, activityController.editActivity)

module.exports = router;
