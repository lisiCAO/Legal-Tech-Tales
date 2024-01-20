const Comment = require('./../models/comment');

exports.addComment = async (req, res) => {
  try {
    const newComment = new Comment({
      body: req.body.body,
      articleId: req.body.articleId,
      authorId: req.user.userId
    });

    const savedComment = await newComment.save();
    res.status(201).send(savedComment);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }
    res.status(500).send('Error adding comment');
  }
};

exports.getComments = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const comments = await Comment.find({ articleId: articleId });
    res.send(comments);
  } catch (error) {
    res.status(500).send('Error retrieving comments');
  }
};
