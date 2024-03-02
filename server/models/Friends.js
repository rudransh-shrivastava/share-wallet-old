const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    friendId: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model('Friends', friendSchema);
module.exports = Friend;
