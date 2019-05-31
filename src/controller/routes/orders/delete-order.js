const Order = require('../../../domain/db/schemas/order');

const getOrder = (request, response) => {
  const id = request.params.id;

  const sendResponse = () => {
    response.status(200);
    response.json({ status: 'Order deleted' });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'order was not deleted'
    });
  };

  Order.findById(id)
    .remove()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getOrder;
