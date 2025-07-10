<template>
  <div class="dashboard-container">
    <!-- Dashboard Header -->
    <div class="bg-light py-4 mb-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="mb-2"><i class="bi bi-speedometer2 me-2"></i>Weather Dashboard</h1>
            <p class="text-muted mb-0">Real-time weather data for Rwanda's districts</p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="d-flex align-items-center justify-content-md-end gap-2">
              <span class="text-muted">Last updated:</span>
              <span class="badge bg-success px-3 py-2">
                {{ formatLastUpdate() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div v-if="loading" class="text-center my-5 py-5">
        <div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading weather data...</p>
      </div>
      
      <div v-else-if="error" class="alert alert-danger d-flex align-items-center" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
        <div>{{ error }}</div>
      </div>
      
      <div v-else>
        <div class="row mb-4">
          <div class="col-lg-3">
            <!-- District Filter -->
            <DistrictFilter @filter-change="applyFilters" />
            
            <!-- Weather Statistics Card -->
            <div class="card mb-4 border-0">
              <div class="card-header bg-success text-white">
                <div class="d-flex align-items-center">
                  <i class="bi bi-bar-chart-fill me-2 fs-5"></i>
                  <h5 class="mb-0">Weather Statistics</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="stat-item d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <span><i class="bi bi-grid me-2 text-muted"></i>Total Districts</span>
                  <span class="badge bg-primary rounded-pill">{{ filteredWeatherData.length }}</span>
                </div>
                
                <div class="stat-item d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <span><i class="bi bi-thermometer-half me-2 text-danger"></i>Average Temperature</span>
                  <span class="badge bg-danger rounded-pill">{{ averageTemperature }}°C</span>
                </div>
                
                <div class="stat-item d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <span><i class="bi bi-droplet-half me-2 text-info"></i>Average Humidity</span>
                  <span class="badge bg-info rounded-pill">{{ averageHumidity }}%</span>
                </div>
                
                <div class="stat-item d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <span><i class="bi bi-thermometer-high me-2 text-danger"></i>Highest Temperature</span>
                  <div>
                    <span class="badge bg-danger rounded-pill mb-1">{{ highestTemperature }}°C</span>
                    <div class="small text-muted">{{ highestTempDistrict }}</div>
                  </div>
                </div>
                
                <div class="stat-item d-flex align-items-center justify-content-between">
                  <span><i class="bi bi-thermometer-low me-2 text-primary"></i>Lowest Temperature</span>
                  <div>
                    <span class="badge bg-primary rounded-pill mb-1">{{ lowestTemperature }}°C</span>
                    <div class="small text-muted">{{ lowestTempDistrict }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-9">
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
  'Gisagara': 'Southern Province',
  'Huye': 'Southern Province',
  'Kamonyi': 'Southern Province',
  'Muhanga': 'Southern Province',
  'Nyamagabe': 'Southern Province',
  'Nyanza': 'Southern Province',
  'Nyaruguru': 'Southern Province',
  'Ruhango': 'Southern Province',
  'Bugesera': 'Eastern Province',
  'Gatsibo': 'Eastern Province',
  'Kayonza': 'Eastern Province',
  'Kirehe': 'Eastern Province',
  'Ngoma': 'Eastern Province',
  'Nyagatare': 'Eastern Province',
  'Rwamagana': 'Eastern Province',
  'Karongi': 'Western Province',
  'Ngororero': 'Western Province',
  'Nyabihu': 'Western Province',
  'Nyamasheke': 'Western Province',
  'Rubavu': 'Western Province',
  'Rutsiro': 'Western Province',
  'Rusizi': 'Western Province'
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
      selectedDistrict: null,
      lastUpdateTime: null
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
      
      // Set selected district for chatbot context
      if (this.weatherData && this.weatherData.length > 0) {
        this.selectedDistrict = this.weatherData[0];
      }
      
      // Store last update time
      this.lastUpdateTime = new Date();
      
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
    },
    formatLastUpdate() {
      if (!this.lastUpdateTime) return 'N/A';
      
      // Format the time in a user-friendly way
      const now = new Date();
      const diff = Math.floor((now - this.lastUpdateTime) / 1000); // Difference in seconds
      
      if (diff < 60) return 'Just now';
      if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
      
      return this.lastUpdateTime.toLocaleString();
    }
  }
}
</script>

<style scoped>
.stat-item {
  font-size: 0.95rem;
}
</style>