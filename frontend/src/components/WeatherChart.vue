<template>
  <div class="card">
    <div class="card-header bg-info text-white">
      <h5 class="mb-0">Weather Trends: {{ district }}</h5>
    </div>
    <div class="card-body">
      <canvas ref="chartCanvas" height="200"></canvas>
      <div v-if="loading" class="text-center p-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'WeatherChart',
  props: {
    district: {
      type: String,
      required: true
    },
    weatherData: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    weatherData: {
      handler() {
        this.renderChart();
      },
      deep: true
    },
    district() {
      this.renderChart();
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Temperature (°C)',
              borderColor: '#ff6384',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              data: [],
              tension: 0.4,
              yAxisID: 'y'
            },
            {
              label: 'Humidity (%)',
              borderColor: '#36a2eb',
              backgroundColor: 'rgba(54, 162, 235, 0.1)',
              data: [],
              tension: 0.4,
              yAxisID: 'y1'
            },
            {
              label: 'Wind Speed (m/s)',
              borderColor: '#4bc0c0',
              backgroundColor: 'rgba(75, 192, 192, 0.1)',
              data: [],
              tension: 0.4,
              yAxisID: 'y2'
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Temperature (°C)'
              }
            },
            y1: {
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: 'Humidity (%)'
              }
            },
            y2: {
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: 'Wind Speed (m/s)'
              }
            }
          }
        }
      });
    },
    renderChart() {
      if (!this.chart) return;
      
      // Mock data for demonstration purposes
      // In a real app, you would fetch historical data from your API
      const dates = ['7 days ago', '6 days ago', '5 days ago', '4 days ago', 
                     '3 days ago', '2 days ago', 'Yesterday', 'Today'];
      
      const tempData = [
        this.weatherData.temperature - Math.random() * 3, 
        this.weatherData.temperature - Math.random() * 2,
        this.weatherData.temperature - Math.random(),
        this.weatherData.temperature + Math.random(),
        this.weatherData.temperature + Math.random() * 2,
        this.weatherData.temperature - Math.random(),
        this.weatherData.temperature - Math.random() * 0.5,
        this.weatherData.temperature
      ];
      
      const humidityData = [
        this.weatherData.humidity - Math.random() * 10,
        this.weatherData.humidity - Math.random() * 5,
        this.weatherData.humidity + Math.random() * 7,
        this.weatherData.humidity - Math.random() * 8,
        this.weatherData.humidity + Math.random() * 5,
        this.weatherData.humidity - Math.random() * 3,
        this.weatherData.humidity + Math.random() * 2,
        this.weatherData.humidity
      ];
      
      const windData = [
        this.weatherData.windSpeed + Math.random(),
        this.weatherData.windSpeed - Math.random(),
        this.weatherData.windSpeed + Math.random() * 2,
        this.weatherData.windSpeed - Math.random() * 0.8,
        this.weatherData.windSpeed + Math.random() * 1.2,
        this.weatherData.windSpeed - Math.random() * 0.5,
        this.weatherData.windSpeed + Math.random() * 0.3,
        this.weatherData.windSpeed
      ];
      
      this.chart.data.labels = dates;
      this.chart.data.datasets[0].data = tempData;
      this.chart.data.datasets[1].data = humidityData;
      this.chart.data.datasets[2].data = windData;
      this.chart.update();
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
</script>