<script setup>
import { usePaymentStore } from "@/store/payment";
import { useGuestStore } from "@/store/guest";
import ModalOpenMethod from "~/components/pages/guest/ModalOpenMethod.vue";

const route = useRoute();

const paymentStore = usePaymentStore();
const guestStore = useGuestStore();

const paymentMethods = ref([]);
const isOpenModalMethod = ref(false);
const image = ref("");
const billDetail = ref(null);

const getAllPaymentMethod = async () => {
  const res = await paymentStore.getAllPaymentMethodByGuest();
  if (res.data) {
    paymentMethods.value = res.data.paymentMethods;
  }
};

getAllPaymentMethod();
const getBillDetail = async () => {
  const res = await guestStore.guestRoomBill(route.params.billId);
  if (res.data) {
    billDetail.value = res.data.detailBill[0];
    console.log(billDetail.value);
  }
};

getBillDetail();

const handleOpenModalMethod = (e) => {
  isOpenModalMethod.value = true;
  image.value = e;
};
</script>
<template>
  <g-button @click="useRouter().back()" class="tw-m-5">Trở lại</g-button>
  <div class="tw-w-full tw-flex tw-flex-col tw-items-center" v-if="billDetail">
    <div class="tw-w-[50%]">
      <div class="tw-flex tw-justify-between">
        <div class="tw-w-[30%] tw-flex tw-flex-col tw-gap-y-2">
          <p class="tw-text-[22px] tw-text-[#f88125] tw-font-bold">
            Poly Home Rental
          </p>
          <p class="tw-font-bold">
            Địa chỉ: Tòa nhà FPT Polytechnic, Cổng số 2, 13 P.Trịnh Văn Bô, Xuân
            Phương, Nam Từ Liêm, Hà Nội
          </p>
          <p class="tw-font-bold">Mã số thuế: 888888</p>
        </div>
        <div class="tw-w-[30%] tw-flex tw-flex-col tw-gap-y-2">
          <p class="tw-font-bold">Hóa đơn số: 417231</p>
          <p class="tw-font-bold">
            Ngày:
            {{ convertDateType(billDetail?.dateStart, "DD/MM/YYYY") }}
          </p>
        </div>
      </div>
      <div class="tw-w-full tw-h-[4px] tw-bg-[#f88125] tw-mt-6"></div>
      <div class="tw-flex tw-justify-center">
        <p class="tw-text-[30px] tw-mt-5 tw-font-bold">Hóa đơn tiền nhà</p>
      </div>
      <div class="tw-grid tw-grid-cols-3 tw-gap-x-4 tw-mt-4">
        <div class="tw-flex tw-flex-col tw-items-center">
          <div class="tw-w-full tw-h-[2px] tw-bg-[#f88125]"></div>
          <p class="tw-font-bold tw-text-[14px] tw-mt-2">Tiền phòng</p>
          <div class="tw-w-full tw-flex tw-justify-start tw-mt-2">
            <div class="tw-w-full tw-justify-between tw-flex">
              <p class="tw-font-bold">Tiền phòng:</p>
              <p class="tw-font-bold">
                {{ formatCurrency(billDetail?.roomPrice) }}
              </p>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-items-center">
          <div class="tw-w-full tw-h-[2px] tw-bg-[#f88125]"></div>
          <p class="tw-font-bold tw-text-[14px] tw-mt-2">Tiền dịch vụ</p>
          <div class="tw-w-full tw-flex tw-flex-col tw-justify-start tw-mt-2">
            <div class="tw-w-full tw-justify-between tw-flex">
              <p class="tw-font-bold">Tiền điện:</p>
              <p class="tw-font-bold">
                {{ formatCurrency(billDetail.electricityPrice) }}
              </p>
            </div>
            <div class="tw-w-full tw-justify-between tw-flex">
              <p class="tw-font-bold">Tiền nước:</p>
              <p class="tw-font-bold">
                {{ formatCurrency(billDetail.waterPrice) }}
              </p>
            </div>
            <div
              class="tw-w-full tw-justify-between tw-flex"
              v-for="item in billDetail?.serviceOrther"
            >
              <p class="tw-font-bold">{{ item.name }}:</p>
              <p class="tw-font-bold">
                {{ formatCurrency(item.price) }}
              </p>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-items-center">
          <div class="tw-w-full tw-h-[2px] tw-bg-[#f88125]"></div>
          <p class="tw-font-bold tw-text-[14px] tw-mt-2">Chi phí phát sinh</p>
          <div class="tw-w-full tw-flex tw-justify-start tw-mt-2">
            <div class="tw-w-full tw-justify-between tw-flex">
              <p class="tw-font-bold">Chi phí phát sinh:</p>
              <p class="tw-font-bold">
                {{ formatCurrency(billDetail?.roomPrice) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="tw-grid tw-grid-cols-3 tw-p-5 tw-gap-3">
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
        </div>
      </a>
    </div>
  </div> -->
  <v-dialog v-model="isOpenModalMethod" width="544">
    <ModalOpenMethod @close="isOpenModalMethod = false" :image="image" />
  </v-dialog>
</template>
