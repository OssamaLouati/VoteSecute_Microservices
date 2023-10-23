const mongoose = require("mongoose");
const payementSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  solde: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Payment = mongoose.model("Payment", payementSchema);

module.exports = Payment;
