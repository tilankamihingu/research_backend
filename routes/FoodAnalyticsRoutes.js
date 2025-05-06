// routes/FoodAnalyticsRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const dishes = [
  "kottu",
  "rice_and_curry",
  "string_hoppers",
  "fried_rice",
  "egg_hopper"
];

// Template input features for prediction
function buildFeatures(dish, month) {
  const features = {
    staff_count: 10,
    inventory_level: 100,
    kottu_sold: 0, kottu_waste: 0,
    rice_and_curry_sold: 0, rice_and_curry_waste: 0,
    string_hoppers_sold: 0, string_hoppers_waste: 0,
    fried_rice_sold: 0, fried_rice_waste: 0,
    egg_hopper_sold: 0, egg_hopper_waste: 0,
    month: month,
    day_of_week: 3
  };

  features[`${dish}_sold`] = 100;
  features[`${dish}_waste`] = 10;

  return features;
}

router.post("/food", async (req, res) => {
  const { month } = req.body;
  if (!month) return res.status(400).json({ error: "Month is required" });

  try {
    const results = [];

    for (const dish of dishes) {
      const features = buildFeatures(dish, month);

      const response = await axios.post("http://localhost:5001/predict", {
        features,
      });

      const predicted_sales = response.data.predicted_sales;
      const predicted_waste = response.data.predicted_food_waste;
      const waste_ratio = predicted_sales > 0
        ? ((predicted_waste / predicted_sales) * 100).toFixed(2)
        : "0.00";

      results.push({
        name: dish.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        predicted_sales: Math.round(predicted_sales),
        predicted_waste: Math.round(predicted_waste),
        waste_ratio: parseFloat(waste_ratio),
      });
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Error getting predictions:", err.message);
    res.status(500).json({ error: "Failed to get AI predictions" });
  }
});

module.exports = router;
