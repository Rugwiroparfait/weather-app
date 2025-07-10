<template>
  <div class="card mb-3" :class="{ 'card-hover': !detailed }" @click="handleClick">
    <div class="card-header bg-light d-flex justify-content-between align-items-center">
      <h5 class="card-title mb-0">{{ weather.district }}</h5>
      <router-link v-if="!detailed" :to="`/district/${weather.district}`" class="btn btn-sm btn-outline-primary">
        Details
      </router-link>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="temperature display-4 mb-2">
            {{ weather.temperature }}°C
          </div>
          <div class="description mb-2">
            {{ weather.description }}
          </div>
          <div v-if="detailed" class="text-muted">
            <small>Feels like: {{ weather.temperature + Math.random() - 0.5 }}°C</small>
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
            <li v-if="detailed" class="list-group-item d-flex justify-content-between align-items-center">
              Pressure
              <span class="badge bg-primary rounded-pill">1015 hPa</span>
            </li>
            <li v-if="detailed" class="list-group-item d-flex justify-content-between align-items-center">
              Visibility
              <span class="badge bg-primary rounded-pill">10 km</span>
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
    },
    detailed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    handleClick() {
      if (!this.detailed) {
        this.$emit('click', this.weather.district);
      }
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
.card-hover {
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
</style>