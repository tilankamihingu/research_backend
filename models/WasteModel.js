const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  total_waste: { type: Number, required: true },
  category_waste: {
    Vegetables: { type: Number, default: 0 },
    Meat: { type: Number, default: 0 },
    Dairy: { type: Number, default: 0 },
    Bread: { type: Number, default: 0 },
  },
  waste_reduction_tips: { type: String, required: true },
});

module.exports = mongoose.model("Waste", WasteSchema);
