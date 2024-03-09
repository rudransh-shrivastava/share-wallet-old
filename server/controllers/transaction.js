const Transaction = require('../models/Transactions');
const User = require('../models/Users');
const UNKNOWN_USER = 'Unknown User';
const SPLIT_TYPE = 'equal';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

// fetch all users and return a map of googleId to name
async function createUserMap() {
  const users = await User.find({}).catch((error) => {
    console.log(error);
    res.status(400).json({ error: 'Error fetching users' });
  });

  return users.reduce((map, user) => {
    map[user.googleId] = user.name;
    return map;
  }, {});
}

// create an object to push in the list of transactions
function createListEntry(
  transactionId,
  name,
  amount,
  owesMoney,
  description,
  time,
  createdBy
) {
  return {
    transactionId,
    name,
    amount,
    owesMoney,
    description,
    time,
    createdBy,
  };
}

// create a transaction object to push in the list of transactions
function createTransaction(data, participants, paidBy, googleId) {
  return new Transaction({
    description: data.description,
    totalAmount: data.amount,
    participants: participants,
    paidBy: paidBy,
    expenseTime: data.expenseTime,
    splitType: SPLIT_TYPE,
    createdBy: googleId,
  });
}

// create a new participant object to push in the list of participants
function createParticipant(user, paidBy, amount, expenseWith) {
  let amountPaid = 0;
  let amountOwes = 0;
  if (user === paidBy) {
    amountPaid = amount;
  } else {
    amountOwes = amount / expenseWith.length;
  }
  let amountOwed = 0;
  if (user === paidBy) {
    amountOwed = amount - amount / expenseWith.length;
  }
  return {
    user: user,
    amountPaid: amountPaid,
    amountOwes: amountOwes,
    amountOwed: amountOwed,
  };
}
module.exports = {
  deleteTransaction: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId;
      const transactionId = req.query.transactionId;

      Transaction.deleteOne({ _id: transactionId })
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ error: 'Error deleting transaction' });
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

      const participants = expenseWith.map((user) =>
        createParticipant(user, paidBy, data.amount, expenseWith)
      );

      const transaction = createTransaction(
        data,
        participants,
        paidBy,
        googleId
      );

      transaction
        .save()
        .then((transaction) => {
          res.json(transaction);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ error: 'Error creating transaction' });
        });
    });
  },
  listTransactions: function (req, res) {
    ensureAuthenticated(req, res, async function () {
      const googleId = req.user.googleId;
      let list = [];
      const userMap = await createUserMap();
      const transactions = await Transaction.find().catch((error) => {
        console.log(error);
        res.status(400).json({ error: 'Error fetching transactions' });
      });

      for (let txn of transactions) {
        const time = txn.createdAt;
        const transactionId = txn._id;
        const description = txn.description;
        const createdBy = userMap[txn.createdBy] || UNKNOWN_USER;

        if (txn.paidBy == googleId) {
          const owesMoney = true;
          for (let participant of txn.participants) {
            if (participant.user !== googleId) {
              const name = userMap[participant.user] || UNKNOWN_USER;
              const amount = participant.amountOwes;
              list.push(
                createListEntry(
                  transactionId,
                  name,
                  amount,
                  owesMoney,
                  description,
                  time,
                  createdBy
                )
              );
            }
          }
        } else {
          const owesMoney = false;
          const name = userMap[txn.paidBy] || UNKNOWN_USER;
          for (let participant of txn.participants) {
            if (participant.user === googleId) {
              const amount = participant.amountOwes;
              list.push(
                createListEntry(
                  transactionId,
                  name,
                  amount,
                  owesMoney,
                  description,
                  time,
                  createdBy
                )
              );
            }
          }
        }
      }
      res.json(list);
    });
  },
};
module.exports.createUserMap = createUserMap;
