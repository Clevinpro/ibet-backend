const User = require('../../../domain/db/schemas/user');
const jwt = require('jsonwebtoken');

const getToken = req =>
  req.body.token ||
  req.query.token ||
  req.headers['x-access-token'] ||
  req.headers['x-auth-token'] ||
  req.headers['authorization'];

const currentUser = (req, response) => {
  const token = getToken(req).replace('Bearer ', '');

  const decodedUser = jwt.decode(token);
  const userId = decodedUser.id;

  const sendResponse = user => {
    response.set('Content-type', 'application/json');
    response.status(200);
    if (user === null) {
      return response.json({ status: 'no user' });
    }
    const { _id: id, userName, points, activeBets, finishedBets } = user;
    response.json({ status: 'success', user: { id, userName, points, activeBets, finishedBets } });
  };

  const sendError = error => {
    response.status(400);
    response.json({
      error: error
    });
  };

  User.findById(userId)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = currentUser;
