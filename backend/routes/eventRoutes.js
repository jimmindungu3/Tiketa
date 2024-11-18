const express = require("express");
const router = express.Router();
const Event = require("../models/EventSchema");
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const myJwtSecret = process.env.SECRET_KEY;

// GET Events route
router.get("/api/events", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  try {
    let events = await Event.find().skip(skip).limit(limit);
    if (events.length === 0 && page !== 1) {
      events = await Event.find().limit(limit);
    }
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving events", error: err });
  }
});

router.post("/api/events", async (req, res) => {
  const jwtToken = req.cookies.jwt;

  if (jwtToken) {
    try {
      const decoded = jwt.verify(jwtToken, myJwtSecret);

      if (!decoded || !decoded.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { title, image, date, description, venue, vip, regular } = req.body;

      let imageUrl = "";

      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          upload_preset: "tiketa",
        });
        imageUrl = uploadResponse.secure_url;
      }

      const newEvent = new Event({
        title,
        image: imageUrl,
        date,
        description,
        venue,
        vip,
        regular,
      });

      const savedEvent = await newEvent.save();

      res
        .status(201)
        .json({ message: "Event created successfully", savedEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ message: "Protected route! Please login" });
  }
});

module.exports = router;
