const express = require("express");
const router = express.Router();
const Event = require("../models/EventSchema");
const cloudinary = require("../utils/cloudinary");

// GET Events route
router.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving events", error: err });
  }
});

// Create event route
router.post("/api/events", async (req, res) => {
  const { title, image, date, description, venue, vip, regular } = req.body;

  try {
    let imageUrl = "";

    // Upload image to Cloudinary if provided
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "tiketa",
      });
      imageUrl = uploadResponse.secure_url;
    }

    // Create a new event
    const newEvent = new Event({
      title,
      image: imageUrl,
      date,
      description,
      venue,
      vip,
      regular,
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    // Respond with success and the image URL
    res.status(201).json({ message: "Event created successfully", savedEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
