<script setup>
import { useBillStore } from "~/store/bill";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import BillItem from "@/components/pages/hoa-don/BillItem.vue";

const getBillEventBus = useEventBus(`get-bill-event-bus`);

//store
const billStore = useBillStore();

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
    sortable: true
  },
];

//method
const getAllBills = async () => {
  const res = await billStore.getAllBill();
  if (res.data) {
    bills.value = res.data.bills;
  }
};

getAllBills();

getBillEventBus.on(() => {
  getAllBills();
});
</script>
<template>
  <v-data-table :headers="headers" class="s-table" :items="bills">
    <template #item="{ item, index }">
      <BillItem :item="item" :index="index" />
    </template>
  </v-data-table>
</template>
