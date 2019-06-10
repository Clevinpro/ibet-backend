const schedule = require("node-schedule");
const Bet = require('../../../domain/db/schemas/bet');
const User = require('../../../domain/db/schemas/user');
const History = require("../../../domain/db/schemas/history");

function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

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
      console.log('math',  +user.points - +points);
      user.points = +user.points - +points;
      user.save();
    })
  }

  const incrementUserPoints = (id, points) => {
    console.log('id____:', id, 'points____:', points)
    User.findById(id).exec(function(err, user) {
      console.log('success');
      // if (err) console.log('errr', JSON.stringify(err));
      if (err) return sendError(err);
      console.log('math',  +user.points + +points);
      user.points = +user.points + +points;
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
    
    let startTime = new Date(newBet.exitDate);
    let endTime = new Date(newBet.exitDate + 2000);
    console.log('startTime', startTime);
    let j = schedule.scheduleJob(
      { start: startTime, end: endTime },
      function() {
        const random = randomIntInc(1, 2);
        if (+newBet.betValue === random) {
          incrementUserPoints(
            newBet.userID,
            Number(+newBet.points * 2 * 0.9).toFixed(2)
          );
        } else {
          incrementUserPoints(
            newBet.partnerID,
            Number(+newBet.points * 2 *  0.9).toFixed(2)
          );
        }
        const {
          userID,
          userName,
          partnerID,
          partnerName,
          points,
          type,
          betValue
        } = newBet;
        const history = {
          userID,
          userName,
          partnerID,
          partnerName,
          points,
          type,
          betValue
        };
        const newHistory = new History(history);
        newHistory.save();

        Bet.findById(newBet._id).remove().then((err) => {
          if(err) console.log(err)
          console.log('delete', newBet._id);
        });
        j.cancel();
      }
    );

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
