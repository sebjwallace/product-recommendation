const { connect } = require('database');
const { send } = require('broker');

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

  await client.query(`
    INSERT INTO transactions
    (customer_id, product_id, quantity, ref)
    VALUES
    ($1, $2, $3, $4)
  `, [ customerId, productId, quantity, ref ]);

  const message = JSON.stringify({ customerId, productId, quantity, ref });
  const response = await send({ queue: 'transactions', message });
  console.log(response);

  res.json({ ok: true });

}