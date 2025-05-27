const express = require('express');
const router = express.Router();
const useDashboardController = require('../controllers/user-dashboard-controller');
const userProfileMiddleware = require('../middlewares/user-profile-middleware');


router.get('/dashboard',userProfileMiddleware, useDashboardController.dashboard);
router.post('/mark-attendance', useDashboardController.markAttendance);
router.post('/mark-leave',userProfileMiddleware, useDashboardController.markLeave); 
router.get('/view-attendance', userProfileMiddleware, useDashboardController.viewAttendance);
router.get('/edit-profile', userProfileMiddleware, useDashboardController.editProfile);

module.exports = router;

