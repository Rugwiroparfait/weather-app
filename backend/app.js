require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const fetchWeather = require('./utils/fetchWeather');

const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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

// Add district-specific weather route
app.get('/api/weather/:district', async (req, res) => {
  try {
    const data = await Weather.findOne({ district: req.params.district });
    if (!data) {
      return res.status(404).json({ error: 'District not found' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch district weather data' });
  }
});

// Import and use the chatbot route
const chatbotRoutes = require('./routes/chatbot');
app.use('/api/chatbot', chatbotRoutes);

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