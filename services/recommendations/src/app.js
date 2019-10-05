process.env.NODE_PATH = './';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const database = require('./database');
const broker = require('broker');
const getRecommendations = require('./controllers/recommendations/get');
const consumeRecommendations = require('./controllers/recommendations/consume');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/recommendations/:customerId', getRecommendations);

app.listen(config.port, async () => {
  database.connect();
  await broker.consume({ queue: 'recommendations', callback: consumeRecommendations });
  console.log(`Server listening on port ${config.port}`);
});

process.on('exit', broker.disconnect);

module.exports = app;