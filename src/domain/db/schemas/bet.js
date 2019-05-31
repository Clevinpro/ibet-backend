const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const betSchema = new Schema(
  {
    userID: {
      type: String,
      ref: 'User'
    },
    userName: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['random', '222', '333'],
      default: 'random'
    },
    betValue: {
      type: String,
      required: true
    },
    exitDate: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true
  }
);

betSchema.plugin(timestamp);

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;
