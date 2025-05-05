const express = require("express");
const router = express.Router();
const StaffPlan = require("../models/StaffModel");

// ✅ Get all staff plans
router.get("/", async (req, res) => {
  try {
    const plans = await StaffPlan.find().sort({ date: 1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get staff plan by date
router.get("/:date", async (req, res) => {
  try {
    const plan = await StaffPlan.findOne({ date: req.params.date });
    if (!plan) return res.status(404).json({ error: "Not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create or update staff plan
router.post("/", async (req, res) => {
  const { date, requiredStaff, actualStaff } = req.body;
  if (!date || requiredStaff === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let plan = await StaffPlan.findOne({ date });
    if (plan) {
      // Update existing
      plan.requiredStaff = requiredStaff;
      if (actualStaff !== undefined) {
        plan.actualStaff = actualStaff;
      }
      await plan.save();
    } else {
      // Create new
      plan = await StaffPlan.create({ date, requiredStaff, actualStaff });
    }

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update actual staff by ID
router.put("/:id", async (req, res) => {
  const { actualStaff } = req.body;

  if (actualStaff === undefined) {
    return res.status(400).json({ error: "Missing actualStaff value" });
  }

  try {
    const updated = await StaffPlan.findByIdAndUpdate(
      req.params.id,
      { actualStaff },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Staff plan not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Failed to update actualStaff:", err.message);
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
