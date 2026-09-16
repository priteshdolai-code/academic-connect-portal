const User = require('../models/User');

// View profile
exports.viewProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('profile/view', { user: req.session.user, profileUser: user });
};

// For admin viewing a student's profile
exports.viewStudentProfile = async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student || student.role !== 'student') {
    return res.status(404).send('Student not found');
  }

  res.render('profiles/studentProfile', { user: req.session.user, student });
};

// For admin viewing a teacher's profile
exports.viewTeacherProfile = async (req, res) => {
  const teacher = await User.findById(req.params.id);
  if (!teacher || teacher.role !== 'teacher') {
    return res.status(404).send('Teacher not found');
  }

  res.render('profiles/teacherProfile', { user: req.session.user, teacher });
};

// Edit profile (only if student is editing own profile)
exports.editProfile = async (req, res) => {
  if (req.session.user._id !== req.params.id || req.session.user.role !== 'student') {
    return res.send('Access denied');
  }

  const user = await User.findById(req.params.id);
  res.render('profile/edit', { user });
};

// Update profile
exports.updateProfile = async (req, res) => {
    if (req.session.user._id !== req.params.id || req.session.user.role !== 'student') {
      return res.send('Access denied');
    }
  
    const { fullName, email, bio, marks, attendance, extracurriculars } = req.body;
  
    await User.findByIdAndUpdate(req.params.id, {
      fullName,
      email,
      bio,
      academic: {
        marks,
        attendance,
        extracurriculars
      }
    });
  
    res.redirect('/profile/' + req.params.id);
  };
  
// For showing assigned teacher/student on profile page

exports.viewProfile = async (req, res) => {
  const profileUser = await User.findById(req.params.id)
    .populate('teacher', 'username _id') // for students
    .lean();

  // If user is a teacher, fetch assigned students
  if (profileUser.role === 'teacher') {
    profileUser.students = await User.find({ teacher: profileUser._id }, 'username _id').lean();
  }

  res.render('profile/view', {
    user: req.session.user,
    profileUser
  });
};
