<script setup>
import WaterTable from "@/components/pages/so-nuoc/WaterTable.vue";
import { useWaterStore } from "~/store/water";
import { useMotelStore } from "~/store/motel";
import CreateWaterForm from "~/components/pages/so-nuoc/CreateWaterForm.vue";

// compatibility
const route = useRoute();
const idMotel = route.params?.motelId;
// store
const waterStore = useWaterStore();
const motelStore = useMotelStore();
const owner = JSON.parse(window.localStorage.getItem("owner"));
// state
const dataWater = ref(null);
const DateFilter = ref(Date());
const DataMotels = ref(null);
const isDisplayCreateWater = ref(false);
const fetchListWaterEventBus = useEventBus(`fetch-list-water`);
// function
const getAllMotels = async () => {
  try {
    const res = await motelStore.getMotels(owner._id);
    if (res.data) {
      const motels = res.data.motels;
      const foundMotel = motels.find((motel) => motel._id === idMotel);
      if (foundMotel) {
        DataMotels.value = [
          {
            title: foundMotel.name,
            id: foundMotel._id,
          },
        ];
      } else {
        DataMotels.value = [];
      }
    }
  } catch (error) {
    throw error;
  }
};
getAllMotels();
const getAllWater = async (params) => {
  try {
    const res = await waterStore.getAllWater(
      `motel=${idMotel}&monthDate=${params}&limit=25&page=1`
    );
    if (res.data) {
      dataWater.value = null;
      dataWater.value = res.data.waterUsages;
    }
  } catch (error) {
    console.log(error);
  }
};
getAllWater(formatMonthYear(Date()));

const onHandleDate = async (event) => {
  if (DateFilter._value == null) {
    dataWater.value = null;
    getAllWater(formatMonthYear(Date()));
    return;
  } else {
    dataWater.value = null;
    getAllWater(formatMonthYear(DateFilter._value));
  }
};

fetchListWaterEventBus.on(() => {
  dataWater.value = null;
  getAllWater(formatMonthYear(Date()));
});
</script>
<template>
  <header class="tw-grid tw-grid-cols-4 tw-items-end tw-gap-x-3">
    <div class="tw-flex tw-flex-col tw-text-black">
      <h5 class="tw-text-[14px]">Nhà Trọ</h5>
      <select
        class="form-control tw-h-[38px] tw-border-gray-400 focus:tw-outline-none tw-px-2 tw-bg-white tw-text-[16px] tw-text-gray-600"
        style="
          border: 1px solid rgb(218, 218, 218) !important ;
          border-radius: 3px;
        "
      >
        <option
          v-for="item in DataMotels"
          :key="item.id"
          :value="item.id"
          selected
        >
          {{ item.title }}
        </option>
      </select>
    </div>
    <g-date-picker
      class="tw-pt-4"
      label="Theo tháng"
      :placeholder="formatMonthYear(Date())"
      @vnode-updated="onHandleDate($event)"
      v-model="DateFilter"
    ></g-date-picker>
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
