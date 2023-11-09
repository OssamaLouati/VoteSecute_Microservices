const Vote = require("../models/Vote");
const axios = require("axios");
const publish = require("./Async/publisher");
const subscribe = require("./Async/subscriber");

exports.vote = async (req, res) => {
  try {
    const { email, votes } = req.body;
    const newVote = new Vote({
      email,
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

exports.votesaga = async (req, res) => {
  try {
    const { email, votes } = req.body;

    const newVote = new Vote({
      email,
      votes,
      state: "Pending",
    });

    await newVote.save();
    const canVote = await checkIfUsercanVote(email);
    if (!canVote) {
      throw new Error(" The user isn't Eligible To Vote");
    }
    publish.publish(email);
    const sub = subscribe.subscribe();
    sub(async (err, message) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log("Received message:", message);
        if (message === "Your Action has been done successfully") {
          await Vote.updateOne({ email: email }, { state: Done });
        } else {
          await Vote.updateOne({ email: email }, { state: Failed });
          setTimeout(async () => {
            await Vote.deleteOne({ email: email });
          }, 60000);
          throw new Error(message);
        }
      }
    });

    res
      .status(201)
      .json({ message: "Your vote has been registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const checkIfUsercanVote = async (email) => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/canVote", {
      params: { email },
    });
    return response.data.isEligibleToVote;
  } catch (error) {
    console.error("Error checking if user has voted:", error);
  }
};
