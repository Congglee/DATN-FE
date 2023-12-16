<script setup>
const props = defineProps({
  image: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div class="tw-rounded-[12px] tw-p-5 tw-bg-white">
    <img alt="Home" :src="image"  />
  </div>
</template>
