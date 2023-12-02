const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const CandidateController = require('../controllers/CandidateController');
const applicationController = require('../controllers/ApplicationController');

// Endpoint to retrieve the voting board
router.get('/voteBoard', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

// Endpoint to submit votes
router.post('/send', CandidateController.sendVotes);

router.get('/results', CandidateController.getResults);

router.post('/apply', applicationController.createApplication);


module.exports = router;
