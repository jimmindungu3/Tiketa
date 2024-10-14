const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  transactionDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
