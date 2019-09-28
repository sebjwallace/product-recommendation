const v1 = [
  
  {
    method: 'post',
    path: '/transactions',
    controller: require('./controllers/transactions/post')
  }

];

module.exports = { v1 };