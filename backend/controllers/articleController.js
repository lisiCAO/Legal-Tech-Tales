const Article = require('../models/article');

exports.addArticle = async (req, res) => {
  try {
    // 从请求体中提取文章数据
    const { title, body } = req.body;

    // 假设用户已通过认证中间件认证，并且他们的ID存储在req.user.userId
    const newArticle = new Article({
      authorId: req.user.userId, // 用户ID从认证信息中获取
      title: title,
      body: body
    });

    // 保存新文章到数据库
    const savedArticle = await newArticle.save();

    // 发送成功响应
    res.status(201).send(savedArticle);
  } catch (error) {
    // 捕获并处理来自Mongoose模型的验证错误
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }
    // 处理其他潜在的服务器错误
    res.status(500).send('Error adding article');
  }
};

exports.viewArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId).populate('comments');

    if (!article) {
      return res.status(404).send('Article not found');
    }

    res.send(article);
  } catch (error) {
    res.status(500).send('Error retrieving article');
  }
};

exports.listArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }).limit(5);
    res.send(articles);
  } catch (error) {
    res.status(500).send('Error retrieving articles');
  }
};
