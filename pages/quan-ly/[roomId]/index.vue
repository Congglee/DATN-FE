<script setup>
import { useTestStore } from "@/store/test.ts";

const testStore = useTestStore();

const fetch = async () => {
  const res = await testStore.getUsers();
  if (res.data) {
    console.log(res.data);
  }
};

fetch();
</script>
<template></template>
