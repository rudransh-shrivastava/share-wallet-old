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
            // If the user doesn't exist, create a new user
            const newUser = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            });
            return newUser.save().then((newUser) => {
              callback(null, newUser);
            });
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
  // Here you should find the user by id in your database
  // For now, let's just pass the id
  done(null, id);
});
