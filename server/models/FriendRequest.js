const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema(
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
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FriendRequest = mongoose.model('FriendRequests', friendRequestSchema);
module.exports = FriendRequest;
