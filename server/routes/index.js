const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');

router.post('/CreateUser', userController.createUser);
router.get('/total', userController.getTotal);
router.post('/friends', userController.getFriends);

module.exports = router;
