const User = require('../models/Users');
const Friend = require('../models/Friends');

function ensureAuthenticated(req, res, next) {
  console.log('ensureAuthenticated: ', req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

module.exports = {
  getDetails: function (req, res) {
    ensureAuthenticated(req, res, function () {
      console.log('getDetails: ', req.isAuthenticated());
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
    // TODO: Instead of making a separate request for each friend to get their details, Modify /user/friends endpoint to return all the necessary details in one request.
    ensureAuthenticated(req, res, function () {
      Friend.find().then((users) => {
        const currentUser = req.user.googleId;
        const friends = users.filter((user) => user.userId == currentUser);
        console.log(friends);
        res.json(friends);
      });
    });
  },
};
