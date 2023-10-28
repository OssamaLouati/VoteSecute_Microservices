const User = require('../models/User');

exports.verifyHasApplied = async (req, res) => {
  try {
    const { email } = req.query; // Note: using req.query to get email parameter from query string

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasApplied = user.hasApplied;

    res.json({ hasApplied });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error + " Server error when vertifyHasApplied" });
  }
};

exports.updateHasApplied = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasApplied = true;

    // Update using await instead of callback
    await User.updateOne({ email: email }, { hasApplied: hasApplied });

    // You may want to send a response after updating
    res.status(200).json({ message: "Successfully applied for a position" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error + " Server error when updatehasApplied" });
  }
};
