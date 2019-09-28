const connect = require('db');

module.exports = async function(req, res){

  const {
    params: { ref }
  } = req;

  const client = await connect();

  client.query(`
    SELECT * FROM transactions
    WHERE ref=$1
  `, [ ref ])
  
  .then(({ rows }) => res.json(rows))
  .catch(error => res.status(400).send(error));

}