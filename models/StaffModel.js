const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  staff_role: { type: String, required: true },
  total_staff: { type: Number, required: true },
  shift_hours: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Staff", StaffSchema);