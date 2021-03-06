const { connect } = require('database');

module.exports = async function(req, res){

  const {
    query: { offset = 0, limit = 100 }
  } = req;

  const client = await connect();

  client.query(`
    SELECT * FROM transactions
    OFFSET $1 LIMIT $2
  `, [ offset, limit ])
  
  .then(({ rows }) => res.json(rows))
  .catch(error => res.status(400).send(error));

}