const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  title: String,
  body: String,
  creationTime: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
