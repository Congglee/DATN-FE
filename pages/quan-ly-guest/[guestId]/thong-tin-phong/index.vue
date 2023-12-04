<script setup>
import { useGuestStore } from "~/store/guest";

definePageMeta({
  layout: "guest",
});

const guestStore = useGuestStore();

const getRoomInfo = async () => {
  const res = await guestStore.guestRoomInfo();
  if (res.data) {
    console.log(res.data);
  }
};

getRoomInfo();
</script>
<template></template>
