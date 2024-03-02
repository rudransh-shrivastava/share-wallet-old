const Transaction = require('../models/Transactions');

function ensureAuthenticated(req, res, next) {
  console.log('ensureAuthenticated: ', req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

module.exports = {
  createTransaction: function (req, res) {
    ensureAuthenticated(req, res, function () {
      const googleId = req.user.googleId; // Get the user's Google ID from the session
    });
  },
  listTransactions: function (req, res) {
    ensureAuthenticated(req, res, function () {
      console.log('getUsers: ', req.isAuthenticated());
      const googleId = req.user.googleId; // Get the user's Google ID from the session
    });
  },
};
