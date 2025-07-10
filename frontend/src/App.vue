<template>
  <div class="app-container d-flex flex-column min-vh-100">
    <AppHeader />
    <main class="flex-grow-1">
      <router-view/>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --accent-color: #20c997;
}

body {
  background-color: #f8f9fa;
  font-family: 'Nunito', sans-serif;
  color: #333;
}

.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background: linear-gradient(to right, #0d6efd, #0b5ed7);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(to right, #0b5ed7, #0a58ca);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}

.table {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>