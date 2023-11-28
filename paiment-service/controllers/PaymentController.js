const { response } = require("express");
const Payment = require("../models/Payment");

exports.AsyncCreateAccount = async (msg) => {
  try {
    const email = msg;
    const newPayment = new Payment({
      email,
    });

    await newPayment.save();

    console.log({ message: "Your Payment has been registered successfully" });
  } catch (error) {
    console.error(error);
  }
};

exports.AsyncPay = async (msg) => {
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
