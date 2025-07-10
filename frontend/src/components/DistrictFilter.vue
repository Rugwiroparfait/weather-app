<template>
  <div class="card mb-4 border-0">
    <div class="card-header bg-primary text-white">
      <div class="d-flex align-items-center">
        <i class="bi bi-funnel-fill me-2 fs-5"></i>
        <h5 class="mb-0">Filter Districts</h5>
      </div>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <div class="input-group">
          <span class="input-group-text bg-light border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input 
            type="text" 
            class="form-control border-start-0"
            placeholder="Search by district name..." 
            v-model="searchQuery"
          >
        </div>
      </div>
      
      <div class="mb-3">
        <label class="form-label d-flex align-items-center">
          <i class="bi bi-geo-alt me-2 text-primary"></i>
          Province Filter
        </label>
        <select class="form-select" v-model="selectedProvince">
          <option value="">All Provinces</option>
          <option v-for="province in provinces" :key="province" :value="province">
            {{ province }}
          </option>
        </select>
      </div>
      
      <div class="mb-3">
        <label class="form-label d-flex align-items-center">
          <i class="bi bi-sort-alpha-down me-2 text-primary"></i>
          Sort By
        </label>
        <div class="btn-group w-100">
          <button 
            class="btn" 
            :class="sortBy === 'name' ? 'btn-primary' : 'btn-outline-primary'"
            @click="setSortBy('name')">
            <i class="bi bi-sort-alpha-down me-1"></i> Name
          </button>
          <button 
            class="btn" 
            :class="sortBy === 'temperature' ? 'btn-primary' : 'btn-outline-primary'"
            @click="setSortBy('temperature')">
            <i class="bi bi-thermometer-half me-1"></i> Temp
          </button>
          <button 
            class="btn" 
            :class="sortBy === 'humidity' ? 'btn-primary' : 'btn-outline-primary'"
            @click="setSortBy('humidity')">
            <i class="bi bi-droplet-half me-1"></i> Humidity
          </button>
        </div>
      </div>

      <!-- Reset Filters Button -->
      <button 
        class="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
        @click="resetFilters">
        <i class="bi bi-arrow-counterclockwise me-2"></i> Reset Filters
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DistrictFilter',
  data() {
    return {
      searchQuery: '',
      selectedProvince: '',
      sortBy: 'name',
      provinces: [
        'Kigali Province',
        'Northern Province',
        'Southern Province',
        'Eastern Province',
        'Western Province'
      ]
    }
  },
  watch: {
    searchQuery() {
      this.emitFilterChange();
    },
    selectedProvince() {
      this.emitFilterChange();
    },
    sortBy() {
      this.emitFilterChange();
    }
  },
  methods: {
    setSortBy(field) {
      this.sortBy = field;
    },
    emitFilterChange() {
      this.$emit('filter-change', {
        searchQuery: this.searchQuery,
        province: this.selectedProvince,
        sortBy: this.sortBy
      });
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedProvince = '';
      this.sortBy = 'name';
    }
  }
}
</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: #86b7fe;
}
</style>