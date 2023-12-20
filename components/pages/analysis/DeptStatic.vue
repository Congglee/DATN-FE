<script setup>
import {
  VCard,
  VTabs,
  VTab,
  VCardText,
  VWindow,
  VWindowItem,
} from "vuetify/lib/components";
``;
import DeptTable from "./home/DeptTable.vue";

const props = defineProps({
  deptData: {
    type: Array,
    default: [],
  },
});

// const roomFactorList = ref([
//   {
//     _id: "1",
//     title: "Danh sách thành viên",
//     value: "MEMBERS",
//   },
//   {
//     _id: "2",
//     title: "Danh sách dịch vụ",
//     value: "SERVICES",
//   },
//   {
//     _id: "3",
//     title: "Nội thất",
//     value: "ASSET",
//   },
//   {
//     _id: "4",
//     title: "Hợp đồng",
//     value: "CONTRACT",
//   },
// ]);

const tab = ref("");
</script>
<template>
  <div class="tw-pt-[24px]">
    <span class="tw-text-[16px] tw-font-bold">Danh sách nợ</span>
    <v-card class="conduct-table tw-mt-4">
      <v-tabs v-model="tab" class="s-tabs" id="">
        <v-tab v-for="item in props.deptData" :value="item._id">
          <span class="tw-flex tw-items-center">{{ item._id }}</span>
        </v-tab>
      </v-tabs>
      <hr />
      <v-card-text class="conduct-v-card-text">
        <v-window v-model="tab">
          <v-window-item v-for="item in props.deptData" :value="item._id">
            <DeptTable :data="item" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
@import url("./index.scss");
</style>
