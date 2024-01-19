const express = require('express');
const userController = require('./controllers/userController');
const articleController = require('./controllers/articleController');

const router = express.Router();

// 
router.post('/register', userController.register);

// 
router.post('/login', userController.login);

// 
router.post('/article/add', articleController.addArticle);

// 
router.get('/article/:id', articleController.viewArticle);

// 
router.get('/index', articleController.listArticles);

module.exports = router;
