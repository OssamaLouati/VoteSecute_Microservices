const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const voteController = require("../controllers/voteController");
const applyController = require("../controllers/applyController");
const adminController = require("../controllers/adminController");

// Registration route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

//Route to check if the user has voted
router.get("/hasVoted", voteController.verifyHasVoted);

//Route to update the user hasVoted status to true
router.put("/updateHasVoted", voteController.updateHasVoted);

//Route to check if the user has applied
router.get("/hasApplied", applyController.verifyHasApplied);

//Route to update the user hasApplied status to true
router.put("/updateHasApplied", applyController.updateHasApplied);

//Route to  make all user Eligible to apply
router.put('/make-eligible-to-apply', adminController.makeUsersEligibleToApply);

//Route to check make all user Ineligible to apply
router.put('/make-ineligible-to-apply', adminController.makeUsersIneligibleToApply);

//Route to make all user Ineligible to vote
router.put('/closeElection', adminController.makeUsersIneligibleToVote);

//Route to check if the user is eligible to vote
router.get('/isEligibleToVote', voteController.isEligibleToVote);

//Route to check if the user is eligible to apply
router.get('/isEligibleToApply', adminController.checkApplicationEligibility);

module.exports = router;
