const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /api/predict
router.post('/', async (req, res) => {
  try {
    const { features } = req.body;

    const response = await axios.post('http://127.0.0.1:5001/predict', {
      features: features,
    });

    res.json({
      predicted_sales: response.data.predicted_sales,
      predicted_food_waste: response.data.predicted_food_waste,
    });
  } catch (error) {
    console.error('Prediction error:', error.message);
    // Add this to see the full error in terminal
    console.error(error.response?.data || error.toString());
    res.status(500).json({ error: 'Prediction failed' });
  }
});

module.exports = router;
