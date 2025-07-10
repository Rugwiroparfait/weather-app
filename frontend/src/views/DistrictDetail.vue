<template>
  <div class="container mt-4">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    
    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>{{ weatherData.district }} Weather Details</h1>
        <router-link to="/dashboard" class="btn btn-outline-primary">
          Back to Dashboard
        </router-link>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <WeatherCard :weather="weatherData" :detailed="true" />
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header bg-light">
              <h5 class="card-title">Additional Information</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Coordinates
                  <span>{{ getCoordinates() }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Province
                  <span>{{ getProvince() }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-12">
          <WeatherChart 
            :district="weatherData.district" 
            :weatherData="weatherData"
            :loading="loading" 
          />
        </div>
      </div>

      <WeatherChatbot :currentWeather="weatherData" />
    </div>
  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
import WeatherChart from '@/components/WeatherChart.vue'
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
  name: 'DistrictDetailView',
  components: {
    WeatherCard,
    WeatherChart,
    WeatherChatbot
  },
  data() {
    return {
      weatherData: {},
      loading: true,
      error: null,
      districtCoordinates: {}
    }
  },
  async created() {
    try {
      const districtName = this.$route.params.district;
      const response = await weatherService.getWeatherByDistrict(districtName);
      this.weatherData = response.data;
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load district weather data. Please try again later.';
      this.loading = false;
      console.error('Error fetching district weather data:', err);
    }
  },
  methods: {
    getCoordinates() {
      // In a real app, you would get this from your district data
      return "Lat: -1.xxxx, Lon: 30.xxxx";
    },
    getProvince() {
      return PROVINCE_MAP[this.weatherData.district] || 'Unknown Province';
    }
  }
}
</script>