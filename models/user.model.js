const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
