const Bet = require('../../../domain/db/schemas/bet');

const createBet = (request, response) => {
  const bet = request.body;

  const betData = { ...bet };

  const newBet = new Bet(betData);

  const sendResponse = bet => {
    console.log(bet);
    Bet.find()
    // .populate('ingredients')
    .exec(function(err, bets) {
      console.log(err);
      if (err) return sendError(err);
      response.json({
        status: 'success',
        bets
      });
    });
    
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'bet was not saved'
    });
  };

  newBet
    .save()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createBet;
