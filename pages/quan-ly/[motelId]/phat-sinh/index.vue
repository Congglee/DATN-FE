<script setup>
import ArisesTable from "@/components/pages/phat-sinh/ArisesTable.vue";
import { useArisesStore } from "~/store/arises";
import { useMotelStore } from "@/store/motel";
import CreateArisesForm from "~/components/pages/phat-sinh/CreateArisesForm.vue";

// compatibility
const route = useRoute();
const idMotel = route.params?.motelId;
// store
const arisesStore = useArisesStore();
const motelStore = useMotelStore();
const owner = JSON.parse(window.localStorage.getItem("owner"));
// state
const dataArises = ref(null);
const DateFilter = ref(Date());
const DataMotels = ref(null);
const isDisplayCreateArises = ref(false);
const fetchListArisesEventBus = useEventBus(`fetch-list-arises`);
// function
const getAllMotels = async () => {
  try {
    const res = await motelStore.getMotels(owner._id);
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
const getAllArises = async (monthYear) => {
  try {
    const res = await arisesStore.getAllArises(
      `?motelId=${idMotel}&monthDate=${monthYear}&limit=100&page=1`
    );
    if (res.data) {
      dataArises.value = null;
      dataArises.value = res.data.arises;
    }
  } catch (error) {
  }
};
getAllArises(formatMonthYear(Date()));

const onHandleDate = async (event) => {
  if (DateFilter._value == null) {
    dataArises.value = null;
    getAllArises(convertDateType(Date(), "MM/YYYY"));
    return;
  } else {
    dataArises.value = null;
    getAllArises(convertDateType(DateFilter._value, "MM/YYYY"));
  }
};
fetchListArisesEventBus.on(() => {
  dataArises.value = null;
  getAllArises(convertDateType(Date(), "MM/YYYY"));
});
</script>
<template>
  <header class="tw-grid tw-grid-cols-4 tw-items-end tw-gap-x-3">
    <div class="tw-flex tw-flex-col tw-text-black">
      <h5 class="tw-text-[14px]">Nhà Trọ</h5>
      <select
        class="form-control tw-h-[38px] tw-border-gray-400 focus:tw-outline-none tw-px-2 tw-bg-white tw-text-[16px] tw-text-gray-600"
        style="
          border: 1px solid rgb(218, 218, 218) !important ;
          border-radius: 3px;
        "
      >
        <option
          v-for="item in DataMotels"
          :key="item.id"
          :value="item.id"
          selected
        >
          {{ item.title }}
        </option>
      </select>
    </div>
    <g-date-picker
      class="tw-pt-4"
      label="Theo tháng"
      :placeholder="formatMonthYear(Date())"
      @vnode-updated="onHandleDate($event)"
      v-model="DateFilter"
    ></g-date-picker>

    <g-button
      class="!tw-h-[38px] !tw-w-40"
      @click="isDisplayCreateArises = true"
    >
      Thêm
    </g-button>
  </header>
  <section>
    <ArisesTable v-if="dataArises !== null" :data="dataArises" />
  </section>
  <v-dialog v-model="isDisplayCreateArises" width="544">
    <CreateArisesForm @close="isDisplayCreateArises = false" />
  </v-dialog>
</template>
