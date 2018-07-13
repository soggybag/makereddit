const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  subject: String,
  body: String,
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  points: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);
