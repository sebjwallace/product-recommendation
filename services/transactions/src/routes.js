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
  }

];

module.exports = { v1 };