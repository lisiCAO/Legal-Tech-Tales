const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authenticateToken = require('./../middleware/authenticateToken');

router.get('/me', authenticateToken, userController.getMe);
router.get('/:id', userController.getUser);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout',authenticateToken, userController.logout);

module.exports = router;