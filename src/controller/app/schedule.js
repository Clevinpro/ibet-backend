const schedule = require("node-schedule");
const Bet = require("../../domain/db/schemas/bet");
const User = require("../../domain/db/schemas/user");
const History = require("../../domain/db/schemas/history");

function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

const incrementUserPoints = (id, points) => {
  User.findById(id).exec(function(err, user) {
    if (err) return sendError(err);
    user.points = Number(+user.points + points).toFixed(2);
    user.save();
  });
};

const scheduleBets = bets => {
  bets.forEach(el => {
    let startTime = new Date(el.exitDate);
    let j = schedule.scheduleJob(startTime, function() {
        const random = randomIntInc(1, 2);
        if (el.betValue === random) {
          incrementUserPoints(
            el.userID,
            Number((+el.points * 2) * 0.9).toFixed(2)
          );
        } else {
          incrementUserPoints(
            el.partnerID,
            Number((+el.points * 2) * 0.9).toFixed(2)
          );
        }
        console.log(el);
        const {
          userID,
          userName,
          partnerID,
          partnerName,
          points,
          type,
          betValue
        } = el;
        const history = {
          userID,
          userName,
          partnerID,
          partnerName,
          points,
          type,
          betValue,
          winBet: random,
        };
        const newHistory = new History(history);
        newHistory.save();

        Bet.findById(el._id).remove().then((err) => {
          if(err) console.log(err)
          console.log('delete', el._id);
        });
        j.cancel();
      }
    );
  });
}

const scheduleRunner = () => {

  Bet.find()
    .lean()
    .exec(function(err, bets) {
      if (err) throw new Err(err);
      const activeBets = bets.filter(el => el.partnerID !== undefined);
      scheduleBets(activeBets);
    });
};

module.exports = scheduleRunner;
