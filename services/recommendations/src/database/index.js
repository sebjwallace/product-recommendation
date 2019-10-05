const fs = require('fs');
const { Client } = require('pg');

let client;

async function connect(){

  if(client) return client;

  client = new Client({
    host: 'recommendations-db',
    user: 'user',
    password: 'root',
    database: 'db',
    port: 5432
  });

  await client.connect();

  return client;

}

async function setup(){
  const schemas = fs.readFileSync('database/schemas.sql', 'utf8');
  const client = await connect();
  client.query(schemas);
}

module.exports = {
  connect,
  setup
};