const express = require("express");
const router = express.Router();
const Prediction = require("../models/PredictionModel");

// ➤ Get all AI Predictions
router.get("/", async (req, res) => {
  try {
    const predictions = await Prediction.find();
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Endpoint for AI Model to send predictions
router.post("/", async (req, res) => {
  const { date, food_predictions, staff_required, inventory_suggestions } = req.body;

  // Create new Prediction document
  const newPrediction = new Prediction({
    date,
    food_predictions,
    staff_required,
    inventory_suggestions,
  });

  try {
    const savedPrediction = await newPrediction.save();
    res.status(201).json(savedPrediction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
