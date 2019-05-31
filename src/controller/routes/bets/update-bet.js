const Bet = require('../../../domain/db/schemas/bet');

const updateBet = (request, response) => {
  const bet = request.body;
  const id = request.params.id;

  const sendError = () => {
    response.status(400);
    response.json({
      status: 'error',
      text: 'there is no such bet'
    });
  };

  const sendResponse = newBet => {
    if (!newBet) {
      return sendError();
    }

    response.json({
      status: 'success',
      bet: newBet
    });
  };

  Bet.findOneAndUpdate({ _id: id }, bet, { new: true })
    .then(sendResponse)
    .catch(sendError);
};

module.exports = updateBet;
