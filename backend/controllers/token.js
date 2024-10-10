const axios = require("axios");
const Event = require("../models/EventSchema");

require("dotenv").config();

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

const createSTKToken = async (req, res, next) => {
  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`, // Ensure this is capitalized correctly
        },
      }
    );

    // Store the token in the request object and call next
    req.token = response.data.access_token;
    // console.log(response.data);
    next();

    // handle errors in generating token
  } catch (error) {
    console.log("Error generating token:");
    res.status(500).json({ message: "Failed to generate token" });
  }
};

const stkPush = async (req, res) => {
  // calculate amount client will pay
  const event = await Event.findById(req.body.eventID);

  const amount =
    parseInt(req.body.vipCount) * event.vip +
    parseInt(req.body.regularCount) * event.regular;

  const shortCode = 174379;
  const phone = req.body.phone.substring(1);
  const passKey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const password = new Buffer.from(shortCode + passKey + timestamp).toString(
    "base64"
  );

  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: shortCode,
    PhoneNumber: `254${phone}`,
    CallBackURL: "https://mydomain.com/path",
    AccountReference: "Mpesa Test",
    TransactionDesc: "Testing stk push",
  };

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${req.token}`,
      },
    })
    .then((data) => {
      // console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err.message);
    });
};

module.exports = { createSTKToken, stkPush };
