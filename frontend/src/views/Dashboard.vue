<template>
  <div class="container mt-4">
    <h1>Weather Dashboard</h1>
    
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    
    <div v-else>
      <div class="row mb-4">
        <div class="col-md-4">
          <DistrictFilter @filter-change="applyFilters" />
          
          <div class="card mt-4">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">Weather Statistics</h5>
            </div>
            <div class="card-body">
              <p><strong>Total Districts:</strong> {{ filteredWeatherData.length }}</p>
              <p><strong>Average Temperature:</strong> {{ averageTemperature }}°C</p>
              <p><strong>Average Humidity:</strong> {{ averageHumidity }}%</p>
              <p><strong>Highest Temperature:</strong> {{ highestTemperature }}°C ({{ highestTempDistrict }})</p>
              <p><strong>Lowest Temperature:</strong> {{ lowestTemperature }}°C ({{ lowestTempDistrict }})</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6 mb-4" v-for="weather in filteredWeatherData" :key="weather.district">
              <WeatherCard 
                :weather="weather" 
                :detailed="false" 
                @click="goToDetail(weather.district)"
              />
            </div>
          </div>
        </div>
      </div>
      
      <WeatherChatbot :currentWeather="selectedDistrict" />
    </div>
  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
import DistrictFilter from '@/components/DistrictFilter.vue'
import WeatherChatbot from '@/components/WeatherChatbot.vue'
import weatherService from '@/services/weatherService'

// District province mapping (simplified)
const PROVINCE_MAP = {
  'Gasabo': 'Kigali Province',
  'Kicukiro': 'Kigali Province',
  'Nyarugenge': 'Kigali Province',
  'Burera': 'Northern Province',
  'Gakenke': 'Northern Province',
  'Gicumbi': 'Northern Province',
  'Musanze': 'Northern Province',
  'Rulindo': 'Northern Province',
  // Add the rest of the mappings
};

export default {
  name: 'DashboardView',
  components: {
    WeatherCard,
    DistrictFilter,
    WeatherChatbot
  },
  data() {
    return {
      weatherData: [],
      filteredWeatherData: [],
      loading: true,
      error: null,
      filters: {
        searchQuery: '',
        province: '',
        sortBy: 'name'
      },
      selectedDistrict: null
    }
  },
  computed: {
    averageTemperature() {
      if (this.filteredWeatherData.length === 0) return 'N/A';
      const sum = this.filteredWeatherData.reduce((acc, item) => acc + item.temperature, 0);
      return (sum / this.filteredWeatherData.length).toFixed(1);
    },
    averageHumidity() {
      if (this.filteredWeatherData.length === 0) return 'N/A';
      const sum = this.filteredWeatherData.reduce((acc, item) => acc + item.humidity, 0);
      return Math.round(sum / this.filteredWeatherData.length);
    },
    highestTemperature() {
      if (this.filteredWeatherData.length === 0) return 'N/A';
      const highest = Math.max(...this.filteredWeatherData.map(item => item.temperature));
      return highest.toFixed(1);
    },
    lowestTemperature() {
      if (this.filteredWeatherData.length === 0) return 'N/A';
      const lowest = Math.min(...this.filteredWeatherData.map(item => item.temperature));
      return lowest.toFixed(1);
    },
    highestTempDistrict() {
      if (this.filteredWeatherData.length === 0) return '';
      const highest = Math.max(...this.filteredWeatherData.map(item => item.temperature));
      const district = this.filteredWeatherData.find(item => item.temperature === highest);
      return district ? district.district : '';
    },
    lowestTempDistrict() {
      if (this.filteredWeatherData.length === 0) return '';
      const lowest = Math.min(...this.filteredWeatherData.map(item => item.temperature));
      const district = this.filteredWeatherData.find(item => item.temperature === lowest);
      return district ? district.district : '';
    }
  },
  async created() {
    try {
      const response = await weatherService.getAllWeather();
      this.weatherData = response.data;
      this.filteredWeatherData = [...this.weatherData];
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load weather data. Please try again later.';
      this.loading = false;
      console.error('Error fetching weather data:', err);
    }
  },
  methods: {
    applyFilters(filters) {
      this.filters = filters;
      
      // Filter by search query
      let filtered = this.weatherData;
      if (this.filters.searchQuery) {
        const query = this.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(item => 
          item.district.toLowerCase().includes(query)
        );
      }
      
      // Filter by province
      if (this.filters.province) {
        filtered = filtered.filter(item => 
          PROVINCE_MAP[item.district] === this.filters.province
        );
      }
      
      // Sort results
      if (this.filters.sortBy === 'name') {
        filtered.sort((a, b) => a.district.localeCompare(b.district));
      } else if (this.filters.sortBy === 'temperature') {
        filtered.sort((a, b) => b.temperature - a.temperature);
      } else if (this.filters.sortBy === 'humidity') {
        filtered.sort((a, b) => b.humidity - a.humidity);
      }
      
      this.filteredWeatherData = filtered;
    },
    goToDetail(district) {
      // Set selected district for chatbot context
      this.selectedDistrict = this.weatherData.find(w => w.district === district);
      this.$router.push({ name: 'districtDetail', params: { district } });
    }
  }
}
</script>