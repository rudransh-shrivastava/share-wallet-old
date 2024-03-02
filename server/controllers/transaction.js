const Transaction = require('../models/Transactions');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

module.exports = {
  createTransaction: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the session
      const data = req.query;
      let expenseWith = data.expenseWith.split(',');
      expenseWith.push(googleId);
      const paidBy = data.paidBy === 'me' ? googleId : data.paidBy;
      const participants = expenseWith.map((user) => {
        let amountPaid = 0;
        let amountOwes = 0;
        if (user === paidBy) {
          amountPaid = data.amount;
        } else {
          amountOwes = data.amount / expenseWith.length;
        }
        let amountOwed = 0;
        if (user === paidBy) {
          amountOwed = data.amount - data.amount / expenseWith.length;
        }
        return {
          user: user,
          amountPaid: amountPaid,
          amountOwes: amountOwes,
          amountOwed: amountOwed,
        };
      });
      const newTransaction = new Transaction({
        description: data.description,
        totalAmount: data.amount,
        participants: participants,
        paidBy: paidBy,
        expenseTime: data.expenseTime,
        splitType: 'equal',
        createdBy: googleId,
      });
      newTransaction.save().then((transaction) => {
        res.json(transaction);
      });
    });
  },
  // TODO: Implement listTransactions controller logic
  listTransactions: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the sessions
      let transactionId = 0;
      let name = '';
      let amount = 0;
      let owesMoney = false;
      let time = 0;
      let list = [];
      Transaction.find().then((transactions) => {
        for (const txn of transactions) {
          time = txn.createdAt;
          transactionId = txn._id;
          if (txn.paidBy == googleId) {
            owesMoney = true;
            for (participant of txn.participants) {
              if (participant.user !== googleId) {
                name = participant.user;
                amount = participant.amountOwes;
                list.push({ transactionId, name, amount, owesMoney, time });
              }
            }
          } else {
            owesMoney = false;
            name = txn.paidBy;
            time = txn.createdAt;
            id = txn._id;
            for (const participant of txn.participants) {
              if (participant.user === googleId) {
                amount = participant.amountOwes;
                list.push({ transactionId, name, amount, owesMoney, time });
              }
            }
          }
        }
        res.json(list);
      });
      const txn = {
        id: transactionId,
        name: name,
        amount: amount,
        owesMoney: owesMoney,
        time: time,
      };
      console.log(txn);
    });
  },
};
