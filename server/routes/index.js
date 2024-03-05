const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authenticationController = require('../controllers/authentication');
const transactionController = require('../controllers/transaction');

router.get('/user/total', userController.getTotal);
router.get('/user/users', userController.getUsers);
router.get('/user/details', userController.getDetails);

router.get('/user/friends', userController.getFriends);
router.get('/user/friends/add', userController.addFriend);
router.get('/user/friends/remove', userController.removeFriend);

router.get('/transaction/create', transactionController.createTransaction);
router.get('/transaction/list', transactionController.listTransactions);

router.get('/auth/google', authenticationController.authorize);
router.get('/auth/google/callback', authenticationController.callback);
router.get('/login/failed', authenticationController.failed);
router.get('/auth/google/logout', authenticationController.logout);

module.exports = router;
