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
  },
  
  // Get historical weather data (mock implementation)
  getHistoricalData(district, days = 7) {
    // In a real app, you'd implement this endpoint on your backend
    // For now, we'll use a promise that resolves with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            district,
            days: days,
            data: Array(days).fill().map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (days - i - 1));
              
              return {
                date: date.toISOString().split('T')[0],
                temperature: 20 + Math.random() * 10,
                humidity: 50 + Math.random() * 30,
                windSpeed: 2 + Math.random() * 6,
                description: ['Sunny', 'Cloudy', 'Rainy', 'Clear', 'Partly cloudy'][Math.floor(Math.random() * 5)]
              };
            })
          }
        });
      }, 500);
    });
  }
};