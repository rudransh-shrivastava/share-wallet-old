const User = require('../models/Users');
const Friend = require('../models/Friends');
module.exports = {
  getDetails: function (req, res) {
    const userId = req.body.userId;
    User.find().then((users) => {
      for (const user of users) {
        if (user.id == userId) {
          res.json(user);
        }
      }
    });
  },
  getTotal: function (req, res) {
    // TODO: Implement getTotal controller logic
    const user = req.query.user;

    const total = -18;
    const owes = 40;
    const owed = 22;
    res.json({ total, owes, owed });
  },
  getFriends: function (req, res) {
    // TODO: Implement getFriends controller logic
    Friend.find().then((users) => {
      const currentUser = req.body.currentUser;
      const friends = users.filter((user) => user.userId == currentUser);
      res.json(friends);
    });
  },
};
