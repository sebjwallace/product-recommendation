const fs = require('fs');
const { Client } = require('pg');

let _client;

async function connect(){

  if(_client) return _client;

  const client = new Client({
    host: 'transactions-db',
    user: 'user',
    password: 'root',
    database: 'db',
    port: 5432
  });

  try {
    await client.connect();
    return _client = client;
  } catch (e) {
    return setTimeout(connect, 500);
  }

}

async function setup(){
  const _client = await connect();
  if(!_client) return setTimeout(setup, 500);
  const schemas = fs.readFileSync('database/schemas.sql', 'utf8');
  _client.query(schemas);
}

module.exports = {
  connect,
  setup
};