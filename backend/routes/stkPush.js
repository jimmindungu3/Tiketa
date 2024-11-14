const express = require("express");
const router = express.Router();

const { createSTKToken, stkPush } = require("../controllers/token");
const Payment = require("../models/PaymentSchema");

// STK PUSH handler
router.post("/stk-push", createSTKToken, stkPush, (req, res) => {
  const token = req.token;
  res.json({ token });
});

// Route to handle M-Pesa payment callback //////////////////////////////////////////////////////////////////////
router.post("/mpesa-callback", async (req, res) => {
  try {
    const callbackData = req.body.Body.stkCallback;

    // Check if the payment was successful
    if (callbackData.ResultCode === 0) {
      const paymentData = {
        phone: callbackData.CallbackMetadata.Item.find(
          (item) => item.Name === "PhoneNumber"
        ).Value,
        amount: callbackData.CallbackMetadata.Item.find(
          (item) => item.Name === "Amount"
        ).Value,
        transactionId: callbackData.CallbackMetadata.Item.find(
          (item) => item.Name === "MpesaReceiptNumber"
        ).Value,
        transactionDate: callbackData.CallbackMetadata.Item.find(
          (item) => item.Name === "TransactionDate"
        ).Value,
      };

      // Save payment data to the database
      await Payment.create(paymentData);

      // Send success response back to Safaricom
      res.status(200).json({ message: "Payment processed successfully" });
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error processing callback:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;