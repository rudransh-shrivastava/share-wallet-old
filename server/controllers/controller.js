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
  createUser: function (req, res) {
    const { googleId, name, email } = req.body;
    // Check if a user with the provided googleID already exists
    User.find().then((users) => {
      const matchingUser = users.find((user) => user.googleId === googleId);
      if (matchingUser) {
        return res.status(401).json({ error: 'User already exists' });
      } else {
        // If the user doesn't exist, create a new user
        const newUser = new User({
          googleId,
          name,
          email,
        });
        return newUser
          .save()
          .then((user) => res.status(201).json(user))
          .catch((error) => res.status(400).json({ error: error.message }));
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
