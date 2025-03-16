const express = require("express");
const router = express.Router();
const Inventory = require("../models/InventoryModel");

// ➤ Get all inventory items
router.get("/", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Add new inventory item
router.post("/", async (req, res) => {
  const newItem = new Inventory(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
