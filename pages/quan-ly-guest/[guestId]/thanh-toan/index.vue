<script setup>
import { usePaymentStore } from "@/store/payment";
import ModalOpenMethod from "~/components/pages/guest/ModalOpenMethod.vue";

const paymentStore = usePaymentStore();

const paymentMethods = ref([]);
const isOpenModalMethod = ref(false);
const image = ref("");

const getAllPaymentMethod = async () => {
  const res = await paymentStore.getAllPaymentMethodByGuest();
  if (res.data) {
    paymentMethods.value = res.data.paymentMethods;
    console.log(paymentMethods.value);
  }
};

getAllPaymentMethod();

const handleOpenModalMethod = (e) => {
  isOpenModalMethod.value = true;
  image.value = e;
};
</script>
<template>
  <g-button @click="useRouter().back()" class="tw-m-5">Trở lại</g-button>
  <div class="tw-grid tw-grid-cols-3 tw-p-5 tw-gap-3">
    <div v-for="item in paymentMethods">
      <a
        class="tw-block tw-rounded-lg tw-p-4 tw-shadow-indigo-100 tw-shadow-xl tw-min-w-[300px]"
      >
        <img
          @click="handleOpenModalMethod(item.image)"
          alt="Home"
          :src="item.image"
          class="tw-h-56 tw-w-full tw-rounded-md tw-object-cover tw-cursor-pointer"
        />
        <div class="tw-mt-2">
          <dl>
            <div>
              <dt class="tw-sr-only">Price</dt>
              <dd class="tw-text-sm tw-text-gray-500">
                {{ item.name }}
              </dd>
            </div>
            <div>
              <dd class="tw-font-bold">{{ item.type }}</dd>
              <p>
                {{ item.details }}
              </p>
            </div>
          </dl>
          <!-- <div
          class="tw-mt-6 tw-flex tw-items-center tw-gap-8 tw-text-xs tw-justify-between"
        >
          <div
            class="sm:tw-inline-flex sm:tw-shrink-0 sm:tw-items-center sm:tw-gap-2"
          >
            <IconUser />
            <div class="tw-mt-1.5 sm:tw-mt-0">
              <p class="text-gray-500">Tối đa</p>
              <p class="font-medium">{{ roomInfo.max_customer }} người</p>
            </div>
          </div>
        </div> -->
        </div>
      </a>
    </div>
  </div>
  <v-dialog v-model="isOpenModalMethod" width="544">
    <ModalOpenMethod @close="isOpenModalMethod = false" :image="image" />
  </v-dialog>
</template>
