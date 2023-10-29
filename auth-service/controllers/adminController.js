const User = require("../models/User");

exports.makeUsersEligible = async (req, res) => {
  try {
    const { isAdmin } = req.body;

    if (!isAdmin) {
      return res
        .status(400)
        .json({ message: "You are not allowed to make users eligible" });
    }

    // Update all users to set isEligibleToApply to true
    await User.updateMany({}, { $set: { isEligibleToApply: true } });

    // Update all users to set isEligibleToVote to true
    await User.updateMany({}, { $set: { isEligibleToVote: false } });

    // Update All users to set hasApplied and hasVoted to false
    await User.updateMany({}, { $set: {hasVoted: false } });

    res.status(200).json({ message: "All users are now eligible to apply." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

exports.makeUsersIneligible = async (req, res) => {
  try {
    const { isAdmin } = req.body;

    if (!isAdmin) {
      return res
        .status(400)
        .json({ message: "You are not allowed to make users ineligible" });
    }
    // Update all users to set isEligibleToApply to false
    await User.updateMany({}, { $set: { isEligibleToApply: false } });

    // Update all users to set isEligibleToVote to true
    await User.updateMany({}, { $set: { isEligibleToVote: true } });

    res.status(200).json({ message: "All users are now ineligible to apply." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
