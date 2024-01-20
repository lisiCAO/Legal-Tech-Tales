const mongoose = require('mongoose');
const slugify = require('slugify'); 
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [10, 'Article title must be at least 10 characters long.']
  },
  slug: {
    type: String,
    unique: true, 
  },
  body: {
    type: String,
    required: true,
    minlength: [50, 'Article content must be at least 50 characters long.']
  },
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

articleSchema.pre('save', function(next) {
  if (this.title && this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;

