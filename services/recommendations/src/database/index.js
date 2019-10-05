const mongoose = require('mongoose');

let connection;

function connect(){
  if(connection) return connection;
  mongoose.set('useFindAndModify', false);
  connection = mongoose.connect('mongodb://recommendations-db');
  return connection;
}

module.exports = {
  connect
}