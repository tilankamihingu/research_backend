const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import API routes
const salesRoutes = require("./routes/SalesRoutes");
const staffRoutes = require("./routes/StaffRoutes");
const inventoryRoutes = require("./routes/InventoryRoutes");
const predictionRoutes = require("./routes/PredictionRoutes");
const wasteRoutes = require("./routes/WasteRoutes");
const forecastRoutes = require('./routes/ForecastRoutes');

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Use Routes
app.use("/api/sales", salesRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/waste", wasteRoutes);
app.use('/api/forecast', forecastRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
