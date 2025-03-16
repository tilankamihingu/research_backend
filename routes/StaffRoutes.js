const express = require("express");
const router = express.Router();
const Staff = require("../models/StaffModel");

// ➤ Get all staff data
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Add new staff record
router.post("/", async (req, res) => {
  const newStaff = new Staff(req.body);
  try {
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
