const Comment = require('../../../domain/db/schemas/comment');

const createComment = (request, response) => {
  const comment = request.body;

  const commentData = { ...comment };

  const newComment = new Comment(commentData);

  const sendResponse = comment => {
    response.json({
      status: 'success',
      comment
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'comment was not saved'
    });
  };

  newComment
    .save()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createComment;
