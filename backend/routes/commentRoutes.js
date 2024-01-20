const express = require('express');
const router = express.Router();
const commentController = require('./../controllers/commentController');
const authenticateToken = require('./../middleware/authenticateToken');
router.post('/', authenticateToken, commentController.addComment);

router.get('/:articleId', commentController.getComments);

module.exports = router;