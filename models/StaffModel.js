const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true,
  },
  requiredStaff: {
    type: Number,
    required: true,
  },
  actualStaff: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("StaffPlan", StaffSchema);
