const connect = require('db');

module.exports = async function(req, res){

  const {
    body: {
      customerId,
      productId,
      quantity
    }
  } = req;

  const client = await connect();

  client.query(`
    INSERT INTO transactions
    (customer_id, product_id, quantity)
    VALUES
    ($1, $2, $3)
  `, [ customerId, productId, quantity ])
  .then(() => res.json({ ok: true }))
  .catch(error => res.status(400).send(error));

}