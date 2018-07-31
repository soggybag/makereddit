// =======================================================
// Dependancies

// -------------------------------------------------------
// NPM Dependancies

const express = require('express');

// -------------------------------------------------------
// Local Dependancies

const auth = require('./helpers/auth');
const Room = require('../models/room');
const posts = require('./posts');
const Post = require('../models/post');

// -----------------------------------------------------
// Define router

const router = express.Router();

router.use('/:roomId/posts', posts);

// -----------------------------------------------------
// Rooms index

router.get('/', (req, res) => {
  console.log('rooms/');
  console.time('room-time');
  Room.find({}, 'topic').then((rooms) => {
    console.log(rooms);
    res.render('rooms/index', { rooms });
    console.timeEnd('room-time');
  }).catch((err) => {
    console.log(err.message);
  });

  // Room.find({}, 'topic', function(err, rooms) {
  //   if(err) {
  //     console.error(err);
  //   } else {
  //     res.render('rooms/index', { rooms: rooms });
  //   }
  // });
});

// Rooms new
router.get('/new', auth.requireLogin, (req, res) => {
  res.render('rooms/new');
});

// Rooms show
router.get('/:id', auth.requireLogin, (req, res) => {
  // let room;
  // Room.findById(req.params.id).then((foundRoom) => {
  //   room = foundRoom;
  //   return Post.find({ room }).sort({ points: -1 }).populate('comments');
  // }).then((posts) => {
  //   res.render('rooms/show', { room, posts, roomId: req.params.id });
  // }).catch((err) => {
  //   console.log(err.message);
  // });

  let room;

  Room.findById(req.params.id).then((foundRoom) => {
    room = foundRoom;
    return Post.find({ room });
  }).then((posts) => {
    res.render('rooms/show', { room, posts, roomId: req.params.id });
  }).catch((err) => {
    console.log(err.message);
  });

  // Rooms show
  // Room.findById(req.params.id, function(err, room) {
  //   if(err) { console.error(err) };
  //
  //   //  Add the sorting action here
  //   Post.find({ room: room }).sort({ points: -1 }).populate('comments').exec(function (err, posts) {
  //     if (err) { console.error(err) };
  //
  //     res.render('rooms/show', { room: room, posts: posts, roomId: req.params.id });
  //   });
  // });
});

// Rooms edit
router.get('/:id/edit', auth.requireLogin, (req, res) => {
  Room.findById(req.params.id).then((room) => {
    res.render('rooms/edit', { room });
  }).catch((err) => {
    console.log(err.message);
  });

  // Room.findById(req.params.id, function(err, room) {
  //   if(err) { console.error(err) };
  //
  //   res.render('rooms/edit', { room: room });
  // });
});

// Rooms update
router.post('/:id', auth.requireLogin, (req, res) => {
  Room.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.redirect(`/rooms/${req.params.id}`);
  }).catch((err) => {
    console.log(err.message);
  });

  // Room.findByIdAndUpdate(req.params.id, req.body, function(err, room) {
  //   if(err) { console.error(err) };
  //
  //   res.redirect('/rooms/' + req.params.id);
  // });
});

// Rooms create
router.post('/', auth.requireLogin, (req, res) => {
  const room = new Room(req.body);

  room.save().then((room) => {
    return res.redirect('/rooms');
  }).catch((err) => {
    console.log(err.message);
  });

  // room.save((err, room) => {
  //   if(err) { console.error(err) };
  //
  //   return res.redirect('/rooms');
  // });
});

module.exports = router;
