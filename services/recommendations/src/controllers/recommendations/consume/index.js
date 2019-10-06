const Customer = require('database/models/Customer');

module.exports = function(message){

  const { customerId, recommendedProducts } = JSON.parse(message);

  Customer.findOneAndUpdate(
    { id: customerId },
    { products: recommendedProducts },
    { upsert: true }
  );

}