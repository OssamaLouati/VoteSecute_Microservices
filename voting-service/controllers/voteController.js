const Vote = require("../models/Vote");

exports.vote = async (req, res) => {
  try {
    const { user_id, votes } = req.body;
    const newVote = new Vote({
      user_id,
      votes,
    });

    await newVote.save();

    res
      .status(201)
      .json({ message: "Your vote has been registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
