// routes/FoodAnalyticsRoutes.js
const express = require("express");
const router = express.Router();

// Simulated Data Source (Replace with DB queries later)
const foodAnalyticsData = [
  { name: "Kottu", sold: 420, waste: 45 },
  { name: "Rice & Curry", sold: 540, waste: 60 },
  { name: "String Hoppers", sold: 180, waste: 20 },
  { name: "Fried Rice", sold: 250, waste: 15 },
  { name: "Egg Hopper", sold: 120, waste: 40 }
];

router.post("/food", async (req, res) => {
    const { month } = req.body; // or use req.query.month
  
    try {
      // Later: Query MongoDB by month
      // Example: { date: { $regex: `^2025-${month}` } }
  
      // Simulate filter for now:
      const filteredData = foodAnalyticsData.map((item) => ({
        ...item,
        // Assume slight variation for simulation
        sold: Math.floor(item.sold * (month / 12)),
        waste: Math.floor(item.waste * (month / 12)),
      }));
  
      const analytics = filteredData.map((item) => {
        const costRatio = item.sold > 0 ? ((item.waste / item.sold) * 100).toFixed(2) : "0.00";
        return {
          name: item.name,
          total_sold: item.sold,
          total_waste: item.waste,
          cost_ratio: parseFloat(costRatio)
        };
      });
  
      res.json(analytics);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });
  

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const FoodDailyData = require("../models/FoodDailyData");

// router.post("/food", async (req, res) => {
//   const { month } = req.body;
//   if (!month) return res.status(400).json({ error: "Month is required" });

//   try {
//     const monthStr = month.toString().padStart(2, "0");

//     // Fetch all food data for the selected month (e.g., "2025-12")
//     const data = await FoodDailyData.find({
//       date: { $regex: `^2025-${monthStr}` }
//     });

//     // Group by food item
//     const foodMap = {};
//     data.forEach((entry) => {
//       if (!foodMap[entry.food]) {
//         foodMap[entry.food] = { sold: 0, waste: 0 };
//       }
//       foodMap[entry.food].sold += entry.sold;
//       foodMap[entry.food].waste += entry.waste;
//     });

//     // Format output
//     const result = Object.entries(foodMap).map(([name, values]) => {
//       const costRatio = values.sold > 0 ? ((values.waste / values.sold) * 100).toFixed(2) : "0.00";
//       return {
//         name,
//         total_sold: values.sold,
//         total_waste: values.waste,
//         cost_ratio: parseFloat(costRatio)
//       };
//     });

//     res.json(result);
//   } catch (err) {
//     console.error("❌ DB error:", err.message);
//     res.status(500).json({ error: "Failed to fetch analytics" });
//   }
// });

// module.exports = router;

