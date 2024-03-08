const User = require('../models/Users');
const Friend = require('../models/Friends');
const Transaction = require('../models/Transactions');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

// delete friends from the database
function deleteFriendPair(userId, friendId) {
  return Promise.all([
    Friend.deleteOne({ userId, friendId }),
    Friend.deleteOne({ userId: friendId, friendId: userId }),
  ]);
}

// create friends in the database
function createFriendPair(userId, friendId) {
  const newFriend = new Friend({ userId, friendId });
  const newFriendBack = new Friend({ userId: friendId, friendId: userId });

  return Promise.all([newFriend.save(), newFriendBack.save()]);
}

// calculate the total amount owed and the total amount owed to the user by all friends
function calculateTotal(transactions, googleId) {
  let owed = 0;
  let owes = 0;

  transactions.forEach((transaction) => {
    transaction.participants.forEach((participant) => {
      if (participant.user === googleId) {
        owes += participant.amountOwes;
        owed += participant.amountOwed;
      }
    });
  });

  return { total: owed - owes, owes, owed };
}

module.exports = {
  removeFriend: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId;
      const friendId = req.query.friendId;
      deleteFriendPair(googleId, friendId)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: 'An error occurred while deleting friend' });
        });
    });
  },
  addFriend: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId;
      const friendId = req.query.friendId;

      Friend.findOne({ userId: googleId, friendId: friendId })
        .then((existingFriend) => {
          if (existingFriend) {
            res.json({ message: 'Already friends' });
          } else {
            createFriendPair(googleId, friendId)
              .then((friend) => {
                res.json(friend);
              })
              .catch((error) => {
                console.error(error);
                res
                  .status(500)
                  .json({ error: 'An error occurred while adding friend' });
              });
          }
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: 'An error occurred while checking friend' });
        });
    });
  },
  getUsers: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId;

      User.find({}, 'name googleId')
        .then((users) => {
          res.json(users);
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: 'An error occurred while fetching users' });
        });
    });
  },
  getDetails: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId;

      User.find({ googleId: googleId })
        .then((user) => {
          res.json(user);
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: 'An error occurred while fetching user details' });
        });
    });
  },
  getTotal: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId;

      Transaction.find({ 'participants.user': googleId })
        .then((transactions) => {
          const { total, owes, owed } = calculateTotal(transactions, googleId);
          res.json({ total, owes, owed });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: 'An error occurred while fetching transactions' });
        });
    });
  },
  getFriends: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const currentUser = req.user.googleId;

      Friend.find()
        .then((users) => {
          const friends = users.filter((user) => user.userId == currentUser);
          const friendIds = friends.map((friend) => friend.friendId);

          User.find({ googleId: { $in: friendIds } }, 'name googleId')
            .then((users) => {
              res.json(users);
            })
            .catch((error) => {
              console.error(error);
              res
                .status(500)
                .json({ error: 'An error occurred while fetching friends' });
            });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: 'An error occurred while fetching friends' });
        });
    });
  },
};
