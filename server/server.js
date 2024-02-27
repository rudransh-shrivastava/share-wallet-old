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

// get user details: the total, what user owes, and what others owe to the user
// TODO: Calculate the values
app.get('/total', (req, res) => {
  const user = req.query.user;
  const total = -18;
  const owes = 40;
  const owed = 22;
  console.log('From the backend: ' + user);
  res.json({ total, owes, owed });
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
