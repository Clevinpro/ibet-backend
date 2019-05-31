const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
// const session = require('express-session')
const config = require('../config');

const { app, routes } = require('./controller');

const errorHandler = (req, res, next) => {
  res.status(500).send('No such page');
  next();
};

const startServer = port => {
  app
    .set('superSecret', config.secret)
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use('/', routes)
    .use(errorHandler);

  app.listen(port);

  console.log('Server was started at http://localhost:' + port);
};

module.exports = startServer;
