const User = require("../models/User");

exports.makeUsersEligibleToApply = async (req, res) => {
  try {
    const { isAdmin } = req.body;

    if (!isAdmin) {
      return res
        .status(400)
        .json({ message: "You are not allowed to make users eligible" });
    }

    // Update all users to set isEligibleToApply to true
    await User.updateMany({}, { $set: { isEligibleToApply: true, hasApplied: false } });

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

// Make all users eligible to vote and ineligible to apply
exports.makeUsersIneligibleToApply = async (req, res) => {
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
    await User.updateMany({}, { $set: { isEligibleToVote: true, hasVoted: false } });

    res.status(200).json({ message: "All users are now ineligible to apply." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

exports.makeUsersIneligibleToVote = async (req, res) => {
  try {
    const { isAdmin } = req.body;

    if (!isAdmin) {
      return res
        .status(400)
        .json({ message: "You are not allowed to make users ineligible" });
    }

    // Update all users to set isEligibleToVote to true
    await User.updateMany({}, { $set: { isEligibleToVote: false } });

    res.status(200).json({ message: "All users are now eligible to vote." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
}

//check if users are eligible to Apply
exports.checkApplicationEligibility = async (req, res) => {
  try{
    const {email} = req.body;

    const user = await User.findOne({email: email});

    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    const isEligibleToApply = user.isEligibleToApply;

    res.json({isEligibleToApply});
  } catch(error){
    console.error(error);
    res.status(500).json({message: error + " Server error when checkApplicationEligibility"});
  }
}