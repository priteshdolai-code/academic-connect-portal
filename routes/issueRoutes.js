const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const { isLoggedIn } = require('../middlewares/auth');

// Student raises an issue
router.get('/issue/new', isLoggedIn, issueController.getNewIssue);
router.post('/issue/new', isLoggedIn, issueController.postNewIssue);

// Teacher views all issues raised by assigned students
router.get('/issues', isLoggedIn, issueController.getTeacherIssues);

module.exports = router;
