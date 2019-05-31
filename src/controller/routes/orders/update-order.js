const Order = require('../../../domain/db/schemas/order');

const updateOrder = (request, response) => {
  const order = request.body;
  const id = request.params.id;

  const sendError = () => {
    response.status(400);
    response.json({
      status: 'error',
      text: 'there is no such order'
    });
  };

  const sendResponse = newOrder => {
    if (!newOrder) {
      return sendError();
    }

    response.json({
      status: 'success',
      order: newOrder
    });
  };

  Order.findOneAndUpdate({ _id: id }, order, { new: true })
    .then(sendResponse)
    .catch(sendError);
};

module.exports = updateOrder;
