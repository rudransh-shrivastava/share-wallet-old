const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = function (app) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: 'auto', sameSite: 'lax' },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
      }),
    })
  );
};
