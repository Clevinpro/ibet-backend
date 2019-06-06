const Bet = require('../../../domain/db/schemas/bet');
const User = require('../../../domain/db/schemas/user');

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

  const decrementUserPoints = (id, points) => {
    console.log('id____:', id, 'points____:', points)
    User.findById(id).exec(function(err, user) {
      console.log('success');
      // if (err) console.log('errr', JSON.stringify(err));
      if (err) return sendError(err);
      console.log('math',  user.points - points);
      user.points = user.points - points;
      user.save();
    })
  }

  const sendResponse = newBet => {
    console.log('newBet', newBet);
    if (!newBet) {
      return sendError();
    }

    decrementUserPoints(newBet.partnerID, newBet.points);
    decrementUserPoints(newBet.userID, newBet.points);
    

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

  Bet.findOneAndUpdate({ _id: id }, bet, { new: true })
    .then(sendResponse)
    .catch(sendError);
};

module.exports = updateBet;
