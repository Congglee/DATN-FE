<script setup>
import { useGuestStore } from "~/store/guest";
definePageMeta({
  layout: "guest",
});

const guestStore = useGuestStore();

const billInfo = ref([]);

const getBillInfo = async () => {
  const res = await guestStore.guestRoomBill();
  if (res.data) {
    billInfo.value = res.data.data;
  }
};
getBillInfo();
</script>
<template>
    {{ billInfo }}
</template>
