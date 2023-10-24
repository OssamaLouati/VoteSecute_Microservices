const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

//Route to check if the user has voted
router.get('/hasVoted', authController.vertifyHasVoted);

//Route to update the user hasVoted status to true
router.put('/updateHasVoted', authController.updateHasVoted);

module.exports = router;
