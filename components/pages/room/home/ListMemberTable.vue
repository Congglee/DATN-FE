<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useMemberStore } from "@/store/member";
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";

const route = useRoute();

const memberStore = useMemberStore();

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Họ và tên",
    sortable: false,
    key: "fullName",
    width: "213px",
  },
  {
    title: "Giới tính",
    sortable: false,
    key: "gender",
    width: "150px",
  },
  {
    title: "CMND/CCCD",
    sortable: false,
    key: "identify_code",
    width: "150px",
  },
  {
    title: "Địa chỉ",
    sortable: false,
    key: "address",
    width: "213px",
  },
  {
    title: "Điện thoại",
    sortable: false,
    key: "phone",
    width: "150px",
  },
  {
    title: "Số xe",
    sortable: false,
    key: "vehicle_number",
    width: "150px",
  },
  {
    title: "Ngày bắt đầu",
    sortable: false,
    key: "start_date",
  },
];

const roomMembers = ref([]);

const getAllMemberInRoom = async () => {
  const res = await memberStore.getAllMemberInRoom(route.params.roomId);
  if (res.data) {
    console.log(res.data);
    roomMembers.value = res.data.roomMembers;
  }
};

getAllMemberInRoom();
</script>
<template>
  <v-data-table :headers="headers" class="s-table" :items="roomMembers">
    <template #item="{ item, index }">
      <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
        <td class="tw-text-center">{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.gender || "Không có" }}</td>
        <td>{{ item.identify_code || "Không có" }}</td>
        <td>
          {{ item.address || "Không có" }}
        </td>
        <td>{{ item.phone || "Không có" }}</td>
        <td>{{ item.vehicle_number || "Không có" }}</td>
        <td>{{ item.start_date || "Không có" }}</td>
        <div
          class="tw-absolute tw-right-3 tw-top-[50%] tw-translate-y-[-50%] tw-hidden group-hover:tw-flex tw-space-x-2"
        >
          <div>
            <g-button class="!tw-ml-0 !tw-p-1" variant="bezeled">
              <IconEdit />
            </g-button>
          </div>
          <div>
            <g-button class="!tw-ml-0 !tw-p-1" variant="bezeled">
              <IconRemove class="!tw-ml-0" />
            </g-button>
          </div>
        </div>
      </tr>
    </template>
  </v-data-table>
</template>
