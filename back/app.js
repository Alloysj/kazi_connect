var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');
var port = process.env.PORT || 5000;
// Route imports
var indexRouter = require('./routes/index');
const userRoutes = require('./routes/users');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/auth')

// Database and auth
const sequelize = require('./config/database');
const authMiddleware = require('./middleware/auth');

// Initialize app
var app = express();
require('dotenv').config();

// Session configuration
const store = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // Cleanup expired sessions every 15 minutes
  expiration: 24 * 60 * 60 * 1000 // Session expiration (24 hours)
});



// Sync session store
store.sync();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/public', express.static(path.join(__dirname, 'public')));
// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/auth', authRoutes);

// Database synchronization
sequelize.sync({ force: false })
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Database sync error:', err));

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;