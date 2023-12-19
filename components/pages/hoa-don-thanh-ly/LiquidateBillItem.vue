<script setup>
import { useToast } from "vue-toastification";
import { useLiquidateStore } from "~/store/liquidate-bill";
import ModalLiquidateBillInfo from "./ModalLiquidateBillInfo.vue";
import { useServiceStore } from "~/store/services";
import { useBillStore } from "~/store/bill";

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object,
    default: {},
  },
  services: {
    type: Array,
    default: [],
  },
});

const toast = useToast();

const emit = defineEmits(["fetch-list-bill"]);

const liquidateStore = useLiquidateStore();
const serviceStore = useServiceStore();
const billStore = useBillStore();

const loading = ref(false);
const isShowLiquidateBillInfo = ref(false);
const billId = ref("");
const services = ref([]);
const isShowModalConfirmPaid = ref(false);

const handleSendLiquidateMail = async () => {
  loading.value = true;
  const res = await liquidateStore.sendingLiquidateBillMail(props.item._id);
  if (res.data) {
    loading.value = false;
    toast.success("Gửi thông báo thành công!");
  }
};

const handlePaidFull = async () => {
  const payload = {
    paidAmount: 0,
    isPaidFull: true,
  };
  const res = await billStore.updateBillPaidAmount(payload, props.item._id);
  if (res.data) {
    toast.success("Cập nhật thanh toán hóa đơn thành công!");
    isShowModalConfirmPaid.value = false;
    emit("fetch-list-bill");
  }
};
</script>
<template>
  <tr>
    <td class="tw-text-center">{{ index + 1 }}</td>
    <td>{{ item.billDetail.roomName }}</td>
    <td>{{ convertDateType(item?.billDate, "DD/MM/YYYY") }}</td>
    <td>{{ formatCurrency(item?.totalBill) }}</td>
    <td>{{ item.isPaid ? "Đã thanh toán" : "Chưa thanh toán" }}</td>
    <td class="tw-flex tw-justify-start tw-items-center tw-gap-x-3">
      <g-button @click="handleSendLiquidateMail" :loading="loading"
        >Thông báo</g-button
      >
      <g-button
        variant="bezeled"
        @click="(isShowLiquidateBillInfo = true), (billId = item._id)"
        >Chi tiết</g-button
      >
      <g-button
        @click="isShowModalConfirmPaid = true"
        :loading="loading"
        v-if="!props.item.isPaid"
      >
        Thanh toán
      </g-button>
    </td>
  </tr>
  <v-dialog v-model="isShowLiquidateBillInfo" width="544">
    <ModalLiquidateBillInfo
      :billId="billId"
      :services="services"
      @close="isShowLiquidateBillInfo = false"
    />
  </v-dialog>
  <g-modal-confirm
    v-model="isShowModalConfirmPaid"
    @ok="handlePaidFull"
    title="Thanh toán hóa đơn này?"
    description="Hành động không thể hoàn tác"
  ></g-modal-confirm>
</template>
