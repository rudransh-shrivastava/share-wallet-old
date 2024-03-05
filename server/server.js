if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const client_url = process.env.CLIENT_URL || 'http://localhost:5173';
console.log(client_url);
const dbConfig = require('./config/dbConfig');
const userRoutes = require('./routes/index');
const passport = require('passport');
const cookieSession = require('cookie-session');
const PassportSetup = require('./config/passport');
const session = require('express-session');

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto', sameSite: 'lax' },
  })
);

app.use(passport.initialize());
app.use(passport.session());

dbConfig.connect();

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://share-wallet.vercel.app',
      'https://rudransh.live',
      'https://share-wallet-1.onrender.com/',
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
