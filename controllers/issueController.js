const Issue = require('../models/Issue');
const User = require('../models/User');

// Student - GET issue form
exports.getNewIssue = async (req, res) => {
  if (req.session.user.role !== 'student') return res.send('Access Denied');
  res.render('issues/new', { user: req.session.user });
};

// Student - POST issue
exports.postNewIssue = async (req, res) => {
  const { title, description } = req.body;
  const student = req.session.user._id;

  const studentData = await User.findById(student);
  if (!studentData.teacher) return res.send("No teacher assigned.");

  const issue = new Issue({
    title,
    description,
    student,
    teacher: studentData.teacher
  });

  await issue.save();
  res.redirect('/dashboard/student');
};

// Teacher - View issues from assigned students
exports.getTeacherIssues = async (req, res) => {
  if (req.session.user.role !== 'teacher') return res.send('Access Denied');

  const issues = await Issue.find({ teacher: req.session.user._id })
    .populate('student', 'username email');

  res.render('issues/list', { user: req.session.user, issues });
};
