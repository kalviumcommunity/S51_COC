const mongoose = require('mongoose');

const captionSchema = new mongoose.Schema({
  captionID: Number,
  userAvatar: String,
  userID: Number,
  userName: String,
  caption: String,
  tags: String
});

const Caption = mongoose.model('cocs', captionSchema);

module.exports = Caption;
