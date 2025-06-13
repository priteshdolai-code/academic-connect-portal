const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { isLoggedIn } = require('../middlewares/auth');

// Teacher logs a meeting with a student
router.get('/meeting/new/:studentId', isLoggedIn, meetingController.getNewMeeting);
router.post('/meeting/new/:studentId', isLoggedIn, meetingController.postNewMeeting);

// View meetings (student, teacher, admin)
router.get('/meetings/:studentId', isLoggedIn, meetingController.getMeetings);

module.exports = router;
