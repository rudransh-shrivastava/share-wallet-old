const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
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

const Amount = mongoose.model('Users', UsersSchema);

module.exports = Amount;
