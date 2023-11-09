const { response } = require("express");
const Payment = require("../models/Payment");

exports.createPaymentAccount = async (req, res) => {
  try {
    const { email } = req.body;
    const newPayment = new Payment({
      email,
      solde: 70,
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

exports.createPaymentAccountAsync = async (msg) => {
  try {
    const email = msg;
    const newPayment = new Payment({
      email,
      solde: 70,
    });

    await newPayment.save();

    console.log({ message: "Your Payment has been registered successfully" });
  } catch (error) {
    console.error(error);
  }
};

exports.PaymentAsync = async (msg) => {
  try {
    const email = msg;
    const payment = await Payment.findOne({ email });
    if (!payment) {
      return "invalide email";
    }
    if (payment.solde - 50 < 0) {
      return "Insufisant solde to do the action";
    }
    let newsolde = payment.solde - 50;
    payment.solde = newsolde;

    await payment.save();

    return "Your Action has been done successfully";
  } catch (error) {
    return "Server error";
  }
};

exports.Payment = async (req, res) => {
  try {
    const { email } = req.body;
    const payment = await Payment.findOne({ email });
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
