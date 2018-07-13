const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: { type: String, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
