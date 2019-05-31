const Comment = require('../../../domain/db/schemas/comment');

const getAllProducts = (request, response) => {
  const query = request.query.productId;
  const id = query ? { product: query } : {};

  const sendResponse = comments => {
    response.set('Content-type', 'application/json');
    response.status(200);
    comments.length !== 0
      ? response.json({ status: 'success', comments })
      : response.json({ status: 'success', comments: [] });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'comment was not found'
    });
  };
  console.log(query);

  Comment.find(id)
    .populate('product')
    .populate('author')
    .exec(function(err, comment) {
      if (err) return sendError(err);
      sendResponse(comment);
    });
};

module.exports = getAllProducts;
