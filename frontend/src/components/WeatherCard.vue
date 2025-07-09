// filepath: ~/Documents/Projects/weather-app/frontend/src/components/WeatherCard.vue
<template>
  <div class="card mb-3">
    <div class="card-header bg-light">
      <h5 class="card-title">{{ weather.district }}</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="temperature display-4 mb-2">
            {{ weather.temperature }}°C
          </div>
          <div class="description">
            {{ weather.description }}
          </div>
        </div>
        <div class="col-md-6">
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Humidity
              <span class="badge bg-primary rounded-pill">{{ weather.humidity }}%</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Wind Speed
              <span class="badge bg-primary rounded-pill">{{ weather.windSpeed }} m/s</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">
      Last updated: {{ formatDate(weather.lastUpdated) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  }
}
</script>

<style scoped>
.temperature {
  font-weight: bold;
}
.description {
  text-transform: capitalize;
}
</style>