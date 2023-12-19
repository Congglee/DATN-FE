<script setup>
import { useRoomStore } from "~/store/room";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useLiquidateStore } from "~/store/liquidate-bill";
import LiquidateBillItem from "../LiquidateBillItem.vue";
import { useServiceStore } from "~/store/services";

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
    width: "370px",
  },
];

const liquidateStore = useLiquidateStore();
const serviceStore = useServiceStore()

const liquidateBills = ref([]);
const monthYear = ref(getCurrentDateString());
const services = ref([])

const getAllLiquidateBill = async () => {
  const params = {
    monthDate: convertDateType(monthYear.value, "MM/YYYY"),
    motel: route.params.motelId
  };
  const res = await liquidateStore.getAllLiquidateBill(params);
  if (res.data) {
    liquidateBills.value = res.data.bills;
  }
};
getAllLiquidateBill();

const getServiceInfo = async () => {
  const res = await serviceStore.getAllServices();
  if (res.data) {
    services.value = res.data.services;
  }
};
getServiceInfo();

watch(
  () => monthYear.value,
  (newVal) => {
    getAllLiquidateBill();
  }
);
</script>

<template>
  <div class="tw-mb-3 tw-w-[200px]">
    <g-date-picker v-model="monthYear"></g-date-picker>
  </div>
  <v-data-table :headers="headers" class="s-table" :items="liquidateBills">
    <template #item="{ item, index }">
      <LiquidateBillItem :item="item" :index="index" :services="services" @fetch-list-bill="getAllLiquidateBill"/>
    </template>
  </v-data-table>
</template>
