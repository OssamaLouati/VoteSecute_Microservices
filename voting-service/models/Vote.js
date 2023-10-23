const mongoose = require("mongoose");
const voteSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  votes: {
    type: [[String]],
    required: true,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
