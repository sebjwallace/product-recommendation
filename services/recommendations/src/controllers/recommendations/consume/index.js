const Customer = require('database/models/Customer');

module.exports = function(message){

  const { customerId, recommendedProducts } = JSON.parse(message);

  Customer.findOneAndUpdate(
    { id: customerId },
    { $set: recommendedProducts },
    { upsert: true, passRawResult: true },
    function(){ console.log('saved') }
  );

  console.log('recommendations');

}