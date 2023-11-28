const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/CandidateController');
const applicationController = require('../controllers/ApplicationController');

// Endpoint to retrieve the voting board
router.get('/voteBoard', candidateController.getVoteBoard);

// Endpoint to submit votes
router.post('/sendVotes', candidateController.sendVotes);

router.get('/results', candidateController.getResults);

router.post('/apply', applicationController.createApplication);


module.exports = router;
