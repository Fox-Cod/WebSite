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


// Token
const { authenticateToken } = require('../middleware/authMiddleware');

const dataController = require('../controllers/DataController');
const profileController = require('../controllers/ProfileController');
const activityController = require('../controllers/ActivityController');
const authController = require('../controllers/AuthController');
const teamController = require('../controllers/TeamController');
const emailController = require('../controllers/EmailController');

// Auth
router.post('/user/registration', authController.registration)
router.post('/user/login', authController.login);
router.post('/user/auth/google', authController.authGoogle)
router.get('/user/auth/check', authenticateToken, authController.check)

// Profile
router.get('/user/profile', authenticateToken, profileController.getProfileUser);
router.post('/user/update-profile', authenticateToken, profileController.updateProfile)

// View another user's profile
router.get('/user/profile-view/:userId', profileController.getProfileAndActivity);

// Team
router.get('/team/search-teams', teamController.searchTeams)
router.get('/team/view-teams/:teamId', authenticateToken, teamController.getTeamAndMembers)
router.post('/team/create-team', authenticateToken, teamController.createTeam)

router.post('/team/add-activity-team/:teamId', upload.single('file'), authenticateToken, teamController.addActivityTeam)
router.post('/update-activity-team', teamController.updateActivityTeam)
router.post('/team/delete-activity-team', teamController.deleteActivityTeam)

router.post('/join-team', authenticateToken, teamController.joinTeam)
router.post('/add-member-to-team/:teamId', teamController.addMemberToTeam)

router.put('/team/privacy/:teamId', teamController.privacy);

// Other
router.get('/get-all-data', dataController.getAllData)
router.post('/feedback', emailController.feedBack);

// Reset
router.post('/send-email', emailController.sendEmail);
router.get('/token-validation/:token', authController.tokenValidation)
router.post('/reset-password/:token', authController.resetPassword)

// Resources
router.post('/upload', upload.single('file'), authenticateToken, dataController.postResourcesFiles)
router.get('/resources', dataController.getAllResources)
router.get('/resources/:resourceId', dataController.getOneResource)
router.get('/files/:filename', dataController.downloadResourcesFiles);

// Tools
router.post('/add-tool', upload.single('icone'), dataController.postTools);
router.get('/view-tools', dataController.getTools)

// AdminPage
router.get('/getData', authenticateToken, dataController.getData, (req, res) => {
  if (req.user.role === 'administrador') return res.json({ message: 'Добро пожаловать на страницу администратора!' });
    return res.status(403).json({ message: 'Доступ запрещен: Только администраторы имеют доступ' });
});

router.post('/admin-add-note-bd', authenticateToken, dataController.postDataTable)

router.post('/admin-update-data-user/:idTeacher', authenticateToken, profileController.adminUpdateProfile)
router.post('/admin-delete-data-user/:idTeacher', authenticateToken, profileController.deleteUser)

// Activity
router.get('/activity', activityController.getAllActivity)
router.get('/view-activity/:activityId', activityController.getOneActivity)
router.post('/add-activity', authenticateToken, activityController.saveActivity)
router.post('/edit-activity/:activityId', authenticateToken, activityController.editActivity)
router.post('/delete-activity/:activityId', authenticateToken, activityController.deleteActivity)

router.post('/add-comment/:activityId', authenticateToken, activityController.addComment)
router.get('/comments/:activityId', authenticateToken, activityController.getComment)

module.exports = router;
