require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const fetchWeather = require('./utils/fetchWeather');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Simple test route
app.get('/', (req, res) => {
  res.send('Weather API running');
});

// Weather model and route
const Weather = require('./models/Weather');
app.get('/api/weather', async (req, res) => {
  try {
    const data = await Weather.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// 🕒 Run fetchWeather every hour
console.log('Initializing cron job...');
cron.schedule('0 * * * *', () => {
  console.log('⏰ Running scheduled weather fetch...');
  fetchWeather();
});

// 🏁 Start Express
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  // Optional: fetch on server start
  fetchWeather();
});