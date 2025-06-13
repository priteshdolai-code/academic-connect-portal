const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isLoggedIn, isRole } = require('../middlewares/auth');

router.get('/search', isLoggedIn, async (req, res) => {
  const query = req.query.q;
  let results = [];
  if (query) {
    results = await User.find({
      role: 'student',
      $or: [
        { username: new RegExp(query, 'i') },
        { email: new RegExp(query, 'i') }
      ]
    });
  }
  res.render('search', { user: req.session.user, results, query });
});

module.exports = router;
