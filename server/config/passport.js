const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/Users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, callback) {
      User.find()
        .then((users) => {
          const currentUser = users.find(
            (user) => user.googleId === profile.id
          );
          if (currentUser) {
            return callback(null, currentUser);
          } else {
            return callback(null, profile);
          }
        })
        .catch((err) => {
          callback(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.find().then((users) => {
    for (const user of users) {
      if (user.id == id) {
        done(null, user);
      }
    }
  });
});
