const mongoose = require('mongoose');

module.exports = {
  connect: function () {
    const uri = process.env.MONGODB_URI;
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected...'))
      .catch((err) => console.log(err));
  },
};
