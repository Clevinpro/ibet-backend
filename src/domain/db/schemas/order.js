const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const orderSchema = new Schema(
  {
    creator: { type: String, required: true },
    productsList: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        type: {
          type: String,
          enum: ['M', 'XL', 'XXL'],
          default: 'M'
        },
        itemsCount: Number
      }
    ],
    deliveryType: {
      type: String,
      enum: ['delivery', 'office'],
      default: 'delivery'
    },
    deliveryAdress: String,
    sumToPay: Number,
    status: {
      type: String,
      enum: ['inProgress', 'declined', 'finished', 'failed'],
      default: 'inProgress'
    }
  },
  {
    timestamps: true
  }
);

orderSchema.plugin(timestamp);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
