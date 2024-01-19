const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
