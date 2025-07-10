<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <i class="bi bi-cloud-sun me-2 fs-3"></i>
          <span class="fw-bold">Rwanda Weather</span>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/">
                <i class="bi bi-house-door me-1"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/dashboard">
                <i class="bi bi-speedometer2 me-1"></i> Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/map">
                <i class="bi bi-map me-1"></i> Map View
              </router-link>
            </li>
            <li class="nav-item">
              <a href="https://github.com/Rugwiroparfait/weather-app" 
                 target="_blank" 
                 class="nav-link d-flex align-items-center">
                <i class="bi bi-github me-1"></i> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(to right, #0d6efd, #0b5ed7) !important;
  padding: 0.8rem 1rem;
}

.navbar-brand {
  font-size: 1.4rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  margin: 0 0.2rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: all 0.3s;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.router-link-active::after {
  width: 70%;
}
</style>