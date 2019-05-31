const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamps = require('../middleware/timestamp');

const commentSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: { type: String, required: true },
    mark: { type: Number, enum: ['1', '2', '3', '4', '5'], required: true }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
