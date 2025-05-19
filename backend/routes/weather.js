const express = require('express');
const Weather = require('../models/Weather');

const router = express.Router();

// Get weather data for all districts
router.get('/', async (req, res) => {
  try {
    const data = await Weather.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching weather data' });
  }
});

// Get weather data for a single district
router.get('/:district', async (req, res) => {
  try {
    const data = await Weather.findOne({ district: req.params.district });
    if (!data) return res.status(404).json({ error: 'District not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching district weather' });
  }
});

// Update or create weather data for a district (POST)
router.post('/', async (req, res) => {
  const { district, temperature, humidity, windSpeed, description } = req.body;

  if (!district) return res.status(400).json({ error: 'District is required' });

  try {
    const weather = await Weather.findOneAndUpdate(
      { district },
      { temperature, humidity, windSpeed, description, lastUpdated: new Date() },
      { new: true, upsert: true }
    );
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: 'Server error updating weather data' });
  }
});

module.exports = router;
