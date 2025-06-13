const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const { isLoggedIn } = require('../middlewares/auth');

// Admin creates notice
router.get('/notice/new', isLoggedIn, noticeController.getNewNotice);
router.post('/notice/new', isLoggedIn, noticeController.postNewNotice);

// View all notices (for all roles)
router.get('/notices', isLoggedIn, noticeController.getAllNotices);

module.exports = router;
