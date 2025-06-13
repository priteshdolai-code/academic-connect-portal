const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const searchRoutes = require('./routes/searchRoutes');
const staticRoutes = require('./routes/staticRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const noticeRoutes = require('./routes/noticeRoutes');





const app = express();

// Connect DB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}));
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});



// Routes
app.use('/', authRoutes);
app.use('/', profileRoutes);
app.use('/', dashboardRoutes);
app.use('/', searchRoutes);
app.use('/', staticRoutes);
app.use('/', adminRoutes);
app.use('/', userRoutes);
app.use('/', issueRoutes);
app.use('/', meetingRoutes);
app.use('/', noticeRoutes);


app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Make session user available to all EJS templates


// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
