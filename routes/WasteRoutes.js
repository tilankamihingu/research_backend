const express = require("express");
const router = express.Router();
const Waste = require("../models/WasteModel");

// ➤ Get all waste analytics
router.get("/", async (req, res) => {
  try {
    const wasteData = await Waste.find();
    res.json(wasteData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Add waste record
router.post("/", async (req, res) => {
  const newWaste = new Waste(req.body);
  try {
    const savedWaste = await newWaste.save();
    res.status(201).json(savedWaste);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
