<script setup>
import IconUser from "@/assets/svg/profile/user.svg";
import IconGrowArrow from "@/assets/svg/grow-arrow.svg";
import ModalChooseEditOption from "@/components/pages/room/ModalChooseEditOption.vue";
import ModalUpdateRoom from "@/components/pages/room/ModalUpdateRoom.vue";
import ModalAddRoomMember from "@/components/pages/room/ModalAddRoomMember.vue";

const isShowChooseEditOption = ref(false);
const isShowUpdateRoom = ref(false);
const isShowAddRoomMember = ref(false);
</script>
<template>
  <a
    href="#"
    class="tw-block tw-rounded-lg tw-p-4 tw-shadow-indigo-100 tw-shadow-xl"
  >
    <img
      alt="Home"
      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      class="tw-h-56 tw-w-full tw-rounded-md tw-object-cover"
    />
    <div class="tw-mt-2">
      <dl>
        <div>
          <dt class="tw-sr-only">Price</dt>
          <dd class="tw-text-sm tw-text-gray-500">$240,000</dd>
        </div>
        <div>
          <dt class="tw-sr-only">Address</dt>
          <dd class="tw-font-medium">123 Wallaby Avenue, Park Road</dd>
        </div>
      </dl>
      <div
        class="tw-mt-6 tw-flex tw-items-center tw-gap-8 tw-text-xs tw-justify-between"
      >
        <div
          class="sm:tw-inline-flex sm:tw-shrink-0 sm:tw-items-center sm:tw-gap-2"
        >
          <IconUser />
          <div class="tw-mt-1.5 sm:tw-mt-0">
            <p class="text-gray-500">Tối đa</p>
            <p class="font-medium">4 người</p>
          </div>
        </div>
        <div>
          <g-button variant="bezeled" @click="isShowChooseEditOption = true">
            <span>Chỉnh sửa</span>
          </g-button>
        </div>
      </div>
    </div>
  </a>
  <v-dialog v-model="isShowChooseEditOption" width="544" persistent scrollable>
    <ModalChooseEditOption
      @close="isShowChooseEditOption = false"
      @editRoom="(isShowChooseEditOption = false), (isShowUpdateRoom = true)"
      @addRoomMember="
        (isShowChooseEditOption = false), (isShowAddRoomMember = true)
      "
    />
  </v-dialog>
  <v-dialog v-model="isShowUpdateRoom" width="544" persistent scrollable>
    <ModalUpdateRoom @close="isShowUpdateRoom = false" />
  </v-dialog>
  <v-dialog v-model="isShowAddRoomMember" width="544" persistent scrollable>
    <ModalAddRoomMember @close="isShowAddRoomMember = false" />
  </v-dialog>
</template>
