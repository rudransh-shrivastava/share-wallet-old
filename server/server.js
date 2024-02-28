if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const dbConfig = require('./config/dbConfig');
const userRoutes = require('./routes/index');

dbConfig.connect();

app.use(express.json());
app.use(cors());

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
