const User = require('../models/User');

// GET assign page
exports.getAssignPage = async (req, res) => {
  const students = await User.find({ role: 'student' });
  const teachers = await User.find({ role: 'teacher' });
  res.render('admin/assign', { students, teachers, user: req.session.user });
};

// POST assign teacher to student
exports.assignTeacherToStudent = async (req, res) => {
  const { studentId, teacherId } = req.body;

  try {
    await User.findByIdAndUpdate(studentId, { teacher: teacherId });
    res.redirect('/admin/assign');
  } catch (err) {
    res.status(500).send('Assignment failed');
  }
};
