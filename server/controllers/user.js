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

module.exports = {
  removeFriend: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the session
      const friendId = req.query.friendId;
      Friend.deleteOne({ userId: googleId, friendId: friendId }).then(
        (result) => {
          Friend.deleteOne({ userId: friendId, friendId: googleId }).then(
            (result) => {
              res.json(result);
            }
          );
        }
      );
    });
  },
  addFriend: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the session
      const friendId = req.query.friendId;
      // Check if a document with the given userId and friendId already exists
      Friend.findOne({ userId: googleId, friendId: friendId }).then(
        (existingFriend) => {
          if (existingFriend) {
            // If the document exists, log "Already friends" and don't create a new document
            res.json({ message: 'Already friends' });
          } else {
            // If the document doesn't exist, create 2 new documents
            const newFriend = new Friend({
              userId: googleId,
              friendId: friendId,
            });
            newFriend.save().then((friend) => {
              const newFriendBack = new Friend({
                userId: friendId,
                friendId: googleId,
              });
              newFriendBack.save().then((friend) => {
                res.json(friend);
              });
            });
          }
        }
      );
    });
  },
  getUsers: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the session
      User.find({}, 'name googleId').then((users) => {
        res.json(users);
      });
    });
  },
  getDetails: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the session
      User.find({ googleId: googleId }).then((user) => {
        res.json(user);
      });
    });
  },
  getTotal: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the session
      const user = req.query.user;
      Transaction.find({ 'participants.user': googleId })
        .then((transactions) => {
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
          const total = owed - owes;
          res.json({ total, owes, owed });
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({ error: 'An error occurred while fetching transactions' });
        });
    });
  },
  getFriends: function (req, res) {
    ensureAuthenticated(req, res, function () {
      Friend.find().then((users) => {
        const currentUser = req.user.googleId;
        const friends = users.filter((user) => user.userId == currentUser);
        const friendIds = friends.map((friend) => friend.friendId);

        // Fetch the names of all friends
        User.find({ googleId: { $in: friendIds } }, 'name googleId').then(
          (users) => {
            res.json(users);
          }
        );
      });
    });
  },
};
