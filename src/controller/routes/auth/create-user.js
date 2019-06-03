const User = require('../../../domain/db/schemas/user');
const bcrypt = require('bcrypt');

const createUser = (request, response) => {
  const user = request.body;

  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const userData = { ...user, password: hashedPassword };

  const newUser = new User(userData);

  const sendResponse = user => {
    const { userName, points, activeBets, finishedBets } = user;
    response.json({
      status: 'success',
      user: {userName, points, activeBets, finishedBets }
    });
  };

  const sendError = (error) => {
    let errMessage = 'user was not saved';
    console.log('user err', JSON.stringify(error));

    if (error && error.message && !error.code) {
      errMessage = error.message;
    } else if (error && error.code && error.code === 11000 && error.errmsg.includes('email')) {
      errMessage = 'email already exist';
    } else if (error && error.code && error.code === 11000 && error.errmsg.includes('userName')) {
      console.log(JSON.stringify(error));
      errMessage = 'userName already exist';
    }
    
    response.status(400);
    response.json({
      error: errMessage
    });
  };

  newUser
    .save()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createUser;
