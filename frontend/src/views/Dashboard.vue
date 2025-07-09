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
      <div class="row">
        <div class="col-md-6 mb-4" v-for="weather in weatherData" :key="weather.district">
          <WeatherCard :weather="weather" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
import weatherService from '@/services/weatherService'

export default {
  name: 'DashboardView',
  components: {
    WeatherCard
  },
  data() {
    return {
      weatherData: [],
      loading: true,
      error: null
    }
  },
  async created() {
    try {
      const response = await weatherService.getAllWeather();
      this.weatherData = response.data;
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load weather data. Please try again later.';
      this.loading = false;
      console.error('Error fetching weather data:', err);
    }
  }
}
</script>