<script setup>
import { Doughnut } from "vue-chartjs";

const props = defineProps({
  roomData: {
    type: Object,
    default: {},
  },
});

const data = ref({
  labels: ["Phòng trống", "Phòng đang cho thuê", "Phòng đang đặt cọc"],
  datasets: [
    {
      data: [
        props.roomData.emptyRooms,
        props.roomData.rentingRooms,
        props.roomData.depositRooms,
      ],
    },
  ],
});

watch(
  () => props.roomData,
  (newVal) => {
    data.value = {
      labels: ["Phòng trống", "Phòng đang cho thuê", "Phòng đang đặt cọc"],
      datasets: [
        {
          data: [newVal.emptyRooms, newVal.rentingRooms, newVal.depositRooms],
        },
      ],
    };
  }
);
</script>
<template>
  <div class="tw-max-h-[300px]">
    <span class="tw-text-[16px] tw-font-bold">Tổng doanh thu</span>
    <Doughnut :data="data" />
  </div>
</template>
