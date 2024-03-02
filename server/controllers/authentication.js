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
  callback: async function (req, res, next) {
    passport.authenticate('google', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login/failed');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        req.session.googleId = user.googleId;
        // Redirect to the success route
        return res.redirect('http://localhost:5173');
      });
    })(req, res, next);
  },
  logout: function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('http://localhost:5173');
    });
  },
  success: function (req, res) {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: 'successful',
        user: req.user,
        //cookies: req.cookies // requires cookie-parser middleware to use this, dont need it atm
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
