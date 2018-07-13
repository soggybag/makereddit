const express = require('express');
const auth = require('./helpers/auth');
const Room = require('../models/room');
const Post = require('../models/post');
const Comment = require('../models/comment');

const router = express.Router({ mergeParams: true });

// Comments new
router.get('/new', auth.requireLogin, (req, res) => {
  let room;
  Room.findById(req.params.roomId).then((foundRoom) => {
    room = foundRoom;
    return Post.findById(req.params.postId);
  }).then((post) => {
    res.render('comments/new', { post, room });
  }).catch((err) => {
    console.log(err.message);
  });


  // Room.findById(req.params.roomId, function(err, room) {
  //   if(err) { console.error(err) };
  //
  //   Post.findById(req.params.postId, function(err, post) {
  //     if(err) { console.error(err) };
  //
  //     res.render('comments/new', { post: post, room: room });
  //   });
  // })
});

router.post('/', auth.requireLogin, (req, res) => {
  let room;
  let comment;
  Room.findById(req.params.roomId).then((foundRoom) => {
    room = foundRoom;
    return Post.findById(req.params.postId);
  }).then((post) => {
    comment = new Comment(req.body);
    post.comments.unshift(comment);
    return post.save();
  }).then((post) => {
    return comment.save();
  }).then((comment) => {
    return res.redirect(`/rooms/${room._id}`);
  }).catch((err) => {
    console.log(err.message);
  });

  // Room.findById(req.params.roomId, function(err, room) {
  //   if(err) { console.error(err) };
  //
  //   Post.findById(req.params.postId, function(err, post) {
  //     if(err) { console.error(err) };
  //
  //     let comment = new Comment(req.body);
  //     post.comments.unshift(comment);
  //
  //     post.save(function(err, post) {
  //       if(err) { console.error(err) };
  //
  //       comment.save(function(err, comment) {
  //         if(err) { console.error(err) };
  //
  //         return res.redirect(`/rooms/${room.id}`);
  //       });
  //     });
  //   });
  // });
});

module.exports = router;
