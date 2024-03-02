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
          type: String,
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
    paidBy: {
      type: String,
      required: true,
    },
    expenseTime: {
      type: Date,
      default: Date.now,
    },
    splitType: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transactions', transactionSchema);

module.exports = Transaction;
