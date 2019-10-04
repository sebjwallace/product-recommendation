process.env.NODE_PATH = './';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const database = require('database');
const { connect, disconnect } = require('broker');

database.setup();
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const apiVersions = Object.keys(routes);
apiVersions.forEach((version) => {
  routes[version].forEach(({ method, path, controller }) => {
    app[method](`/${version}${path}`, controller);
  });
})

app.listen(config.port, async () => {
  console.log(`Server listening on port ${config.port}`);
  // const { channel } = await connect();
  // channel.consume('transactions', (message) => {
  //   console.log('message', message.content.toString());
  //   channel.ack(message);
  // }, { noAck: false });
});

process.on('exit', disconnect);

module.exports = app;