const Article = require('../models/article');

exports.addArticle = async (req, res) => {
  try {
    const { title, body } = req.body;

    const newArticle = new Article({
      authorId: req.user.userId, 
      title: title,
      body: body
    });

    const savedArticle = await newArticle.save();

    res.status(201).send(savedArticle);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }
    res.status(500).send('Error adding article');
  }
};

exports.viewArticleById = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId).populate('comments');

    if (!article) {
      return res.status(404).send('Article not found');
    }

    res.send(article);
  } catch (error) {
    res.status(500).send('Error retrieving article');
  }
};

exports.viewArticleBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const article = await Article.findOne({ slug: slug }).populate('comments');
    if(!article) {
      return res.status(404).send('Article not found');
    }
    res.send(article);
  } catch(error) {
    res.status(500).send('Error retrieving article')
  }
}

exports.listArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }).limit(5);
    res.send(articles);
  } catch (error) {
    res.status(500).send('Error retrieving articles');
  }
};
