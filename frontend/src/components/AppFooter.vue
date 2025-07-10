<template>
  <footer class="footer mt-5 py-4 bg-dark text-light">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-3">Rwanda Weather App</h5>
          <p class="small">
            An open-source project providing real-time meteorological data for all 31 districts of Rwanda.
            Built with Vue.js, Express.js, and MongoDB.
          </p>
        </div>
        
        
        
        <div class="col-md-4">
          <h5 class="text-uppercase mb-3">Contributor</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <i class="bi bi-person-circle me-2"></i>Rugwiro Parfait
            </li>
            <li class="mb-2">
              <a href="mailto:rugwiroparfait003@gmail.com" class="text-light">
                <i class="bi bi-envelope me-2"></i>rugwiroparfait003@gmail.com
              </a>
            </li>
            <li class="mb-2">
              <a href="tel:+250788783057" class="text-light">
                <i class="bi bi-telephone me-2"></i>+250 788 783 057
              </a>
            </li>
            <li class="mb-2">
              <a href="https://github.com/Rugwiroparfait" target="_blank" class="text-light">
                <i class="bi bi-github me-2"></i>GitHub Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-top border-secondary pt-3 mt-3 text-center">
        <p class="small mb-0">
          &copy; {{ new Date().getFullYear() }} Rwanda Weather API. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(to right, #212529, #343a40);
}

.footer a {
  text-decoration: none;
  transition: color 0.2s;
}

.footer a:hover {
  color: #0d6efd !important;
}

.footer h5 {
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer h5::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 50px;
  background-color: #0d6efd;
}
</style>