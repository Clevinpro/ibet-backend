const Order = require('../../../domain/db/schemas/order');

const getAllOrder = (request, response) => {
  const sendResponse = order => {
    response.status(200);
    response.json(order);
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'order was not found'
    });
  };

  Order.find()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getAllOrder;
