const Bet = require('../../../domain/db/schemas/bet');
const User = require('../../../domain/db/schemas/user');

const createBet = (request, response) => {
  const bet = request.body;
  console.log('bet', bet);

  const betData = { ...bet };

  const newBet = new Bet(betData);

  const sendResponse = bet => {
    console.log(bet);
    console.log('bet._id', bet._id);
    // Bet.findOneAndUpdate({ _id: id }, bet, { new: true })
    User.findById(bet.userID).exec(function(err, user) {
      if (err) return sendError(err);
      user.bets.push(bet._id);
      user.save();
    })

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

  const sendError = (err) => {
    console.log(JSON.stringify(err));
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
