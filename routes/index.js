// ========================================================
// Dependancies
// ========================================================

// --------------------------------------------------------
// NPM Dependancies

const express = require('express');

// --------------------------------------------------------
// Local Dependancies

const User = require('../models/user');

// --------------------------------------------------------
// Define router

const router = express.Router();

// set layout variables

router.use((req, res, next) => {
  res.locals.title = 'MakeReddit';
  res.locals.currentUserId = req.session.userId;
  next();
});

// --------------------------------------------------------
// home page

router.get('/', (req, res) => {
  res.render('index');
});

// --------------------------------------------------------
// login

router.get('/login', (req, res) => {
  res.render('login');
});

// --------------------------------------------------------
// POST login

router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const nextError = new Error('Username or password incorrect');
      nextError.status = 401;
      return next(nextError);
    }

    req.session.userId = user._id;
    return res.redirect('/');
  });
});

// --------------------------------------------------------
// logout

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
      return next();
    });
  }

  return res.redirect('/login');
});

module.exports = router;
