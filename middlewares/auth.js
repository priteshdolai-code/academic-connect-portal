exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login');
  };
  
  exports.isStudent = (req, res, next) => {
    if (req.session.user.role === 'student') return next();
    res.send('Access denied.');
  };
  
  exports.isTeacher = (req, res, next) => {
    if (req.session.user.role === 'teacher') return next();
    res.send('Access denied.');
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.session.user.role === 'admin') return next();
    res.send('Access denied.');
  };
  
  exports.isRole = (role) => {
    return (req, res, next) => {
      if (req.session.user && req.session.user.role === role) {
        return next();
      }
      res.status(403).send('Access Denied');
    };
  };
  