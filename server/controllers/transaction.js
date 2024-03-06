const Transaction = require('../models/Transactions');
const User = require('../models/Users');
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

module.exports = {
  deleteTransaction: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId;
      const transactionId = req.query.transactionId;
      console.log(transactionId);
      Transaction.deleteOne({ _id: transactionId }).then((result) => {
        res.json(result);
      });
    });
  },
  createTransaction: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId;
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
  listTransactions: function (req, res) {
    ensureAuthenticated(req, res, async function () {
      const googleId = req.user.googleId;
      let transactionId = 0;
      let name = '';
      let amount = 0;
      let owesMoney = false;
      let time = 0;
      let list = [];
      let description = '';

      // Fetch all users and map them by googleId
      const users = await User.find({});
      const userMap = users.reduce((map, user) => {
        map[user.googleId] = user.name;
        return map;
      }, {});

      Transaction.find().then(async (transactions) => {
        for (const txn of transactions) {
          time = txn.createdAt;
          transactionId = txn._id;
          description = txn.description;
          if (txn.paidBy == googleId) {
            owesMoney = true;
            for (participant of txn.participants) {
              if (participant.user !== googleId) {
                name = userMap[participant.user] || 'Unknown User';
                amount = participant.amountOwes;
                list.push({
                  transactionId,
                  name,
                  amount,
                  owesMoney,
                  description,
                  time,
                });
              }
            }
          } else {
            owesMoney = false;
            name = userMap[txn.paidBy] || 'Unknown User';
            for (const participant of txn.participants) {
              if (participant.user === googleId) {
                amount = participant.amountOwes;
                list.push({
                  transactionId,
                  name,
                  amount,
                  owesMoney,
                  description,
                  time,
                });
              }
            }
          }
        }
        res.json(list);
      });
    });
  },
};
