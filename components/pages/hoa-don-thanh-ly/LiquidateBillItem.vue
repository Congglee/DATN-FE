<script setup>
import { useToast } from "vue-toastification";
import { useLiquidateStore } from "~/store/liquidate-bill";

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

const liquidateStore = useLiquidateStore();
const toast = useToast();

const loading = ref(false);

const handleSendLiquidateMail = async () => {
  loading.value = true;
  const res = await liquidateStore.sendingLiquidateBillMail(props.item._id);
  if (res.data) {
    loading.value = false;
    toast.success("Gửi thông báo thành công!");
  }
};
</script>
<template>
  <tr>
    <td class="tw-text-center">{{ index }}</td>
    <td>{{ item.roomId?.name }}</td>
    <td>{{ item.memberId?.name }}</td>
    <td>{{ item.memberId?.phone }}</td>
    <td>{{ item.memberId?.email }}</td>
    <td>{{ convertDateType(item?.billDate, "DD/MM/YYYY") }}</td>
    <td>{{ formatCurrency(item?.totalBill) }}</td>
    <td>{{ item.isPaid ? "Đã thanh toán" : "Chưa thanh toán" }}</td>
    <td class="tw-flex tw-justify-center tw-items-center">
      <g-button
        size="sm"
        rounded
        @click="handleSendLiquidateMail"
        :loading="loading"
        >Thông báo</g-button
      >
    </td>
  </tr>
</template>
