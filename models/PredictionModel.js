const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  predicted_sales: { type: Number, required: true },
  predicted_food_waste: { type: Number, required: true },
  required_staff: { type: Number, required: true },
  inventory_needs: { type: Object, required: true },
});

module.exports = mongoose.model("Prediction", PredictionSchema);
