const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // TODO: Other fields
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
