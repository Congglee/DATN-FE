<script setup>
import IncomeBarChart from "@/components/pages/analysis/IncomeBarChart.vue";
import CompareIncomePieChart from "@/components/pages/analysis/CompareIncomePieChart.vue";
</script>
<template>
  <div class="tw-grid tw-grid-cols-2 tw-gap-x-4">
    <div class="tw-p-10 tw-bg-white tw-rounded-xl">
      <IncomeBarChart />
    </div>
    <div class="tw-p-10 tw-bg-white tw-rounded-xl">
      <CompareIncomePieChart />
    </div>
  </div>
</template>
