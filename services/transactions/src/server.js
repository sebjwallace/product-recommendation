const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');

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

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

module.exports = app;