const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const userProfileMiddleware = require('../middlewares/user-profile-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');

router.route('/students').get(userProfileMiddleware,adminMiddleware,adminController.getStudentsData);
router.route('/students-attendence').get(userProfileMiddleware,adminMiddleware,adminController.getStudentsAttendenceData);
router.route('/students-leave').get(userProfileMiddleware,adminMiddleware,adminController.getStudentsLeaveData);
router.route('/students/delete/:id').delete(userProfileMiddleware,adminMiddleware,adminController.deleteStudent);
router.route('/students/:id').get(userProfileMiddleware, adminMiddleware, adminController.getStudentById);
router.route('/students/update/:id').patch(userProfileMiddleware, adminMiddleware, adminController.updateStudent);


module.exports = router;