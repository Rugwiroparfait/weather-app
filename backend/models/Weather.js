const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  district: { type: String, required: true, unique: true },
  temperature: Number,     // Celsius
  humidity: Number,        // Percentage
  windSpeed: Number,       // km/h or m/s (choose unit)
  description: String,     // e.g., "Clear", "Rainy"
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);
