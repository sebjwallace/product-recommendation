module.exports = function (app){

  app.post(
    '/transactions',
    require('./controllers/transactions/post/validate'),
    require('./controllers/transactions/post')
  );

  app.get(
    '/transactions',
    require('controllers/transactions/get')
  );

}