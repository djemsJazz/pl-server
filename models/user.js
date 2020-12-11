const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('User', userSchema);
