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

  await client.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL NOT NULL,
      ref varchar,
      customer_id varchar NOT NULL,
      product_id varchar NOT NULL,
      quantity numeric NOT NULL
    )
  `);

  return client;

}