<template>
  <AppHeader />
  <router-view/>
</template>

<script>
import AppHeader from './components/Header.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

body {
  background-color: #f8f9fa;
}
</style>