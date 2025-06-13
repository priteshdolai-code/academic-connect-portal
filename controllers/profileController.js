const User = require('../models/User');

// GET profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('profile', { user });
};

// GET edit profile form
exports.editProfileForm = async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('editProfile', { user });
};

// POST update profile
exports.updateProfile = async (req, res) => {
  const { fullName, email, bio } = req.body;
  await User.findByIdAndUpdate(req.session.user._id, { fullName, email, bio });
  res.redirect('/profile');
};

// GET delete profile (with confirmation step)
exports.deleteProfile = async (req, res) => {
  await User.findByIdAndDelete(req.session.user._id);
  req.session.destroy(() => {
    res.redirect('/register');
  });
};
