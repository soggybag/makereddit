const express = require('express');
const auth = require('./helpers/auth');
const Room = require('../models/room');
const Post = require('../models/post');
const commentsRouter = require('./comments');

const router = express.Router({ mergeParams: true });

router.get('/new', auth.requireLogin, (req, res) => {
  Room.findById(req.params.roomId).then((room) => {
    res.render('posts/new', { room });
  }).catch((err) => {
    console.log(err.message);
  });

  // Room.findById(req.params.roomId, function(err, room) {
  //   if(err) { console.error(err) };
  //
  //   res.render('posts/new', { room: room });
  // });
});


router.post('/', auth.requireLogin, (req, res) => {
  let room;
  Room.findById(req.params.roomId).then((foundRoom) => {
    room = foundRoom;
    const post = new Post(req.body);
    post.room = room;
    return post.save();
  }).then((post) => {
    console.log(post);
    return res.redirect(`/rooms/${room._id}`);
  }).catch((err) => {
    console.log(err.message);
  });

  // Room.findById(req.params.roomId, function(err, room) {
  //   if(err) { console.error(err) };
  //
  //   let post = new Post(req.body);
  //   post.room = room;
  //
  //   post.save(function(err, post) {
  //     if(err) { console.error(err) };
  //
  //     return res.redirect(`/rooms/${room._id}`);
  //   });
  // });
});

router.post('/:id', auth.requireLogin, (req, res) => {
  Post.findById(req.params.id).then((post) => {
    post.points += parseInt(req.body.points, 10);
    return post.save();
  }).then((post) => {
    res.redirect(`/rooms/${post.room}`);
  }).catch((err) => {
    console.log(err.message);
  });

  // Post.findById(req.params.id, function(err, post) {
  //   post.points += parseInt(req.body.points);
  //
  //   post.save(function(err, post) {
  //     if(err) { console.error(err) };
  //
  //     return res.redirect(`/rooms/${post.room}`);
  //   });
  // });
});

router.use('/:postId/comments', commentsRouter);

module.exports = router;
