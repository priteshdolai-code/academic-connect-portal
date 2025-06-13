const Meeting = require('../models/Meeting');
const User = require('../models/User');

// GET meeting form
exports.getNewMeeting = async (req, res) => {
  if (req.session.user.role !== 'teacher') return res.send("Access Denied");

  const student = await User.findById(req.params.studentId);
  res.render('meetings/new', { student, user: req.session.user });
};

// POST meeting form
exports.postNewMeeting = async (req, res) => {
  if (req.session.user.role !== 'teacher') return res.send("Access Denied");

  const { date, topic, notes } = req.body;
  const teacher = req.session.user._id;
  const student = req.params.studentId;

  await Meeting.create({ student, teacher, date, topic, notes });
  res.redirect('/meetings/' + student);
};

// GET meeting history
exports.getMeetings = async (req, res) => {
  const user = req.session.user;
  const studentId = req.params.studentId;

  // Students can only see their own meetings
  if (user.role === 'student' && user._id !== studentId) return res.send("Access Denied");

  const meetings = await Meeting.find({ student: studentId })
    .populate('teacher', 'fullName email')
    .sort({ date: -1 });

  const student = await User.findById(studentId);

  res.render('meetings/list', { meetings, student, user });
};
