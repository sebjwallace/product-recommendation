const connect = require('db');

module.exports = async function(req, res){

  const {
    params: customerId,
    query: limit
  } = req;

  const client = await connect();

  client.query(`
    SELECT * FROM recommendations
    WHERE customerId = $1
    OFFSET $2 LIMIT $3
  `, [ customerId, offset, limit ])
  
  .then(({ rows }) => res.json(rows))
  .catch(error => res.status(400).send(error));

}