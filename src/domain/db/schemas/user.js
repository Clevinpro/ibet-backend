const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const userSchema = new Schema(
  {
    userName: { type: String, unique : true, required : true, dropDups: true},
    email: { type: String, unique : true, required : true, dropDups: true },
    password: { type: String, required: true },
    points: { type: Number, default: 1000 },
    bets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bet'
      }
    ],
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: 'History'
      }
    ],
  },
  {
    timestamps: true
  }
);

userSchema.plugin(timestamp);

const User = mongoose.model('User', userSchema);

module.exports = User;
