import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export default {
  // Get all weather data
  getAllWeather() {
    return axios.get(`${API_URL}/weather`);
  },

  // Get weather for a specific district
  getWeatherByDistrict(district) {
    return axios.get(`${API_URL}/weather/${district}`);
  }
};