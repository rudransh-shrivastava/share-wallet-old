require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const Amount = require('../models/Amount');
const password = process.env.MONGODB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://rudransh:${password}@share-wallet-cluster.mk5e7qu.mongodb.net/?retryWrites=true&w=majority&appName=share-wallet-cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
