<script setup>
import { useRoomStore } from "@/store/room";
import MotelsCard from "@/components/pages/quan-ly/MotelsCard.vue";
import Header from "~/components/global/header/Header.vue";
import Footer from "~/components/global/footer/Footer.vue";
import "@/assets/css/main.css";
import { useForm } from "vee-validate";
import AddMotelForm from "@/components/pages/quan-ly/AddMotelForm.vue";
import * as yup from "yup";

const fetchListMotel = useEventBus(`fetch-list-motel`);

//store
const roomStore = useRoomStore();

const motels = ref(null);
const isDisplayAddMotel = ref(false);

const getAllMotels = async () => {
  const res = await roomStore.getMotels();
  if (res.data) {
    motels.value = res.data.motels;
  }
};
getAllMotels();

fetchListMotel.on(() => {
  getAllMotels();
  isDisplayAddMotel.value = false;
});
</script>
<template>
  <Header></Header>
  <section
    class="tw-bg-[linear-gradient(193deg,#f5f5f5_0%,#f7dfd0_66%,#dedede_100%)] tw-min-h-[85vh]"
  >
    <aside class="tw-bg-[#f88125] tw-text-white">
      <div
        class="tw-w-full tw-max-w-7xl tw-m-auto tw-flex max-lg:tw-flex-col tw-justify-between tw-items-center"
      >
        <h3
          class="tw-py-3 max-lg:tw-py-2 tw-text-2xl max-lg:tw-text-xl tw-font-medium"
        >
          Danh sách nhà trọ
        </h3>
        <div class="">
          <div class="tw-flex tw-items-center tw-gap-x-3">
            <g-button @click="isDisplayAddMotel = true" variant="bezeled"
              >Thêm nhà trọ</g-button
            >
            <v-dialog width="544" v-model="isDisplayAddMotel">
              <AddMotelForm @close="isDisplayAddMotel = false" />
            </v-dialog>
            <g-input></g-input>
          </div>
        </div>
      </div>
    </aside>
    <aside
      v-if="!motels || motels.length == 0"
      class="tw-py-2 tw-px-5 tw-w-full tw-text-center"
    >
      <h2 class="tw-font-semibold tw-py-20 tw-text-gray-600">
        Danh sách trống
      </h2>
    </aside>
    <aside
      v-if="motels && motels.length > 0"
      class="tw-grid tw-grid-flow-cols lg:tw-grid-cols-5 md:tw-grid-cols-3 sm:tw-grid-cols-1 lg:tw-gap-10 tw-gap-1 tw-py-2 tw-px-5"
    >
      <MotelsCard :items="item" v-for="item in motels" />
    </aside>
  </section>
  <Footer></Footer>
</template>
