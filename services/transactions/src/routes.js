const v1 = [
  
  {
    method: 'post',
    path: '/transactions',
    controller: require('./controllers/transactions/post')
  },

  {
    method: 'get',
    path: '/transactions',
    controller: require('controllers/transactions/get')
  },

  {
    method: 'get',
    path: '/transactions/:ref',
    controller: require('controllers/transactions/get-ref')
  }

];

module.exports = { v1 };