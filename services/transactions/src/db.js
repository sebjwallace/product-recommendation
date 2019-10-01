const { Client } = require('pg');

let client;

module.exports = async function connect(){

  if(client) return client;

  client = new Client({
    host: 'transactions-db',
    user: 'user',
    password: 'root',
    database: 'db',
    port: 5432
  });

  await client.connect();

  return client;

}