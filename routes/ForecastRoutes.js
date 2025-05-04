const express = require('express');
const axios = require('axios');
const router = express.Router();

const NUM_DAYS = 30; // Number of days per forecast

// 🧠 Logic-based staff recommendation
function getStaffRecommendation(predictedSales, dayOfWeek) {
  if (dayOfWeek === 5 || dayOfWeek === 6 || predictedSales > 120000) {
    return 14;
  } else if (predictedSales > 100000) {
    return 12;
  } else if (predictedSales > 80000) {
    return 10;
  } else {
    return 8;
  }
}

router.post('/month', async (req, res) => {
  try {
    const { month } = req.body;

    if (!month || month < 1 || month > 12) {
      return res.status(400).json({ error: 'Invalid month value' });
    }

    const allPredictions = [];
    let totalSales = 0;
    let totalWaste = 0;

    for (let i = 0; i < NUM_DAYS; i++) {
      const dayOfWeek = Math.floor(Math.random() * 7);

      const inputFeatures = [
        10, // staff_count placeholder
        400, // inventory_level
        50 + Math.floor(Math.random() * 50),  // kottu_sold
        5 + Math.floor(Math.random() * 5),    // kottu_waste
        60 + Math.floor(Math.random() * 40),  // rice_and_curry_sold
        6 + Math.floor(Math.random() * 5),    // rice_and_curry_waste
        35 + Math.floor(Math.random() * 20),  // string_hoppers_sold
        4 + Math.floor(Math.random() * 4),    // string_hoppers_waste
        40 + Math.floor(Math.random() * 30),  // fried_rice_sold
        5 + Math.floor(Math.random() * 4),    // fried_rice_waste
        30 + Math.floor(Math.random() * 20),  // egg_hopper_sold
        3 + Math.floor(Math.random() * 3),    // egg_hopper_waste
        month,
        dayOfWeek
      ];

      try {
        const response = await axios.post('http://127.0.0.1:5001/predict', {
          features: inputFeatures
        });

        const { predicted_sales, predicted_food_waste } = response.data;

        if (predicted_sales == null || predicted_food_waste == null) {
          console.warn(`❗ Warning: No prediction received for day ${i + 1}`, response.data);
        }

        const staffNeeded = getStaffRecommendation(predicted_sales, dayOfWeek);

        allPredictions.push({
          day: i + 1,
          predicted_sales,
          predicted_food_waste,
          recommended_staff: staffNeeded
        });

        totalSales += predicted_sales || 0;
        totalWaste += predicted_food_waste || 0;

      } catch (err) {
        console.error(`❌ Error on day ${i + 1}:`, err.message);
        allPredictions.push({
          day: i + 1,
          error: true
        });
      }
    }

    res.json({
      month,
      days: NUM_DAYS,
      total_sales: Math.round(totalSales),
      avg_daily_sales: Math.round(totalSales / NUM_DAYS),
      total_food_waste: Math.round(totalWaste),
      avg_daily_waste: (totalWaste / NUM_DAYS).toFixed(2),
      breakdown: allPredictions
    });

  } catch (err) {
    console.error('❌ Forecast route failed:', err.message);
    res.status(500).json({ error: 'Forecast generation failed' });
  }
});

module.exports = router;
