<script setup>
import { Doughnut } from "vue-chartjs";
import { useRoomStore } from "@/store/room";
const data = {
  labels: ["Dịch vụ", "Tiền điện", "Tiền nước", "Tiền phòng"],
  datasets: [
    {
      data: [300, 50, 100, 500],
    },
  ],
};

const roomStore = useRoomStore();

const getStat = async () => {
  const res = await roomStore.getRoomStatic();
  if (res.data) {
  }
};

getStat();
</script>
<template>
  <div class="tw-max-h-[300px]">
    <span class="tw-text-[16px] tw-font-bold">Tổng doanh thu</span>
    <Doughnut :data="data" :options="options" />
  </div>
</template>
