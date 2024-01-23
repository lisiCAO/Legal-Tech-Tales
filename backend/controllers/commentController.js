const Comment = require('./../models/comment');

exports.addComment = async (req, res) => {
  try {
    if(!req.user) {
      return res.status(401).send('You need to be logged in to add a comment');
    }
    console.log(req.body);
    console.log(req.user);
    const newComment = new Comment({
      body: req.body.body,
      articleId: req.body.articleId,
      authorId: req.user.userId
    });
    if(!newComment.body) {
      return res.status(400).json('Comment body is required');
    }
    if(!newComment.articleId) {
      return res.status(400).json('Article ID is required');
    }
    if(!newComment.authorId) {
      return res.status(400).json('Author ID is required');
    }
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json(error.message);
    }
    res.status(500).json('Error adding comment');
  }
};

exports.getComments = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const comments = await Comment.find({ articleId: articleId }).sort({ createdAt: -1 }).populate('authorId', 'name');
    res.send(comments);
  } catch (error) {
    res.status(500).send('Error retrieving comments');
  }
};
