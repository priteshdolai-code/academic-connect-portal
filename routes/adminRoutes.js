const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isLoggedIn, isRole } = require('../middlewares/auth');

router.get('/admin/assign', isLoggedIn, isRole('admin'), adminController.getAssignPage);
router.post('/admin/assign', isLoggedIn, isRole('admin'), adminController.assignTeacherToStudent);

module.exports = router;
