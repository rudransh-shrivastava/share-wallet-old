if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASS = process.env.DATABASE_PASS;
const mongoose = require('mongoose');
const User = require('./models/Users');
const Friend = require('./models/Friends');
const Transaction = require('./models/Transactions');

const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@share-wallet-cluster.mk5e7qu.mongodb.net/share-wallet-db?retryWrites=true&w=majority&appName=share-wallet-cluster`;

mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

// adds a new user to the database but returns an error if the user already exists
app.post('/CreateUser', (req, res) => {
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
});

// get user details: the total, what user owes, and what others owe to the user
// TODO: Calculate the values
app.get('/total', (req, res) => {
  const user = req.query.user;
  const total = -18;
  const owes = 40;
  const owed = 22;
  res.json({ total, owes, owed });
});

// get user's friends list
// TODO: Calculate the actual friends
app.get('/friends', (req, res) => {
  const user = req.query.user;
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
});

// TODO: Fetch the user details and then calculate the total, what user owes, and what others owe to the user
// function fetchUserTotal(user){

// }

// TODO: Register on google cloud console and get the client id and secret
// app.get(
//   '/login/google',
//   passport.authenticate('google', {
//     scope: ['email'],
//   })
// );

// NOTE: Temporary testing route
app.post('/submit', (req, res) => {
  console.log('Submitted');
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
