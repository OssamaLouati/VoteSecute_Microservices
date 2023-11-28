const express = require("express");
const router = express.Router();
const candidate = require("../models/Candidate");

exports.getResults = async (req, res) => {
  try {
    const allCandidates = await candidate.find();
    console.log(allCandidates);

    // Use the Mongoose model to get distinct roles
    const roles = await candidate.distinct("role_being_candidated_for");

    let results = [];

    for (const role of roles) {
      // Filter the allCandidates array using JavaScript's filter method
      const candidatesForRole = allCandidates.filter(
        (c) => c.role_being_candidated_for === role
      );

      candidatesForRole.sort((a, b) => b.votes_number - a.votes_number);

      results.push({
        role: role,
        winner: candidatesForRole[0],
        candidates: candidatesForRole,
      });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Failed to fetch results:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
};

exports.sendVotes = async (req, res) => {
  try {
    const { votes } = req.body; // votes is an array of candidate IDs

    // For each candidate ID, increment the votes_number by 1
    for (const candidateId of votes) {
      await Candidate.findByIdAndUpdate(candidateId, {
        $inc: { votes_number: 1 },
      });
    }

    res.send({ message: "Votes submitted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.getVoteBoard = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};
