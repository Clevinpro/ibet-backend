const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const historySchema = new Schema(
  {
    userID: {
      type: String,
      ref: 'User'
    },
    userName: {
      type: String,
      required: true
    },
    partnerID: {
      type: String,
      ref: 'User'
    },
    partnerName: {
      type: String,
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
    }
  },
  {
    timestamps: true
  }
);

historySchema.plugin(timestamp);

const history = mongoose.model('history', historySchema);

module.exports = history;
