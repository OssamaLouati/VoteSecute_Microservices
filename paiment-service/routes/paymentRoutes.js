const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

// payment action
router.post("/payment", paymentController.AsyncPay);
//create bank account
router.post("/bank", paymentController.AsyncCreateAccount);

module.exports = router;
