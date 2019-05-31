const Bet = require('../../../domain/db/schemas/bet');

const getBet = (request, response) => {
  const id = request.params.id;

  const sendResponse = bet => {
    response.set('Content-type', 'application/json');
    response.status(200);
    response.json({ status: 'success', bet });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'bet was not found'
    });
  };

  const findBet = Bet.findById(id).populate('Ingredient');

  findBet.then(sendResponse).catch(sendError);
};

module.exports = getBet;
