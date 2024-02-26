if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const Amount = require('./models/Amount'); // TODO: Using this model temporarily
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASS = process.env.DATABASE_PASS;
const mongoose = require('mongoose');

const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@share-wallet-cluster.mk5e7qu.mongodb.net/amount-db?retryWrites=true&w=majority&appName=share-wallet-cluster`; // TODO: change db name

mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

// TODO: Temporary testing route
app.post('/submit', (req, res) => {
  console.log(req.body.amount);
  const amount = req.body.amount * 2;
  const newAmount = new Amount({ amount });

  newAmount.save();
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
