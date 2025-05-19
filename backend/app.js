require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// TODO: Add routes here

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


const Weather = require('./models/Weather');

app.get('/api/weather', async (req, res) => {
const data = await Weather.find({});
res.json(data);
});