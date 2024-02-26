if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const port = 3001;
const Amount = require('./models/Amount');
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASS = process.env.DATABASE_PASS;
const mongoose = require('mongoose');

const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@share-wallet-cluster.mk5e7qu.mongodb.net/?retryWrites=true&w=majority&appName=share-wallet-cluster`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
