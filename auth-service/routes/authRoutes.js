const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const voteController = require('../controllers/voteController');
const applyController = require('../controllers/applyController');


// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

//Route to check if the user has voted
router.get('/hasVoted', voteController.verifyHasVoted);

//Route to update the user hasVoted status to true
router.put('/updateHasVoted', voteController.updateHasVoted);

//Route to check if the user has applied
router.get('/hasApplied', applyController.verifyHasApplied);

//Route to update the user hasApplied status to true
router.put('/updateHasApplied', applyController.updateHasApplied);

module.exports = router;
