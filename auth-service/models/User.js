const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // isOk: {
  //   type: Boolean,
  //   default: false,
  //   required: true,
  // },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
