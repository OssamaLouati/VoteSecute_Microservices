const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");

// Submit vote
router.post("/vote", voteController.vote);

module.exports = router;
