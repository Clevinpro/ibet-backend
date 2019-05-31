const Product = require('../../../domain/db/schemas/product');

const getProduct = (request, response) => {
  const id = request.params.id;

  const sendResponse = () => {
    response.status(200);
    response.json({ status: 'Product deleted' });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'product was not deleted'
    });
  };

  Product.findById(id)
    .remove()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getProduct;
