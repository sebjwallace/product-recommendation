const { connect } = require('database');
const { send } = require('broker');

module.exports = async function(req, res){

  const {
    body: {
      customerId,
      productId,
      quantity
    }
  } = req;

  const client = await connect();

  await client.query(`
    INSERT INTO transactions
    (customer_id, product_id, quantity)
    VALUES
    ($1, $2, $3)
  `, [ customerId, productId, quantity ]);

  const message = JSON.stringify({ customerId, productId, quantity });
  await send({ queue: 'transactions', message });

  res.json({ ok: true });

}