process.env.NODE_PATH = './';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const database = require('database');
const { disconnect } = require('broker');

database.setup();
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

routes(app);

app.listen(config.port, async () => {
  console.log(`Server listening on port ${config.port}`);
});

process.on('exit', disconnect);

module.exports = app;