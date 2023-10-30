<script setup>
import { useContractStore } from "~/store/contract";

const contractStore = useContractStore();

const contract = ref("");

// const getSampleContract = async () => {
//   const res = await contractStore.getSampleContract();
//   if (res.data) {
//     contract.value = res.data.contract.sample_contract;
//     console.log(contract.value)
//   }
// };
// getSampleContract();

const handleCreateContract = () => {
  console.log(contract.value);
};
</script>
<template>
  <quill-editor
    v-model:content="contract"
    contentType="html"
    toolbar="full"
    theme="snow"
  />
  <g-button @click="handleCreateContract">Tạo hợp đồng</g-button>
</template>
