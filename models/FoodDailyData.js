const mongoose = require("mongoose");

const FoodDailySchema = new mongoose.Schema({
  date: {
    type: String, // Format: "YYYY-MM-DD"
    required: true
  },
  food: {
    type: String,
    required: true
  },
  sold: {
    type: Number,
    required: true
  },
  waste: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("FoodDailyData", FoodDailySchema);
