<script setup>
import IconSave from "@/assets/svg/save.svg";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useElectricityStore } from "~/store/electricity";
import { useToast } from "vue-toastification";
import { cloneDeep } from "lodash-es";

// composable
const fetchListServiceEventBus = useEventBus(`fetch-list-service`);
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const DeepData = cloneDeep(props.data);
const JsonData = JSON.parse(JSON.stringify(DeepData));
const dataTable = ref(DeepData);

const toast = useToast();
// state
// store
const electricityStore = useElectricityStore();

const tableHeaders = ref([
  {
    title: "STT",
    key: "STT",
    sortable: false,
    width: "73px",
  },
  {
    title: "Phòng",
    key: "name",
    sortable: true,
    width: "200px",
  },
  {
    title: "CS Điện Cũ",
    key: "prevElectricityIndex",
    sortable: true,
    width: "200px",
  },
  {
    title: "CS Điện Mới",
    key: "currentElectricityIndex",
    sortable: false,
    width: "200px",
  },
  {
    title: "Sử dụng",
    key: "electricityUsed",
    sortable: true,
    width: "150px",
  },
  {
    title: "Hành động",
    key: "action",
    sortable: false,
    width: "150px",
  },
]);

// function
const onHandleSave = async (item) => {
  if (item.roomId == null) {
    return toast.error("Nhà trọ đã bị xoá !");
  }
  const payload = {
    monthYear: item.monthYear,
    isWarning: true,
    prevElectricityIndex: item.prevElectricityIndex,
    currentElectricityIndex: item.currentElectricityIndex,
    roomId: item.roomId._id,
  };
  try {
    const res = await electricityStore.updateElectricity(payload);
    if (res.data.success) {
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Lưu số điện thất bại ");
  }
};

const onChangeElec = (item) => {
  item.prevElectricityIndex = Number(item.prevElectricityIndex);
  item.currentElectricityIndex = Number(item.currentElectricityIndex);
  if (
    Number(item.currentElectricityIndex) - Number(item.prevElectricityIndex) <
      0 ||
    Number(item.currentElectricityIndex) < 0 ||
    Number(item.prevElectricityIndex) < 0
  ) {
    const dataYes = dataTable._rawValue.map((element) => {
      if (element._id == item._id) {
        return JSON.parse(
          JSON.stringify(
            JsonData.filter((element) => element._id == item._id)[0]
          )
        );
      }
      return element;
    });
    dataTable.value = dataYes;
    return toast.error("Giá điện không phải là số âm");
  }
  item.electricityUsed =
    Number(item.currentElectricityIndex) - Number(item.prevElectricityIndex);
};
</script>

<template>
  <div>
    <v-data-table :headers="tableHeaders" :items="dataTable" class="s-table">
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td class="tw-text-center">{{ index + 1 }}</td>
          <td>{{ item?.roomId?.name }}</td>

          <td>
            <g-input
              type="number"
              @change="onChangeElec(item)"
              v-model="item.prevElectricityIndex"
            >
            </g-input>
          </td>
          <td>
            <g-input
              type="number"
              min="0"
              @change="onChangeElec(item)"
              v-model="item.currentElectricityIndex"
            >
            </g-input>
          </td>
          <td>{{ item.electricityUsed }}</td>
          <td>
            <span class="tw-flex tw-gap-x-3">
              <g-button
                @click="onHandleSave(item)"
                class="bg-white !tw-ml-0 !tw-px-[9px] hover:!tw-bg-[#f3f3f3]"
              >
                <IconSave /> <span class="tw-ml-2">Lưu</span>
              </g-button>
            </span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
