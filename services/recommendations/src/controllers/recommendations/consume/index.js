const Customer = require('database/models/Customer');

module.exports = function(message){

  const { customerId, recommendedProducts } = JSON.parse(message);

  Customer.findOneAndUpdate(
    { id: customerId },
    recommendedProducts,
    { upsert: true },
    function(e){ console.log(e,'HELLO DFSSS') }
  ).exec();

  console.log('recommendations');

}