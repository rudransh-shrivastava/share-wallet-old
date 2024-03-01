const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');
const googleAuthController = require('../controllers/googleAuthController');

router.get('/user/total', userController.getTotal);
router.get('/user/friends', userController.getFriends);
router.get('/user/details', userController.getDetails);
router.get('/auth/google', googleAuthController.authorize);
router.get('/auth/google/callback', googleAuthController.callback);
router.get('/login/failed', googleAuthController.failed);
router.get('/auth/google/logout', googleAuthController.logout);
module.exports = router;
