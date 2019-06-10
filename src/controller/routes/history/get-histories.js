const History = require('../../../domain/db/schemas/history');

const getAllHistory = (request, response) => {
  const sendResponse = history => {
    response.status(200);
    response.json(history);
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'history was not found'
    });
  };

  History.find()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getAllHistory;
