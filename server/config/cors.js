const cors = require('cors');

module.exports = function (app) {
  app.use(
    cors({
      origin: [
        'http://localhost:5173',
        'https://share-wallet.vercel.app',
        'https://rudransh.live',
        'https://share-wallet-1.onrender.com',
        'http://share-wallet-1.onrender.com',
      ],
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
    })
  );
};
