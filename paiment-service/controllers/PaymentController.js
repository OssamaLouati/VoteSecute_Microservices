const Payment = require("../models/Payment");
const publish = require("./Async/publisher");
exports.createPaymentAccount = async (req, res) => {
  try {
    const { user_id, solde } = req.body;
    const newPayment = new Payment({
      user_id,
      solde,
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

exports.Payment = async (req, res) => {
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


exports.AsyncCreateAccount = async (msg) => {
  try {
    const email = msg;
    const newPayment = new Payment({
      email,
    });

    await newPayment.save();

    console.log({ message: "Your Bank Account has been created successfully" });
  } catch (error) {
    console.error(error);
  }
};

exports.AsyncPay = async (msg) => {
  
  try {
    const email = msg;
    const payment = await Payment.findOne({ email });
    console.log("Payment process");
    
    if (!payment) {
      console.log("invalide email");
      const msg="invalide email";
      publish.publishvote(msg);
    }
    if (payment.solde - 50 < 0) {
      console.log("Insufisant solde to do the action");
      const msg="Insufisant solde to do the action";
      publish.publishvote(msg);
    } else {
      let newsolde = payment.solde - 50;
      payment.solde = newsolde;

      await payment.save();
      console.log("Your Action has been done successfully");
      const msg = "Your Action has been done successfully";
      publish.publishvote(msg);
    }
  } catch (error) {
    const msg="Server error";
      publish.publishvote(msg);
  }
};


