const v1 = [
  
  {
    method: 'post',
    path: '/recommendations',
    controller: require('./controllers/recommendations/post')
  },

  {
    method: 'get',
    path: '/recommendations/:customerId',
    controller: require('controllers/recommendations/get')
  }

];

module.exports = { v1 };