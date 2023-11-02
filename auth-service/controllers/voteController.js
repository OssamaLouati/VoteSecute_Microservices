const User = require('../models/User');

exports.verifyHasVoted = async (req, res) => {
  try {
    const { email } = req.query; // Note: using req.query to get email parameter from query string

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasVoted = user.hasVoted;

    res.json({ hasVoted });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error + " Server error when vertifyHasVoted" });
  }
};

exports.updateHasVoted = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasVoted = true;

    // Update using await instead of callback
    await User.updateOne({ email: email }, { hasVoted: hasVoted });

    // You may want to send a response after updating
    res.status(200).json({ message: "Successfully updated voting status" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error + " Server error when updateHasVoted" });
  }
};

exports.isEligibleToVote = async (req, res) => {
  try{
    const {email} = req.query;

    const user = await User.findOne({email: email});

    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    const isEligibleToVote = user.isEligibleToVote;

    res.json({isEligibleToVote});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message: error + " Server error when isEligibleToVote"});
  }
}
