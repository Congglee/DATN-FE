<script setup>
import DepositTable from "@/components/pages/deposit/DepositTable.vue";
import IconBorder from "@/assets/svg/border.svg";
import IconArrowBack from "@/assets/svg/arrow-back.svg";
import IconSearch from "@/assets/svg/search.svg";
import { useRoomStore } from "@/store/room";
import IconSetting from "@/assets/svg/setting.svg";
import {
  VCard,
  VTabs,
  VTab,
  VCardText,
  VWindow,
  VWindowItem,
} from "vuetify/lib/components";

//composable
const route = useRoute();

//store
const roomStore = useRoomStore();

//state
const searchKeyword = ref("");
const tab = ref("");
const room = ref({});
const roomFactorList = ref([
  {
    _id: "1",
    title: "Danh sách thành viên",
  },
  {
    _id: "2",
    title: "Danh sách dịch vụ",
  },
]);

//method
const getRoomDetail = async () => {
  const res = await roomStore.getRoomDetail(route.params.roomId);
  if (res.data) {
    room.value = res.data.room;
  }
};
getRoomDetail();
</script>
<template>
  <div class="tw-pt-[50px]">
    <div class="tw-px-5">
      <div class="tw-pb-4">
        <h5 class="tw-text-[20px] tw-font-extrabold tw-mb-2">
          Quản lý phòng trọ
        </h5>
        <p class="title">Quản lý phòng trọ</p>
      </div>
      <hr />
      <div class="tw-pr-5 tw-mt-8 tw-space-y-3">
        <span class="tw-text-[20px] tw-font-extrabold">{{ room.name }}</span>
        <div class="tw-flex tw-space-x-4 tw-items-center">
          <div class="tw-flex tw-flex-col">
            <span class="small-text">Số thành viên</span>
            <span class="large-text">{{ room.memberIds?.length }}</span>
          </div>
          <IconBorder />
          <div class="tw-flex tw-flex-col">
            <span class="small-text">Trạng thái</span>
            <span class="large-text">{{ room.status }}</span>
          </div>
        </div>
      </div>
      <div class="tw-mt-6">
        <div class="tw-flex tw-space-x-3">
          <g-button
            label=""
            variant="bezeled"
            @click="showUpdateClassModal = true"
          >
            <template #prepend>
              <IconSetting />
            </template>
            <span class="tw-text-[14px] tw-font-semibold"
              >Chỉnh sửa thông tin phòng</span
            >
          </g-button>
          <g-button variant="filled">
            <span class="tw-text-[14px] tw-font-semibold">Quản lý phòng</span>
          </g-button>
        </div>
      </div>
    </div>
    <div class="tw-pt-[24px]">
      <v-card class="conduct-table">
        <v-tabs v-model="tab" bg-color="" class="s-tabs" id="">
          <v-tab v-for="item in roomFactorList" :value="item._id">
            <span class="tw-flex tw-items-center">{{ item.title }}</span>
          </v-tab>
        </v-tabs>
        <hr />
        <v-card-text class="conduct-v-card-text">
          <v-window v-model="tab">
            <v-window-item v-for="item in roomFactorList" :value="item._id">
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<style scoped>
@import url("./index.scss");
</style>
