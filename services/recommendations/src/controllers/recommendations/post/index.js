const connect = require('db');

module.exports = async function(req, res){

  const {
    body: {
      ref,
      customerId,
      productId,
      quantity
    }
  } = req;

  const client = await connect();

  client.query(`
    INSERT INTO transactions
    (customer_id, product_id, quantity, ref)
    VALUES
    ($1, $2, $3, $4)
  `, [ customerId, productId, quantity, ref ])

  .then(() => res.json({ ok: true }))
  .catch(error => res.status(400).send(error));

}