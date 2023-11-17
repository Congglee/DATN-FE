<script setup>
import IncomeBarChart from "@/components/pages/analysis/IncomeBarChart.vue";
import CompareIncomePieChart from "@/components/pages/analysis/CompareIncomePieChart.vue";
import { useRoomStore } from "@/store/room";
import RoomStatusPieChart from "@/components/pages/analysis/RoomStatusPieChart.vue";

//composable
const route = useRoute();

const roomStore = useRoomStore();

//state
const roomData = ref({});

const getRoomStatic = async () => {
  const res = await roomStore.getRoomStatic();
  if (res.data) {
    res.data.result.map((el) => {
      if (el.motelId === route.params.motelId) {
        roomData.value = el;
      }
    });
  }
};
getRoomStatic();
</script>
<template>
  <div class="tw-mt-3 tw-p-5">
    <div class="tw-ml-5">
      <g-button>Trở về trang quản lý</g-button>
    </div>
    <div class="tw-p-5 tw-ml-5">
      <span class="tw-text-[30px] tw-font-bold">Thống kê</span>
    </div>
    <div class="tw-grid tw-grid-cols-2 tw-gap-4">
      <div class="tw-p-10 tw-bg-white tw-rounded-xl">
        <IncomeBarChart :roomData="roomData" />
      </div>
      <div class="tw-p-10 tw-bg-white tw-rounded-xl">
        <CompareIncomePieChart :roomData="roomData" />
      </div>
      <div class="tw-p-10 tw-bg-white tw-rounded-xl">
        <RoomStatusPieChart :roomData="roomData" />
      </div>
    </div>
  </div>
</template>
