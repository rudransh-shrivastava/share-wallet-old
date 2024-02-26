const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        sharePercentage: {
          type: Number,
          required: true,
        },
        amountPaid: {
          type: Number,
          default: 0,
        },
        amountOwed: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transactions', transactionSchema);

module.exports = Transaction;
