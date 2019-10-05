const Customer = require('database/models/Customer');

module.exports = function(message){

  const { customerId, recommendedProducts } = JSON.parse(message);

  console.log(recommendedProducts);

  Customer.findOneAndUpdate(
    { id: customerId },
    { products: recommendedProducts },
    { upsert: true },
    () => console.log('saved')
  );

}