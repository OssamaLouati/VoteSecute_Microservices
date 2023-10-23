const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

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
router.post('/send', async (req, res) => {
    try {
        const { votes } = req.body; // votes is an array of candidate IDs

        // For each candidate ID, increment the votes_number by 1
        for (const candidateId of votes) {
            await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes_number: 1 } });
        }

        res.send({ message: 'Votes submitted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
