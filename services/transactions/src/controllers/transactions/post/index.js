const format = require('pg-format');

const { connect } = require('database');
const { send } = require('broker');

module.exports = async function(req, res){
  const { body } = req;
  const transactions = Array.isArray(body) ? body : [body];

  const query = format(`
    INSERT INTO transactions
    (customerId, productId, quantity)
    VALUES %L
  `, transactions.map(transaction => Object.values(transaction)));

  const client = await connect();
  await client.query(query);

  await Promise.all(transactions.map(({
    customerId,
    productId,
    quantity
  }) => {
    const message = JSON.stringify({ customerId, productId, quantity });
    send({ queue: 'transactions', message });
  }));

  res.json({ ok: true });

}