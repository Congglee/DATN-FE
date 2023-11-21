<script setup>
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import IconCheck from "@/assets/svg/check.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { render } from "vue";
import ModalUpdateDeposits from "~/components/pages/coc-phong/ModalUpdateDeposits.vue";
import { useDepositsStore } from "~/store/deposits";
import { useToast } from "vue-toastification";
// composable
const fetchListDepositsEventBus = useEventBus(`fetch-list-deposits`);
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const toast = useToast();
// state
const isDisplayUpdateDeposits = ref(false);
const isShowConfirmDeleteDeposits = ref(false);
const data_update = ref("");
const data_remove = ref("");
// store
const DepositsStore = useDepositsStore();

const tableHeaders = ref([
  {
    title: "STT",
    key: "STT",
    sortable: true,
    width: "30px",
  },
  {
    title: "Trạng thái",
    key: "status",
    sortable: true,
    width: "130px",
  },
  {
    title: "Phòng",
    key: "name_room",
    sortable: true,
    width: "100px",
  },
  {
    title: "Tiền cọc",
    key: "money",
    sortable: true,
    width: "150px",
  },
  {
    title: "Người cọc",
    key: "name",
    sortable: false,
    width: "160px",
  },
  {
    title: "Điện thoại",
    key: "phone",
    sortable: false,
    width: "100px",
  },
  {
    title: "Ghi chú",
    key: "note",
    sortable: false,
    width: "270px",
  },
  {
    title: "Ngày cọc",
    key: "bookingDate",
    sortable: true,
    width: "110px",
  },
  {
    title: "Dự kiến đến",
    key: "checkInDate",
    sortable: true,
    width: "110px",
  },

  {
    title: "Hành động",
    key: "action",
    sortable: false,
    width: "150px",
  },
]);

// function
const onHandleUpdate = async (item) => {
  data_update.value = item;
  isDisplayUpdateDeposits.value = true;
};
const onHandleRemove = async (item) => {
  if (item === true) {
    try {
      const res = await DepositsStore.deleteDeposits(data_remove.value._id);
      if (res.data.success) {
        fetchListDepositsEventBus.emit();
        toast.success("Huỷ cọc phòng thành công !");
        isShowConfirmDeleteDeposits.value = false;
        isDisplayUpdateDeposits.value = false;
      }
    } catch (error) {
      toast.error("Huỷ cọc thất bại !");
    }
    return;
  } else {
    data_remove.value = item;
    isShowConfirmDeleteDeposits.value = true;
  }
};

const handleStatus = async (item, status) => {
  function removeUnwantedProperties(obj) {
    const { _id, createdAt, updatedAt, __v, ...cleanedObj } = obj;
    return cleanedObj;
  }
  const sendData = removeUnwantedProperties(item);
  sendData.roomId = item.roomId._id;
  sendData.motelId = item.motelId._id;
  if (status == true) {
    try {
      sendData.status = "Đã thanh toán";
      const res = await DepositsStore.updateDeposits({
        _id: item._id,
        data: sendData,
      });
      if (res.data.success) {
        fetchListDepositsEventBus.emit();
        toast.success("Phòng đã thanh toán !");
      }
    } catch (error) {
      toast.error("Đổi trạng thái thất bại !");
    }
  }
  if (status == false) {
    try {
      sendData.status = "Chưa thanh toán";
      const res = await DepositsStore.updateDeposits({
        _id: item._id,
        data: sendData,
      });
      if (res.data.success) {
        fetchListDepositsEventBus.emit();
        toast.success("Phòng chưa thanh toán !");
      }
    } catch (error) {
      toast.error("Đổi trạng thái thất bại !");
    }
  }
};
</script>

<template>
  <div>
    <v-data-table :headers="tableHeaders" :items="props.data" class="s-table">
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td class="tw-text-center">{{ index + 1 }}</td>
          <td>
            <span
              v-if="item?.status == 'Chưa thanh toán'"
              class="tw-text-red-700 tw-font-semibold"
              >{{ item?.status }}</span
            >
            <span
              v-if="item?.status == 'Đã thanh toán'"
              class="tw-text-green-700 tw-font-semibold"
              >{{ item?.status }}</span
            >
          </td>
          <td>{{ item?.roomId?.name }}</td>
          <td>{{ formatCurrency(item?.money) }}</td>
          <td>{{ item?.name }}</td>
          <td>{{ item?.phone }}</td>
          <td>{{ item?.note }}</td>
          <td>{{ item?.bookingDate }}</td>
          <td>{{ item?.checkInDate }}</td>

          <td>
            <span class="tw-flex tw-gap-x-3">
              <g-button
                v-if="item?.status == 'Đã thanh toán'"
                @click="handleStatus(item, false)"
                class="bg-white !tw-ml-0 !tw-p-2 hover:!tw-bg-[#f3f3f3]"
              >
                <IconXMark />
              </g-button>
              <g-button
                v-if="item?.status == 'Chưa thanh toán'"
                @click="handleStatus(item, true)"
                class="bg-white !tw-ml-0 !tw-p-2 hover:!tw-bg-[#f3f3f3]"
              >
                <IconCheck />
              </g-button>
              <g-button
                @click="onHandleUpdate(item)"
                class="bg-white !tw-ml-0 !tw-p-1 hover:!tw-bg-[#f3f3f3]"
              >
                <IconEdit />
              </g-button>
              <g-button
                @click="onHandleRemove(item)"
                class="bg-white !tw-ml-0 !tw-p-1 hover:!tw-bg-[#f3f3f3]"
              >
                <IconRemove class="!tw-ml-0" />
              </g-button>
            </span>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isDisplayUpdateDeposits" width="544">
      <ModalUpdateDeposits
        :data="data_update"
        @close="isDisplayUpdateDeposits = false"
      />
    </v-dialog>
    <g-modal-confirm
      v-model="isShowConfirmDeleteDeposits"
      title="Huỷ cọc phòng ?"
      description="Một khi đã huỷ, không thể hồi lại"
      @ok="onHandleRemove(true)"
    ></g-modal-confirm>
  </div>
</template>
