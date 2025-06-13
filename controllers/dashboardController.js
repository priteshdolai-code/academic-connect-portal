const User = require('../models/User');

exports.studentDashboard = (req, res) => {
  res.render('dashboards/student', { user: req.session.user });
};

exports.teacherDashboard = async (req, res) => {
    const teacherId = req.session.user._id;
  
    // 🧲 Find students assigned to this teacher
    const assignedStudents = await User.find({ teacher: teacherId });
  
    res.render('dashboards/teacher', {
      user: req.session.user,
      students: assignedStudents
    });
  };

exports.adminDashboard = async (req, res) => {
  const users = await User.find();
  res.render('dashboards/admin', { user: req.session.user, users });
};
