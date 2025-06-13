const Notice = require('../models/Notice');
const User = require('../models/User');

// GET form
exports.getNewNotice = (req, res) => {
  if (req.session.user.role !== 'admin') return res.send('Access Denied');
  res.render('notices/new', { user: req.session.user });
};

// POST notice
exports.postNewNotice = async (req, res) => {
  if (req.session.user.role !== 'admin') return res.send('Access Denied');

  const { title, message } = req.body;

  await Notice.create({
    title,
    message,
    createdBy: req.session.user._id
  });

  res.redirect('/notices');
};

// GET all notices
exports.getAllNotices = async (req, res) => {
  const notices = await Notice.find()
    .populate('createdBy', 'fullName role')
    .sort({ createdAt: -1 });

  res.render('notices/list', { user: req.session.user, notices });
};
