<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  skills: {
    type: Array,
    required: true
  }
});

const chartRef = ref(null);
let chart = null;

const createChart = () => {
  const ctx = chartRef.value.getContext('2d');
  console.log("CSA", props.skills)
  const labels = props.skills.map(skill => skill.skill);
  const data = props.skills.map(skill => skill.star);

  chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Soft-Skill',
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
    chart.data.labels = props.skills.map(skill => skill.skill);
    chart.data.datasets[0].data = props.skills.map(skill => skill.star);
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