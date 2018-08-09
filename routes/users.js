const express = require('express');
const auth = require('./helpers/auth');

const router = express.Router();
const User = require('../models/user');

// Users index
router.get('/', (req, res) => {
  // User.find({}, 'username').then((users) => {
  //   res.render('users/index', { users });
  // }).catch((err) => {
  //   console.log(err.message);
  // });

  // User.find({}, 'username').then().catch()
  User.find({}, 'username').then((users) => {
    res.render('users/index', { users });
  }).catch((err) => {
    console.error(err);
  });

  // User.find({}, 'username', (err, users) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     res.render('users/index', { users });
  //   }
  // });
});

// Users new
router.get('/new', (req, res) => {
  res.render('users/new');
});

// Users create
router.post('/', (req, res) => {
  const user = new User(req.body);
  user.save().then((user) => {
    return res.redirect('/users/welcome');
  }).catch((err) => {
    console.log(err.message);
  });

  // user.save((err) => {
  //   if (err) console.log(err);
  //   return res.redirect('/users');
  // });
});

router.get('/welcome', (req, res) => {
  res.render('users/welcome');
})

module.exports = router;
