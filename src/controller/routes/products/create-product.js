const Product = require('../../../domain/db/schemas/product');

const createProduct = (request, response) => {
  const product = request.body;

  const productData = { ...product };

  const newProduct = new Product(productData);

  const sendResponse = product => {
    console.log(product);

    response.json({
      status: 'success',
      product
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'product was not saved'
    });
  };

  newProduct
    .save()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createProduct;
