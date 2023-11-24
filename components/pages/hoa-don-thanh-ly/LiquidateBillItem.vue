<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object,
    default: {},
  },
});

</script>
<template>
  <tr>
    <td class="tw-text-center">{{ index }}</td>
    <td>{{ item.roomId.name }}</td>
    <td>{{ item.memberId.name }}</td>
    <td>{{ item.memberId.phone }}</td>
    <td>{{ item.memberId.email }}</td>
    <td>{{ convertDateType(item.billDate, "DD/MM/YYYY") }}</td>
    <td>{{ formatCurrency(item.totalBill) }}</td>
  </tr>
</template>
