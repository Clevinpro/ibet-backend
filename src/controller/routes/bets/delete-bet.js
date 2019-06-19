const Bet = require('../../../domain/db/schemas/bet');

const getBet = (request, response) => {
  const id = request.params.id;

  const sendResponse = () => {
    
    Bet.find()
    // .populate('ingredients')
    .exec(function(err, bets) {
      console.log(err);
      if (err) return sendError(err);
      response.status(200);
      response.json({
        status: 'success',
        bets
      });
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'bet was not deleted'
    });
  };

  Bet.findById(id)
    .remove()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getBet;
