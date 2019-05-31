const Order = require('../../../domain/db/schemas/order');

const getOrder = (request, response) => {
  const id = request.params.id;
  const sendResponse = order => {
    response.set('Content-type', 'application/json');
    response.status(200);
    response.json({ status: 'success', order });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'order was not found'
    });
  };

  const findOrder = Order.findById(id);

  findOrder.then(sendResponse).catch(sendError);
};

module.exports = getOrder;
