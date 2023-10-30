<script setup>
import ElectricTable from "@/components/pages/so-dien/ElectricityTable.vue";
import { useElectricityStore } from "~/store/electricity";

// store
const electricityStore = useElectricityStore();

// state
const dataElectricity = ref(null);
const DateFilter = ref(null);

const getAllElectricity = async (params) => {
  try {
    params = params !== null ? params : "";
    const res = await electricityStore.getAllElectricity(params);
    if (res.data) {
      console.log(res.data.electricityUsages);
      dataElectricity.value = null;
      dataElectricity.value = res.data.electricityUsages;
    }
  } catch (error) {
    console.log(error);
  }
};
getAllElectricity(`monthDate=${formatMonthYear(Date())}`);

const onHandleDate = async (event) => {
  if (DateFilter.value == null) {
    return;
  }
  dataElectricity.value = null;
  getAllElectricity(`monthDate=${formatMonthYear(DateFilter._value)}`);
};
</script>
<template>
  <header class="tw-grid tw-grid-cols-5">
    <g-date-picker
      class="tw-pt-4"
      label="Theo tháng"
      @blur="onHandleDate($event)"
      v-model="DateFilter"
    ></g-date-picker>
  </header>
  <section>
    <ElectricTable v-if="dataElectricity !== null" :data="dataElectricity" />
  </section>
</template>
