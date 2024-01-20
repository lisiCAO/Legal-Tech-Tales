const express = require('express');
const authenticateToken = require('./../middleware/authenticateToken')
const articleController = require('./../controllers/articleController');

const router = express.Router();

router.get('/', articleController.listArticles);

router.post('/add', authenticateToken, articleController.addArticle);
 
router.get('/:id', articleController.viewArticle);
 
module.exports = router;
