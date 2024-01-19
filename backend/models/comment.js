const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  articleId: mongoose.Schema.Types.ObjectId,
  authorId: mongoose.Schema.Types.ObjectId,
  body: String,
  creationTime: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
