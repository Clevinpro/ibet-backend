const History = require('../../../domain/db/schemas/history');

const createHistory = (request, response) => {
  const history = request.body;

  const historyData = { ...history };

  const newHistory = new History(historyData);

  const sendResponse = history => {
    console.log(history);

    response.json({
      status: 'success',
      history
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'history was not saved'
    });
  };

  newHistory
    .save()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createHistory;
