const mongoose = require("mongoose");
const payementSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  solde: {
    type: Number,
    required: true,
    default: 200,
    min: 0,
  },
});

const Payment = mongoose.model("Payment", payementSchema);

module.exports = Payment;
