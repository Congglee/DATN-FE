<script setup>
import { useRoomStore } from "~/store/room";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useLiquidateStore } from "~/store/liquidate-bill";
import LiquidateBillItem from "../LiquidateBillItem.vue";

const route = useRoute();

const roomStore = useRoomStore();

const listRoom = ref([]);

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Tên phòng",
    sortable: false,
    key: "roomName",
  },
  {
    title: "Họ và tên chủ phòng",
    sortable: false,
    key: "fullName",
  },
  {
    title: "Điện thoại",
    sortable: false,
    key: "phone",
  },
  {
    title: "Email",
    sortable: false,
    key: "email",
  },
  {
    title: "Ngày trả phòng",
    sortable: false,
    key: "date",
  },
  {
    title: "Tiền",
    sortable: false,
    key: "price",
  },
   {
    title: "Trạng thái thanh toán",
    sortable: false,
    key: "status",
  },
  {
    title: "Hành động",
    sortable: false,
    key: "action",
    width: '150px'
  },
];

const liquidateStore = useLiquidateStore();

const liquidateBills = ref([]);

const getAllLiquidateBill = async () => {
  const res = await liquidateStore.getAllLiquidateBill();
  if (res.data) {
    liquidateBills.value = res.data.bills;
  }
};
getAllLiquidateBill();
</script>

<template>
  <v-data-table :headers="headers" class="s-table" :items="liquidateBills">
    <template #item="{ item, index }">
      <LiquidateBillItem :item="item" :index="index" />
    </template>
  </v-data-table>
</template>
