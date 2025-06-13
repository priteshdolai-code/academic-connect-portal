const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { isLoggedIn, isRole } = require('../middlewares/auth');

router.get('/dashboard/student', isLoggedIn, isRole('student'), dashboardController.studentDashboard);
router.get('/dashboard/teacher', isLoggedIn, isRole('teacher'), dashboardController.teacherDashboard);
router.get('/dashboard/admin', isLoggedIn, isRole('admin'), dashboardController.adminDashboard);

module.exports = router;
