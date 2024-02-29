const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3001/oauth2callback'
);

module.exports = {
  authorize: function (req, res) {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    });
    res.redirect(url);
  },
  oauth2callback: async function (req, res) {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful');
  },
};
