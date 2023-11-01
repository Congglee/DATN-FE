<script setup>
import ElectricTable from "@/components/pages/so-dien/ElectricityTable.vue";
import { useElectricityStore } from "~/store/electricity";
import { useMotelStore } from "@/store/motel";
import CreateElectricityForm from "~/components/pages/so-dien/CreateElectricityForm.vue";

// store
const electricityStore = useElectricityStore();
const motelStore = useMotelStore();
const owner = JSON.parse(window.localStorage.getItem("owner"));
// state
const dataElectricity = ref(null);
const DateFilter = ref(Date());
const MotelFilter = ref(null);
const DataMotels = ref(null);
const isDisplayCreateElec = ref(false);
const fetchListElectricityEventBus = useEventBus(`fetch-list-electricity`);
// function
const getAllMotels = async () => {
  try {
    const res = await motelStore.getMotels(owner._id);
    if (res.data) {
      DataMotels.value = res.data.motels.map((motel) => ({
        title: motel.name,
        id: motel._id,
      }));
    }
  } catch (error) {}
};
getAllMotels();
const getAllElectricity = async (params) => {
  try {
    const res = await electricityStore.getAllElectricity(
      params !== null ? params : ""
    );
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
  dataElectricity.value = null;
  if (DateFilter._value == null) {
    if (MotelFilter._value == null) {
      return getAllElectricity(
        `${"monthDate=" + formatMonthYear(Date())}&limit=25&page=1`
      );
    }
    DateFilter.value = Date();
    getAllElectricity(
      `${
        MotelFilter._value == "all" ? "" : "motel=" + MotelFilter._value + "&"
      }${"monthDate=" + formatMonthYear(Date())}&limit=25&page=1`
    );
  } else {
    if (MotelFilter._value == null || MotelFilter._value == "all") {
      getAllElectricity(
        `${"monthDate=" + formatMonthYear(DateFilter._value)}&limit=25&page=1`
      );
    } else if (MotelFilter._value == "all") {
      getAllElectricity(
        `${"motel=" + MotelFilter._value + "&"}${
          "monthDate=" + formatMonthYear(DateFilter?._value)
        }&limit=25&page=1`
      );
    }
  }
};

const onHandleMotels = async (event) => {
  MotelFilter.value = event.target.value;
  dataElectricity.value = null;
  try {
    getAllElectricity(
      `${
        event.target.value == "all" ? "" : "motel=" + event.target.value + "&"
      }monthDate=${formatMonthYear(DateFilter?._value)}&limit=25&page=1`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

fetchListElectricityEventBus.on(() => {
  dataElectricity.value = null;
  getAllElectricity(`monthDate=${formatMonthYear(Date())}`);
});
</script>
<template>
  <header class="tw-grid tw-grid-cols-4 tw-items-end tw-gap-x-3">
    <g-date-picker
      class="tw-pt-4"
      label="Theo tháng"
      :placeholder="formatMonthYear(Date())"
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
        <option value="all">Tất cả nhà trọ</option>
        <option v-for="item in DataMotels" :key="item.id" :value="item.id">
          {{ item.title }}
        </option>
      </select>
    </div>
    <g-button class="!tw-h-[38px] !tw-w-40" @click="isDisplayCreateElec = true">
      Cập nhật số điện
    </g-button>
  </header>
  <section>
    <ElectricTable v-if="dataElectricity !== null" :data="dataElectricity" />
  </section>
  <v-dialog v-model="isDisplayCreateElec" width="544">
    <CreateElectricityForm @close="isDisplayCreateElec = false" />
  </v-dialog>
</template>
