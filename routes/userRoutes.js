const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/auth');


// View profile (accessible by all roles)
router.get('/profile/:id', isLoggedIn, userController.viewProfile);

// // Admin can view any student or teacher profile
// router.get('/students/:id/profile', isLoggedIn, isAdmin, userController.viewStudentProfile);
// router.get('/teachers/:id/profile', isLoggedIn, isAdmin, userController.viewTeacherProfile);


// Edit profile (only by student themselves)
router.get('/profile/:id/edit', isLoggedIn, userController.editProfile);
router.post('/profile/:id/edit', isLoggedIn, userController.updateProfile);

module.exports = router;
