if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const client_url = process.env.CLIENT_URL || 'http://localhost:3001';
const server_url = process.env.SERVER_URL || 'http://localhost:3001';
console.log(client_url, server_url);
const { google } = require('googleapis');
const passport = require('passport');
const googleAuthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${server_url}/auth/google/callback`
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

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
        return res.redirect(`${client_url}`);
      });
    })(req, res, next);
  },
  logout: function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect(`${client_url}`);
    });
  },
  success: function (req, res) {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: 'successful',
        user: req.user,
      });
    }
  },
  failed: function (req, res) {
    res.status(401).json({
      success: false,
      message: 'failed',
    });
  },
  ensureAuthenticated: ensureAuthenticated,
};
