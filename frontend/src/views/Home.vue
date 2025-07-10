<template>
  <div class="home-container">
    <!-- Hero Section -->
    <div class="hero-section py-5 mb-5 bg-primary text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h1 class="display-4 fw-bold mb-3">Rwanda Weather App</h1>
            <p class="lead mb-4">
              Real-time weather information for all 31 districts of Rwanda, 
              delivered with precision and reliability.
            </p>
            <div class="d-flex gap-3">
              <router-link to="/dashboard" class="btn btn-light btn-lg px-4 py-2 fw-bold">
                <i class="bi bi-speedometer2 me-2"></i>View Dashboard
              </router-link>
              <a href="https://github.com/Rugwiroparfait/weather-app" 
                 target="_blank" 
                 class="btn btn-outline-light btn-lg px-4 py-2">
                <i class="bi bi-github me-2"></i>GitHub
              </a>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <img src="https://i.imgur.com/qTJ8xbr.png" alt="Rwanda Map" class="img-fluid rounded shadow-lg" style="max-height: 350px;">
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container mb-5">
      <h2 class="text-center mb-5 position-relative">
        <span class="badge bg-primary px-3 py-2 position-absolute" style="top: -15px; left: 50%; transform: translateX(-50%);">Features</span>
        What Makes Our Weather App Special?
      </h2>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 border-0">
            <div class="card-body text-center">
              <div class="feature-icon bg-primary text-white rounded-circle mb-3">
                <i class="bi bi-geo-alt fs-3"></i>
              </div>
              <h5 class="card-title">31 Districts Coverage</h5>
              <p class="card-text">
                Complete weather coverage for all districts across Rwanda's five provinces.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 border-0">
            <div class="card-body text-center">
              <div class="feature-icon bg-primary text-white rounded-circle mb-3">
                <i class="bi bi-clock-history fs-3"></i>
              </div>
              <h5 class="card-title">Real-Time Updates</h5>
              <p class="card-text">
                Weather data is updated hourly to ensure you always have the latest information.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 border-0">
            <div class="card-body text-center">
              <div class="feature-icon bg-primary text-white rounded-circle mb-3">
                <i class="bi bi-graph-up fs-3"></i>
              </div>
              <h5 class="card-title">Data Visualization</h5>
              <p class="card-text">
                Interactive charts and statistics to help you understand weather patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Call to Action -->
    <div class="container mb-5">
      <div class="card bg-light border-0">
        <div class="card-body p-5 text-center">
          <h3 class="mb-3">Ready to explore Rwanda's weather?</h3>
          <p class="mb-4">Access comprehensive weather data for all districts with our interactive dashboard.</p>
          <router-link to="/dashboard" class="btn btn-primary btn-lg px-5 py-2">
            Go to Dashboard
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #0d6efd, #0a58ca);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.1);
  top: -150px;
  right: -150px;
}

.hero-section::after {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.1);
  bottom: -100px;
  left: -100px;
}

.feature-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

h2 {
  padding-top: 2rem;
  margin-top: 2rem;
}
</style>