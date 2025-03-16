const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  sales: { type: Number, required: true },
  food_waste: { type: Number, required: true },
  staff_count: { type: Number, required: true },
  inventory_level: { type: Number, required: true },
  items: {
    Pizza: { type: Number, default: 0 },
    Burger: { type: Number, default: 0 },
    Pasta: { type: Number, default: 0 },
    Salad: { type: Number, default: 0 },
    Sushi: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Sales", SalesSchema);
