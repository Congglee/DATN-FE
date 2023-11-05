<script setup>
import { useRoomStore } from "~/store/room";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import BillByRoomItem from "@/components/pages/hoa-don/BillByRoomItem.vue";

const route = useRoute();

const roomStore = useRoomStore();

const listRoom = ref([]);

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px"
  },
  {
    title: "Tên phòng",
    sortable: false,
    key: "roomName",
  },
  {
    title: "Họ và tên chủ",
    sortable: false,
    key: "fullName",
  },
  {
    title: "Điện thoại",
    sortable: false,
    key: "phone",
  },
  {
    title: "Email",
    sortable: false,
    key: "email",
  },
];

const billDate = ref("");

const getAllRoomOfMotel = async (query) => {
  const payload = {
    motelId: route.params.motelId,
    status: query?.status,
  };
  const res = await roomStore.getAllRoomOfMotel(payload);
  if (res.data) {
    // listRoom.value = res.data.rooms;
    // console.log(listRoom.value)
    res.data.rooms.map((el) => {
      if (el.memberIds.length > 0) {
        listRoom.value.push(el);
      }
    });
  }
};

getAllRoomOfMotel();
</script>

<template>
  <g-date-picker
    class="tw-w-[200px] tw-mb-5"
    label="Chọn kì"
    v-model="billDate"
  ></g-date-picker>
  <v-data-table :headers="headers" class="s-table" :items="listRoom">
    <template #item="{ item, index }">
      <BillByRoomItem :item="item" :index="index" :billDate="billDate" />
    </template>
  </v-data-table>
</template>
