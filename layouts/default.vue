<script setup>
import Sidebar from "@/components/layouts/Sidebar/index.vue";
import HomePageHeader from "@/components/layouts/HomePageHeader/index.vue";
const route = useRoute();
</script>
<template>
  <div
    class="tw-flex tw-h-screen tw-overflow-hidden"
    v-if="route.fullPath.includes('/quan-ly')"
  >
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
  <slot/>
</template>
