<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});

const tableData = ref(props.data.unpaidBills);

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Tên chủ phòng",
    sortable: false,
    key: "hostName",
  },
  {
    title: "Tên nhà",
    sortable: false,
    key: "houseName",
  },
  {
    title: "Tên phòng",
    sortable: false,
    key: "roomName",
  },
  {
    title: "Tiền nợ",
    sortable: false,
    key: "dept",
  },
];
</script>
<template>
  <v-data-table :headers="headers" class="s-table" :items="tableData">
    <template #item="{ item, index }">
      <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
        <td>{{ index + 1 }}</td>
        <td>{{ item.memberName }}</td>
        <td>{{ item.roomName }}</td>
        <td>{{ item.motelName }}</td>
        <td>{{ formatCurrency(item.totalBill) }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
