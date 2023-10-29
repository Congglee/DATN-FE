<script setup>
import DepositTable from "@/components/pages/deposit/DepositTable.vue";
import IconSearch from "@/assets/svg/search.svg";

const searchKeyword = ref("");

const handleSearch = () => {

}

</script>
<template>
  <div
    class="tw-flex tw-justify-end tw-mb-3 tw-mr-3 tw-items-center tw-gap-x-3"
  >
    <div class="tw-w-[300px]">
      <g-input v-model="searchKeyword"> </g-input>
    </div>
    <div class="tw-bg-white tw-rounded-full tw-p-3 tw-cursor-pointer" @click="handleSearch">
      <IconSearch />
    </div>
  </div>
  <div>
    <DepositTable />
  </div>
</template>
