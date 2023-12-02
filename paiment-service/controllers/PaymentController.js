const Payment = require("../models/Payment");
const publish = require("./Async/publisher");

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
