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
</template>
