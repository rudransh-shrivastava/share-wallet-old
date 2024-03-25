if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3001;
const client_url = process.env.CLIENT_URL || 'http://localhost:3001';
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/index');
const passport = require('passport');
const path = require('path');
const databaseConfig = require('./config/database');
const sessionConfig = require('./config/session');
const corsConfig = require('./config/cors');
const passportConfig = require('./config/passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const { ensureAuthenticated } = require('./controllers/authentication');

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

sessionConfig(app);

app.use(passport.initialize());
app.use(passport.session());

databaseConfig.connect();

app.use(express.json());
corsConfig(app);

app.use(ensureAuthenticated);
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
