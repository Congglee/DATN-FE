<script setup>
import ElectricTable from "@/components/pages/so-dien/ElectricityTable.vue";
import { useElectricityStore } from "~/store/electricity";
import { useMotelStore } from "@/store/motel";

// store
const electricityStore = useElectricityStore();
const motelStore = useMotelStore();

// state
const dataElectricity = ref(null);
const DateFilter = ref(null);
const MotelFilter = ref(null);
const DataMotels = ref(null);
const getAllMotels = async () => {
  try {
    const res = await motelStore.getMotels();
    if (res.data) {
      DataMotels.value = res.data.motels.map((motel) => ({
        title: motel.name,
        id: motel._id,
      }));
      MotelFilter.value = res.data.motels[0]?._id;
    }
  } catch (error) {}
};
getAllMotels();
const getAllElectricity = async (params) => {
  try {
    params = params !== null ? params : "";
    const res = await electricityStore.getAllElectricity(params);
    if (res.data) {
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
  getAllElectricity(
    `motel=${MotelFilter?._value}&monthDate=${formatMonthYear(
      DateFilter._value
    )}&limit=10&page=1`
  );
};

const onHandleMotels = async (event) => {
  MotelFilter.value = event.target.value;
  dataElectricity.value = null;
  try {
    getAllElectricity(
      `motel=${event.target.value}&monthDate=${formatMonthYear(
        DateFilter?._value
      )}&limit=10&page=1`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
</script>
<template>
  <header class="tw-grid tw-grid-cols-4 tw-items-end tw-gap-x-3">
    <g-date-picker
      class="tw-pt-4"
      label="Theo tháng"
      @blur="onHandleDate($event)"
      v-model="DateFilter"
    ></g-date-picker>
    <div class="tw-flex tw-flex-col tw-text-black">
      <h5 class="tw-text-[14px]">Nhà Trọ</h5>
      <select
        class="form-control tw-h-[38px] tw-border-gray-400 focus:tw-outline-none tw-px-2 tw-bg-white tw-text-[16px] tw-text-gray-600"
        style="
          border: 1px solid rgb(218, 218, 218) !important ;
          border-radius: 3px;
        "
        @change="onHandleMotels($event)"
      >
        <option value="" selected disabled>Chọn nhà trọ</option>
        <option v-for="item in DataMotels" :key="item.id" :value="item.id">
          {{ item.title }}
        </option>
      </select>
    </div>
  </header>
  <section>
    <ElectricTable v-if="dataElectricity !== null" :data="dataElectricity" />
  </section>
</template>
