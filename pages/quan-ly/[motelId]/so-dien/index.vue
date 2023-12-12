<script setup>
import ElectricTable from "@/components/pages/so-dien/ElectricityTable.vue";
import { useElectricityStore } from "~/store/electricity";
import { useMotelStore } from "@/store/motel";
import CreateElectricityForm from "~/components/pages/so-dien/CreateElectricityForm.vue";
import { useUserStore } from "~/store/user";

// compatibility
const route = useRoute();
const idMotel = route.params?.motelId;
// store
const userStore = useUserStore();
const electricityStore = useElectricityStore();
const motelStore = useMotelStore();
// state
const dataElectricity = ref(null);
const DateFilter = ref(Date());
const DataMotels = ref(null);
const isDisplayCreateElec = ref(false);
const fetchListElectricityEventBus = useEventBus(`fetch-list-electricity`);
// function
const getAllMotels = async () => {
  try {
    const resOwner = await userStore.getOneUser();
    const res = await motelStore.getMotels(resOwner.data.message._id);
    if (res.data) {
      const motels = res.data.motels;
      const foundMotel = motels.find((motel) => motel._id === idMotel);
      if (foundMotel) {
        DataMotels.value = [
          {
            title: foundMotel.name,
            id: foundMotel._id,
          },
        ];
      } else {
        DataMotels.value = [];
      }
    }
  } catch (error) {
    throw error;
  }
};
getAllMotels();
const getAllElectricity = async (params) => {
  try {
    const res = await electricityStore.getAllElectricity(
      `motel=${idMotel}&monthDate=${params}&limit=10000000000000&page=1`
    );
    if (res.data) {
      dataElectricity.value = null;
      dataElectricity.value = res.data.electricityUsages;
    }
  } catch (error) {}
};
getAllElectricity(formatMonthYear(Date()));

const onHandleDate = async (event) => {
  if (DateFilter._value == null) {
    dataElectricity.value = null;
    getAllElectricity(formatMonthYear(Date()));
    return;
  } else {
    dataElectricity.value = null;
    getAllElectricity(formatMonthYear(DateFilter._value));
  }
};
fetchListElectricityEventBus.on(() => {
  dataElectricity.value = null;
  getAllElectricity(formatMonthYear(Date()));
});
</script>
<template>
  <div class="tw-flex tw-items-end tw-gap-x-3 tw-mb-3">
    <g-date-picker
      class=""
      label="Theo tháng"
      :placeholder="formatMonthYear(Date())"
      @vnode-updated="onHandleDate($event)"
      v-model="DateFilter"
    ></g-date-picker>
    <g-button @click="isDisplayCreateElec = true"> Cập nhật số điện </g-button>
  </div>
  <section>
    <ElectricTable v-if="dataElectricity !== null" :data="dataElectricity" />
  </section>
  <v-dialog v-model="isDisplayCreateElec" width="544">
    <CreateElectricityForm @close="isDisplayCreateElec = false" />
  </v-dialog>
</template>
