const express = require('express');
const articleController = require('./../controllers/articleController');

const router = express.Router();

router.post('/article/add', articleController.addArticle);
 
router.get('/article/:id', articleController.viewArticle);
 
router.get('/index', articleController.listArticles);

module.exports = router;
