const axios = require('axios');
const Weather = require('../models/Weather');
const districts = require('../data/districtData');

async function fetchWeatherForDistrict(district) {
  const { lat, lon, name } = district;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

  try {
    const { data } = await axios.get(url);
    const weatherData = {
      district: name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      lastUpdated: new Date(),
    };
    await Weather.findOneAndUpdate({ district: name }, weatherData, { upsert: true });
    console.log(`✅ Updated weather for ${name}`);
  } catch (err) {
    console.error(`❌ Failed to fetch ${name}:`, err.message);
  }
}

module.exports = async function fetchWeather() {
  for (const district of districts) {
    await fetchWeatherForDistrict(district);
  }
};