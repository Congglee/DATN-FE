<script setup>
import { Doughnut } from "vue-chartjs";
const data = {
  labels: ["Dịch vụ", "Tiền điện", "Tiền nước", "Tiền phòng"],
  datasets: [
    {
      data: [300, 50, 100, 500],
    },
  ],
};

const options = {};
</script>
<template>
  <div class="tw-max-h-[300px]">
    <span>Tổng doanh thu</span>
    <Doughnut :data="data" :options="options" />
  </div>
</template>
