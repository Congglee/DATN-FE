<script setup>
import Sidebar from "@/components/layouts/Sidebar/index.vue";

</script>
<template>
  <div class="tw-flex tw-h-screen tw-overflow-hidden">
    <Sidebar />
    <div
      class="tw-relative tw-flex tw-flex-1 tw-flex-col tw-overflow-y-auto tw-overflow-x-hidden"
    >
      <!-- <Header v-if="!error" /> -->
      <div class="tw-bg-[#F6F6F6] tw-grow tw-pt-5 tw-pb-8 tw-px-8">
        <slot />
      </div>
    </div>
  </div>
</template>
