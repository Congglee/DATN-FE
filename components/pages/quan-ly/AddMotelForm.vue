<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useRoomStore } from "@/store/room";
//props
const props = defineProps({});

//composable

const emit = defineEmits(["close"]);
const fetchListMotel = useEventBus(`fetch-list-motel`);
const toast = useToast();
const route = useRoute();

//store
const roomStore = useRoomStore();

//state
const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .trim("Tên không được bỏ trống ")
      .required("Tên cơ sở là trường bắt buộc")
      .min(3, "Tên tối thiểu 3 ký tự"),
    address: yup
      .string()
      .trim("Địa chỉ không được bỏ trống")
      .required("Địa chỉ là trường bắt buộc")
      .min(3, "Địa chỉ tối thiểu 3 ký tự"),
    city: yup
      .string()
      .trim("Tỉnh / Thành phố không được bỏ trống")
      .required("Tỉnh / Thành phố là trường bắt buộc")
      .min(3, "Tỉnh / Thành phố tối thiểu 3 ký tự"),
    ward: yup
      .string()
      .trim("Quận / Huyện không được bỏ trống")
      .required("Quận / Huyện là trường bắt buộc")
      .min(3, "Quận / Huyện tối thiểu 3 ký tự"),
    district: yup
      .string()
      .trim("Phường / Xã không được bỏ trống")
      .required("Phường / Xã là trường bắt buộc")
      .min(3, "Phường / Xã tối thiểu 3 ký tự"),
    // password: yup
    //   .string()
    //   .trim("Mật khẩu không được bỏ trống")
    //   .required("Mật khẩu là trường bắt buộc")
    //   .min(6, "Mật khẩu tối thiểu 6 ký tự"),
  }),
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  address: defineComponentBinds("address"),
  city: defineComponentBinds("city"),
  ward: defineComponentBinds("ward"),
  district: defineComponentBinds("district"),
});

//methods

const createMotel = handleSubmit(async () => {
  const payload = { ...values };
  const res = await roomStore.createMotel(payload);
  if (res.data) {
    toast.success("Tạo nhà trọ thành công!");
    fetchListMotel.emit();
  }
  if (res.error) {
    toast.error("Tạo nhà trọ thất bại!");
  }
});
</script>
<template>
  <div class="modal-change-information">
    <div class="">
      <button
        @click="emit('close')"
        class="modal-change-information__btn-close"
      >
        <IconClose />
      </button>
      <h5
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Thêm nhà trọ mới
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-flex-col tw-gap-y-4">
        <g-input
          class="tw-pt-4"
          label="Tên nhà trọ"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>
        <g-input
          class="tw-pt-4"
          label="Địa chỉ cụ thể"
          required
          v-bind="validateFormData.address"
          :error="errors.address"
        >
        </g-input>
        <div class="tw-grid tw-grid-cols-3 tw-gap-x-4 tw-pt-4">
          <g-input
            label="Tỉnh/TP"
            required
            v-bind="validateFormData.city"
            :error="errors.city"
          ></g-input>
          <g-input
            label="Quận/Huyện"
            required
            v-bind="validateFormData.ward"
            :error="errors.ward"
          ></g-input>
          <g-input
            label="Phường/Xã"
            required
            v-bind="validateFormData.district"
            :error="errors.district"
          ></g-input>
        </div>
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button @click="createMotel">Thêm</g-button
      ><g-button variant="bezeled" class="tw-w-full" @click="$emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
