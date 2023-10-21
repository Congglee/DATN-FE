<script setup>
import { useRoomStore } from "@/store/room";

const roomStore = useRoomStore();

const motels = ref(null);

const getAllMotels = async () => {
  const res = await roomStore.getMotels();
  if (res.data) {
    motels.value = res.data.motels;
  }
};

getAllMotels();
</script>
<template>
  <span>
    
  </span>
</template>
