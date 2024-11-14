const express = require("express");
const router = express.Router();
const Event = require("../models/EventSchema");

// GET Events route
router.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving events", error: err });
  }
});

module.exports = router;
