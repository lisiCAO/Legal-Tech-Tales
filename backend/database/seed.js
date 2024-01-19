const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const Article = require('./../models/article');
const Comment = require('./../models/comment');

const users = require('./seed/users');
const articles = require('./seed/articles');
const comments = require('./seed/comments');
const connectDB = require('./database');

connectDB();

const seedDB = async () => {
    await User.deleteMany({});
    await Article.deleteMany({});
    await Comment.deleteMany({});
  
    const savedUsers = [];
  
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new User({ ...user, password: hashedPassword });
      await newUser.save();
      savedUsers.push(newUser);
    }
  
    const savedArticles = [];
  
    for (let i = 0; i < articles.length; i++) {
      const newArticle = new Article({ ...articles[i], authorId: savedUsers[i % savedUsers.length]._id });
      await newArticle.save();
      savedArticles.push(newArticle);
      savedUsers[i % savedUsers.length].articles.push(newArticle._id);
    }
  
    for (let i = 0; i < comments.length; i++) {
      const newComment = new Comment({ ...comments[i], authorId: savedUsers[i % savedUsers.length]._id, articleId: savedArticles[i % savedArticles.length]._id });
      await newComment.save();
      savedUsers[i % savedUsers.length].comments.push(newComment._id);
      savedArticles[i % savedArticles.length].comments.push(newComment._id);
  
      await savedUsers[i % savedUsers.length].save();
      await savedArticles[i % savedArticles.length].save();
    }
    console.log('Data seeding successful!');
    process.exit(0);
  };
  
  seedDB().catch(error => {
    console.log(error);
    process.exit(1);
  });
  