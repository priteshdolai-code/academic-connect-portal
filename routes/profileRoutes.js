const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

router.get('/profile', isLoggedIn, profileController.getProfile);
router.get('/profile/edit', isLoggedIn, profileController.editProfileForm);
router.post('/profile/edit', isLoggedIn, profileController.updateProfile);
router.get('/profile/delete', isLoggedIn, profileController.deleteProfile);

module.exports = router;
