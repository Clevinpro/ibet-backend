const History = require('../../../domain/db/schemas/history');

const getHistory = (request, response) => {
  const id = request.params.id;
  const sendResponse = history => {
    response.set('Content-type', 'application/json');
    response.status(200);
    response.json({ status: 'success', history });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'history was not found'
    });
  };

  const findHistory = History.findById(id);

  findHistory.then(sendResponse).catch(sendError);
};

module.exports = getHistory;
