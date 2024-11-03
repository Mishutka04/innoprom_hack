<template>
  <div class="chart-container" v-if="skills">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

const props = defineProps({
  skills: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: true // Указывает, что этот пропс обязателен
  }
});

const chartRef = ref(null);
let chart = null;

const createChart = async () => {
  const ctx = chartRef.value.getContext('2d');
  const labels = [];
  const data = [];
  const names = ["Soft", "Soft","Hard"]
  for (let i = 0; i < Object.keys(props.skills).length; i++) {
    labels.push(props.skills[i].skill)
    data.push(props.skills[i].star)
  }
  chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: names[props.id],
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: 5
        }
      }
    }
  });
};


const updateChart = () => {
  if (chart) {
    for (let i = 0; i < Object.keys(props.skills).length; i++) {
      labels.push(props.skills[i].skill)
      data.push(props.skills[i].star)
    }
    chart.update();
  }
};

onMounted(() => {
  createChart();
});

watch(() => props.skills, () => {
  updateChart();
}, { deep: true });
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>