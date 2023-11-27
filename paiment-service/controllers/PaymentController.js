const Payment = require("../models/Payment");

exports.createPaymentAccount = async (req, res) => {
  try {
    const user_id  = req.body;
    const newPayment = new Payment({
      user_id,
    });

    await newPayment.save();

    res
      .status(201)
      .json({ message: "Your Payment has been registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.Pay = async (req, res) => {
  try {
    const { user_id } = req.body;
    const payment = await Payment.findOne({ user_id });
    if (!payment) {
      return res.status(400).json({
        message: "Invalid user_Id or you should create an account in our bank",
      });
    }
    if (payment.solde - 50 < 0) {
      return res
        .status(400)
        .json({ message: "Insufisant solde to do the action" });
    }
    let newsolde = payment.solde - 50;
    payment.solde = newsolde;

    await payment.save();

    res.status(201).json({ message: "Your Action has been done successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
