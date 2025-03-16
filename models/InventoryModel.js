const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  quantity_available: { type: Number, required: true },
  restock_date: { type: Date, required: true },
  supplier: { type: String, required: true },
});

module.exports = mongoose.model("Inventory", InventorySchema);