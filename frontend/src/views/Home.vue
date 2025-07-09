<template>
  <div class="container mt-4">
    <div class="jumbotron p-5 bg-light rounded">
      <h1 class="display-4">Rwanda Weather API</h1>
      <p class="lead">
        Real-time weather information for all 31 districts of Rwanda
      </p>
      <hr class="my-4">
      <p>
        This comprehensive system delivers precise weather forecasts for every 
        administrative district in Rwanda by leveraging OpenWeatherMap API integration.
      </p>
      <router-link to="/dashboard" class="btn btn-primary btn-lg">
        View Dashboard
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'  // Changed from 'Home' to 'HomeView'
}
</script>