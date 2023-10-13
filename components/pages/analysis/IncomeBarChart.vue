<script setup>
import { Bar } from "vue-chartjs";
const chartData = ref({
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 50, 10],
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
