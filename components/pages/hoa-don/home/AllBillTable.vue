<script setup>
import { useBillStore } from "~/store/bill";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import BillItem from "@/components/pages/hoa-don/BillItem.vue";
import { timeTables } from "~/utils/constants";
import { useServiceStore } from "@/store/services";

const route = useRoute();

const getBillEventBus = useEventBus(`get-bill-event-bus`);

//store
const billStore = useBillStore();
const serviceStore = useServiceStore();

//state
const bills = ref([]);
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
    width: "120px",
  },
  {
    title: "Họ và tên chủ",
    sortable: false,
    key: "fullName",
    width: "200px",
  },
  {
    title: "Tổng hóa đơn",
    sortable: false,
    key: "totalBill",
    width: "200px",
  },
  {
    title: "Đã thanh toán",
    sortable: false,
    key: "paid",
    width: "200px",
  },
  {
    title: "Còn nợ",
    sortable: false,
    key: "remaining",
    width: "200px",
  },
  {
    title: "Trạng thái",
    sortable: false,
    key: "paidStatus",
    sortable: true,
  },
];

const time = ref("");
const services = ref(null);

//method
const getAllBills = async (monthDate) => {
  const payload = {
    motel: route.params.motelId,
    monthDate: monthDate.value,
  };
  const res = await billStore.getAllBill(payload);
  if (res.data) {
    bills.value = res.data.bills;
  }
};

const getServiceInfo = async () => {
  const res = await serviceStore.getAllServices();
  if (res.data) {
    services.value = res.data.services;
  }
};
getServiceInfo();

// getAllBills();

getBillEventBus.on(() => {
  getAllBills(time.value);
});

watch(
  () => time.value,
  (newVal) => {
    getAllBills(newVal);
  }
);
</script>
<template>
  <div>
    <g-autocomplete
      v-model="time"
      class="tw-w-[200px] tw-mb-3"
      label="Chọn kì"
      :items="timeTables"
      item-title="label"
    ></g-autocomplete>
  </div>
  <v-data-table :headers="headers" class="s-table" :items="bills">
    <template #item="{ item, index }">
      <BillItem :item="item" :index="index" :services="services"/>
    </template>
  </v-data-table>
</template>
