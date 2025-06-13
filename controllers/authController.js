const User = require('../models/User');

// GET register
exports.getRegister = (req, res) => {
  res.render('register');
};

// POST register
exports.postRegister = async (req, res) => {
  const { username, password, role } = req.body;

  // Validation check
  if (!username || !password || !role) {
    return res.send("All fields are required.");
  }

  try {
    const user = new User({ username, password, role });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.send("Error registering user.");
  }
};

// GET login
exports.getLogin = (req, res) => {
  res.render('login');
};

// POST login
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.user = user;
    // Redirect based on role
if (user.role === 'student') return res.redirect('/dashboard/student');
if (user.role === 'teacher') return res.redirect('/dashboard/teacher');
if (user.role === 'admin') return res.redirect('/dashboard/admin');

    //res.redirect('/home');
  } else {
    res.send('Invalid credentials');
  }
};

// GET logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
