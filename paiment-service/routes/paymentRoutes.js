const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

// payment action
router.post("/payment", paymentController.Payment);
//create bank account
router.post("/bank", paymentController.createPaymentAccount);

module.exports = router;
