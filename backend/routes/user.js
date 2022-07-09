const express = require('express');
const router = express.Router();

const { getUserById } = require('./../controllers/user');
const { updateUser } = require('./../controllers/user');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');


router.param('userId', getUserById);


router.put('/user/update/:userId',isSignedIn,isAuthenticated ,updateUser);


module.exports = router;