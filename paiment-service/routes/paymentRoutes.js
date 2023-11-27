const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

// payment action
router.post("/pay", paymentController.Pay);

//create bank account
router.post("/createPaymentAccount", paymentController.createPaymentAccount);

module.exports = router;
