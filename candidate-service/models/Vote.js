const mongoose = require("mongoose");
const voteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  votes: {
    type: [{}],
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
