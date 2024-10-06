const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define EventSchema
const EventSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
  date: { type: String },
  description: { type: String },
  venue: { type: String },
  vip: { type: Number },
  regular: { type: Number },
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
