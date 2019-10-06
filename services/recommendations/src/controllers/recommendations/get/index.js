const Customer = require('database/models/Customer');

module.exports = function(req, res){

  const { customerId } = req.params;

  Customer.findOne(
    { id: customerId },
    (error, recommendation = {}) => res.json(error || recommendation.products)
  );

}