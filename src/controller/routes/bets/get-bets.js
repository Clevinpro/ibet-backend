const Bet = require('../../../domain/db/schemas/bet');
const Ingredients = require('../../../domain/db/schemas/ingredients');

const getAllBets = (request, response) => {
  const query = request.query.categories;
  const category = query ? { categories: query } : {};

  const sendResponse = bets => {
    response.set('Content-type', 'application/json');
    response.status(200);
    bets.length !== 0
      ? response.json({ status: 'success', bets })
      : response.json({ status: 'No such bets', bets: [] });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'bet was not found'
    });
  };

  Bet.find()
    .populate('ingredients')
    .exec(function(err, bet) {
      console.log(err);
      if (err) return sendError(err);
      sendResponse(bet);
    });
};

module.exports = getAllBets;
