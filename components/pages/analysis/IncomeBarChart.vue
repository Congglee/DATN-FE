<script setup>
import { Bar } from "vue-chartjs";
const chartData = ref({
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [1000000, 2000000, 1200000, 1500000, 1000000],
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
});
</script>
<template>
  <div class="tw-max-h-[300px]">
    <span>Doanh thu 5 tháng gần nhất</span>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
