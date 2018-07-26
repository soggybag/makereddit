const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
// ------------------------------------------------------------
// configure sessions
const session = require('express-session');

// ------------------------------------------------------------
// Import Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rooms = require('./routes/rooms');

const Room = require('./models/room');

// ------------------------------------------------------------
// Create Express app
const app = express();

app.use(session({
  secret: 'secret-unique-code',
  cookie: {
    maxAge: 3600000,
  },
  resave: true,
  saveUninitialized: true,
}));

// ----------------------------------------------------------
// Database setup
const mongoURI = 'mongodb://ms-user:rkp-BzF-bKC-9rq@ds133041.mlab.com:33041/make-reddit';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ------------------------------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// ------------------------------------------------------
// Add Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ---------------------------------------------------------
// Routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', rooms); // Rooms route: localhost:3000/rooms

app.get('/api/rooms', (req, res) => {
  Room.find({}, 'topic').then((rooms) => {
    res.json(rooms);
  }).catch((err) => {
    console.log(err.message);
  });
})


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
