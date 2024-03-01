const { google } = require('googleapis');
const passport = require('passport');
const googleAuthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3001/auth/google/callback'
);

module.exports = {
  authorize: function (req, res, next) {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })(req, res, next);
  },
  googleAuthCallback: async function (req, res, next) {
    passport.authenticate('google', {
      successRedirect: 'http://localhost:5173',
      failureRedirect: '/login/failed',
    })(req, res, next);
  },
  googleLogout: function (req, res) {
    req.logout();
    res.redirect('/');
  },
  success: function (req, res) {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: 'successful',
        user: req.user,
        //cookies: req.cookies
      });
    }
  },
  failed: function (req, res) {
    res.status(401).json({
      success: false,
      message: 'failed',
    });
  },
};
