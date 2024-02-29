const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');
const googleAuthController = require('../controllers/googleAuthController');

router.post('/CreateUser', userController.createUser);
router.get('/total', userController.getTotal);
router.post('/friends', userController.getFriends);
router.get('/auth/google', googleAuthController.authorize);
router.get('/oauth2callback', googleAuthController.oauth2callback);
module.exports = router;
