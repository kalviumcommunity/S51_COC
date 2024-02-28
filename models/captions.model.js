const mongoose = require('mongoose');

const captionSchema = new mongoose.Schema({
  CaptionID: String,
  UserAvatar: String,
  UserID: String,
  UserName: String,
  Caption: String,
  Tags: String
});

const Caption = mongoose.model('cocs', captionSchema);

module.exports = Caption;
