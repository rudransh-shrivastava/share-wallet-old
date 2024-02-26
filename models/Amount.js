const mongoose = require('mongoose');

const AmountSchema = new mongoose.Schema({
  amount: Number,
});

const Amount = mongoose.model('Amount', AmountSchema);

module.exports = Amount;
