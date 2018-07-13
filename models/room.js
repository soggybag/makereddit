const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoomSchema = new Schema({
  topic: { type: String, required: true },
});

module.exports = mongoose.model('Room', RoomSchema);
