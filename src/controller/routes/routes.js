const express = require('express');

const mainRoute = require('./main/main');

const verifyToken = require('../app/check-token');

const createUser = require('./auth/create-user');
const authenticate = require('./auth/authenticate');
const currentUser = require('./auth/current');
const logout = require('./auth/logout');

const getUser = require('./user/get-user');
const getUsers = require('./user/get-users');
const updateUser = require('./user/update-user');
const deleteUser = require('./user/delete-user');

const createBet = require('./bets/create-bet');
const getBet = require('./bets/get-bet');
const getBets = require('./bets/get-bets');
const applyBet = require('./bets/apply-bet');
const deleteBet = require('./bets/delete-bet');

const createOrder = require('./orders/create-order');
const getOrder = require('./orders/get-order');
const getOrders = require('./orders/get-orders');
const updateOrder = require('./orders/update-order');
const deleteOrder = require('./orders/delete-order');

const createComment = require('./comments/create-comments');
const getComments = require('./comments/get-comments');

const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)

  .post('/auth/signup', createUser)
  .post('/auth/signin', authenticate)

  
  .get('/auth/logout', logout)
  .get('/auth/current', currentUser)
  
  
  .get('/bets', getBets)
  .use(verifyToken)
  
  .get('/users', getUsers)
  .get('/users/:id', getUser)
  .put('/users/:id', updateUser)
  .delete('/users/:id', deleteUser)
  
  .post('/bets', createBet)
  .get('/bets/:id', getBet)
  .put('/bets/apply/:id', applyBet)
  .delete('/bets/:id', deleteBet)

  .post('/orders', createOrder)
  .get('/orders', getOrders)
  .get('/orders/:id', getOrder)
  .put('/orders/:id', updateOrder)


  .delete('/orders/:id', deleteOrder)

  .post('/comments', createComment)
  .get('/comments', getComments);

module.exports = apiRoutes;
