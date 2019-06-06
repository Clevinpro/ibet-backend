const jwt = require('jsonwebtoken');
const User = require('../../../domain/db/schemas/user');
const app = require('../../app/app');
const bcrypt = require('bcrypt');

const errorUser = {
  error: 'User in not defined'
};

const errorPassword = {
  error: 'Password is invalid'
};

const passwMatches = (passw, hash) => bcrypt.compareSync(passw, hash);

const generateToken = paramsForTokenGeneration => {
  const secretKey = app.get('superSecret');

  return jwt.sign(paramsForTokenGeneration, secretKey, {
    expiresIn: 60 * 60 * 24
  });
};

const authenticate = (req, res) => {
  const { username, email, password } = req.body;

  const userId = { email: email };

  User.findOne(userId)
  .populate('bets')
  // .populate('history')
  .exec(onFind);

  function onFind(err, user) {
    if (err) throw err;

    if (!user) {
      res.json(errorUser);
      return;
    }
    const correctPassword = passwMatches(password, user.password);

    if (!correctPassword) {
      res.json(errorPassword);
      return;
    }

    const { _id: id, userName, points, bets, history } = user;

    const payload = {
      id
    };

    const token = generateToken(payload);

    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token,
      user: {
        id,
        userName,
        points,
        bets,
        history,
      }
    });
  }
};

module.exports = authenticate;
