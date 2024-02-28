const User = require('../models/Users');

module.exports = {
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
    const friends = [
      { name: 'Kya backend ne kaha', id: 14 },
      { name: 'Kya Frontend ne suna', id: 15 },
      { name: 'John Doe', id: 1 },
      { name: 'Test Doe', id: 2 },
      { name: 'Jane Smith', id: 3 },
      { name: 'Jhonny Doe', id: 4 },
      { name: 'Test Smith', id: 5 },
      { name: 'Ramesh Smith', id: 6 },
      { name: 'Rajendra Doe', id: 7 },
      { name: 'Test Gupta', id: 8 },
      { name: 'Surya', id: 9 },
      { name: 'Ravish', id: 10 },
      { name: 'Rahul', id: 11 },
      { name: 'Rajeev raja', id: 12 },
      { name: 'Ranjan', id: 13 },
    ];
    res.json(friends);
  },
};
