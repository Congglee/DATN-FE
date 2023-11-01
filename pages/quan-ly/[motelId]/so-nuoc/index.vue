<script setup>
import WaterTable from "@/components/pages/so-nuoc/WaterTable.vue";
import { useWaterStore } from "~/store/water";
import { useMotelStore } from "~/store/motel";
import CreateWaterForm from "~/components/pages/so-nuoc/CreateWaterForm.vue";

// store
const waterStore = useWaterStore();
const motelStore = useMotelStore();
const owner = JSON.parse(window.localStorage.getItem("owner"));
// state
const dataWater = ref(null);
const DateFilter = ref(Date());
const MotelFilter = ref(null);
const DataMotels = ref(null);
const isDisplayCreateWater = ref(false);
const fetchListWaterEventBus = useEventBus(`fetch-list-water`);
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
const getAllWater = async (params) => {
  try {
    const res = await waterStore.getAllWater(params !== null ? params : "");
    if (res.data) {
      dataWater.value = null;
      dataWater.value = res.data.waterUsages;
    }
  } catch (error) {
    console.log(error);
  }
};
getAllWater(`monthDate=${formatMonthYear(Date())}`);

const onHandleDate = async (event) => {
  dataWater.value = null;
  if (DateFilter._value == null) {
    if (MotelFilter._value == null) {
      return getAllWater(
        `${"monthDate=" + formatMonthYear(Date())}&limit=25&page=1`
      );
    }
    DateFilter.value = Date();
    getAllWater(
      `${
        MotelFilter._value == "all" ? "" : "motel=" + MotelFilter._value + "&"
      }${"monthDate=" + formatMonthYear(Date())}&limit=25&page=1`
    );
  } else {
    if (MotelFilter._value == null || MotelFilter._value == "all") {
      getAllWater(
        `${"monthDate=" + formatMonthYear(DateFilter._value)}&limit=25&page=1`
      );
    } else if (MotelFilter._value == "all") {
      getAllWater(
        `${"motel=" + MotelFilter._value + "&"}${
          "monthDate=" + formatMonthYear(DateFilter?._value)
        }&limit=25&page=1`
      );
    }
  }
};

const onHandleMotels = async (event) => {
  MotelFilter.value = event.target.value;
  dataWater.value = null;
  try {
    getAllWater(
      `${
        event.target.value == "all" ? "" : "motel=" + event.target.value + "&"
      }monthDate=${formatMonthYear(DateFilter?._value)}&limit=25&page=1`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

fetchListWaterEventBus.on(() => {
  dataWater.value = null;
  getAllWater(`monthDate=${formatMonthYear(Date())}`);
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
        <option value="all" selected>Tất cả nhà trọ</option>
        <option v-for="item in DataMotels" :key="item.id" :value="item.id">
          {{ item.title }}
        </option>
      </select>
    </div>
    <g-button
      class="!tw-h-[38px] !tw-w-40"
      @click="isDisplayCreateWater = true"
    >
      Cập nhật số nước
    </g-button>
  </header>
  <section>
    <WaterTable v-if="dataWater !== null" :data="dataWater" />
    <div v-if="dataWater == null">
      <h2 class="tw-text-center tw-py-10">Danh sách trống</h2>
    </div>
  </section>
  <v-dialog v-model="isDisplayCreateWater" width="544">
    <CreateWaterForm @close="isDisplayCreateWater = false" />
  </v-dialog>
</template>
