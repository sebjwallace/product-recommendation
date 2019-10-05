const mongoose = require('mongoose');

const Customer = mongoose.model(
  'Customer',
  {
    id: String,
    products: Object
  }
);

module.exports = Customer;