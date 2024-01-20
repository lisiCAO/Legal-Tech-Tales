const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [10, 'Article title must be at least 10 characters long.']
  },
  body: {
    type: String,
    required: true,
    minlength: [50, 'Article content must be at least 50 characters long.']
  },
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;

