<template>
  <div class="weather-card card h-100 position-relative overflow-hidden border-0" 
       :class="{ 'card-hover': !detailed }" 
       @click="handleClick">
    <!-- Weather condition background indicator -->
    <div class="condition-indicator" :class="getWeatherClass()"></div>
    
    <!-- Card header -->
    <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
      <h5 class="card-title mb-0 fw-bold">
        {{ weather.district }}
        <span class="badge bg-light text-dark ms-2 small fw-normal">{{ getProvince() }}</span>
      </h5>
      <router-link v-if="!detailed" :to="`/district/${weather.district}`" class="btn btn-sm btn-outline-primary">
        <i class="bi bi-info-circle me-1"></i> Details
      </router-link>
    </div>
    
    <!-- Card body -->
    <div class="card-body">
      <div class="row g-0">
        <div class="col-md-6">
          <div class="temperature display-4 mb-2 fw-bold text-primary">
            {{ weather.temperature }}°C
          </div>
          <div class="description d-flex align-items-center mb-2">
            <i :class="getWeatherIcon()"></i>
            <span class="ms-2">{{ weather.description }}</span>
          </div>
          <div v-if="detailed" class="text-muted">
            <small>Feels like: {{ (weather.temperature + Math.random() - 0.5).toFixed(1) }}°C</small>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="list-group list-group-flush">
            <li class="list-group-item border-0 bg-transparent d-flex justify-content-between align-items-center px-0">
              <span><i class="bi bi-droplet-half text-info me-2"></i> Humidity</span>
              <span class="badge bg-info rounded-pill">{{ weather.humidity }}%</span>
            </li>
            <li class="list-group-item border-0 bg-transparent d-flex justify-content-between align-items-center px-0">
              <span><i class="bi bi-wind text-secondary me-2"></i> Wind Speed</span>
              <span class="badge bg-secondary rounded-pill">{{ weather.windSpeed }} m/s</span>
            </li>
            <li v-if="detailed" class="list-group-item border-0 bg-transparent d-flex justify-content-between align-items-center px-0">
              <span><i class="bi bi-speedometer2 text-warning me-2"></i> Pressure</span>
              <span class="badge bg-warning text-dark rounded-pill">1015 hPa</span>
            </li>
            <li v-if="detailed" class="list-group-item border-0 bg-transparent d-flex justify-content-between align-items-center px-0">
              <span><i class="bi bi-eye text-success me-2"></i> Visibility</span>
              <span class="badge bg-success rounded-pill">10 km</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Card footer -->
    <div class="card-footer bg-transparent border-0 text-muted">
      <small><i class="bi bi-clock me-1"></i> Last updated: {{ formatDate(weather.lastUpdated) }}</small>
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
    },
    getWeatherIcon() {
      const desc = this.weather.description ? this.weather.description.toLowerCase() : '';
      
      if (desc.includes('clear')) return 'bi bi-sun-fill text-warning fs-4';
      if (desc.includes('cloud')) return 'bi bi-cloud-fill text-secondary fs-4';
      if (desc.includes('rain') || desc.includes('drizzle')) return 'bi bi-cloud-rain-fill text-info fs-4';
      if (desc.includes('thunder')) return 'bi bi-cloud-lightning-fill text-warning fs-4';
      if (desc.includes('snow')) return 'bi bi-snow fs-4';
      if (desc.includes('mist') || desc.includes('fog')) return 'bi bi-cloud-fog-fill text-secondary fs-4';
      
      return 'bi bi-cloud text-secondary fs-4'; // Default icon
    },
    getWeatherClass() {
      const desc = this.weather.description ? this.weather.description.toLowerCase() : '';
      
      if (desc.includes('clear')) return 'sunny';
      if (desc.includes('cloud')) return 'cloudy';
      if (desc.includes('rain') || desc.includes('drizzle')) return 'rainy';
      if (desc.includes('thunder')) return 'stormy';
      if (desc.includes('snow')) return 'snowy';
      if (desc.includes('mist') || desc.includes('fog')) return 'misty';
      
      return 'default'; // Default class
    },
    getProvince() {
      const PROVINCE_MAP = {
        'Gasabo': 'Kigali',
        'Kicukiro': 'Kigali',
        'Nyarugenge': 'Kigali',
        'Burera': 'Northern',
        'Gakenke': 'Northern',
        'Gicumbi': 'Northern',
        'Musanze': 'Northern',
        'Rulindo': 'Northern',
        'Gisagara': 'Southern',
        'Huye': 'Southern',
        'Kamonyi': 'Southern',
        'Muhanga': 'Southern',
        'Nyamagabe': 'Southern',
        'Nyanza': 'Southern',
        'Nyaruguru': 'Southern',
        'Ruhango': 'Southern',
        'Bugesera': 'Eastern',
        'Gatsibo': 'Eastern',
        'Kayonza': 'Eastern',
        'Kirehe': 'Eastern',
        'Ngoma': 'Eastern',
        'Nyagatare': 'Eastern',
        'Rwamagana': 'Eastern',
        'Karongi': 'Western',
        'Ngororero': 'Western',
        'Nyabihu': 'Western',
        'Nyamasheke': 'Western',
        'Rubavu': 'Western',
        'Rutsiro': 'Western',
        'Rusizi': 'Western'
      };
      
      return PROVINCE_MAP[this.weather.district] || '';
    }
  }
}
</script>

<style scoped>
.weather-card {
  border-radius: 10px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card-hover {
  cursor: pointer;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.temperature {
  font-weight: bold;
  line-height: 1;
}

.description {
  text-transform: capitalize;
}

.condition-indicator {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 7px;
}

.condition-indicator.sunny {
  background-color: #ffc107;
}

.condition-indicator.cloudy {
  background-color: #6c757d;
}

.condition-indicator.rainy {
  background-color: #0dcaf0;
}

.condition-indicator.stormy {
  background-color: #fd7e14;
}

.condition-indicator.snowy {
  background-color: #f8f9fa;
}

.condition-indicator.misty {
  background-color: #adb5bd;
}

.condition-indicator.default {
  background-color: #0d6efd;
}

.card-title {
  padding-left: 8px;
}

.list-group-item {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>