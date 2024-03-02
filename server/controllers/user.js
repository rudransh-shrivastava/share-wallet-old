const User = require('../models/Users');
const Friend = require('../models/Friends');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

module.exports = {
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
            // If the document doesn't exist, create a new document
            const newFriend = new Friend({
              userId: googleId,
              friendId: friendId,
            });
            newFriend.save().then((friend) => {
              res.json(friend);
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
      User.find().then((users) => {
        for (const user of users) {
          if (user.id == googleId) {
            res.json(user);
          }
        }
      });
    });
  },
  getTotal: function (req, res) {
    // TODO: Implement getTotal controller logic
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the session
      const user = req.query.user;

      const total = -18;
      const owes = 40;
      const owed = 22;
      res.json({ total, owes, owed });
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
