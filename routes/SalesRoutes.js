const express = require("express");
const router = express.Router();
const Sales = require("../models/SalesModel");

// ➤ Get all sales data
router.get("/", async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Add new sales record
router.post("/", async (req, res) => {
  const newSale = new Sales(req.body);
  try {
    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;