<script setup>
const props = defineProps({
  image: {
    type: String,
    default: "",
  },
});

console.log(props.image);
</script>
<template>
  <img 
    alt="Home"
    :src="image"
    class="tw-rounded-[12px]"
  />
</template>
