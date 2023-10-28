<script setup>
import IconXMark from "@/assets/svg/x-mark.svg";
import IconClose from "@/assets/svg/close.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import { useForm } from "vee-validate";
import * as yup from "yup";

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().trim().required(),
    email: yup.string().trim().required(),
    phone: yup.string().trim().required(),
    gender: yup.string(),
    date_start: yup.string().required(),
    room_deposit_amount: yup.number().required(),
  }),
  initialValues: {
    room_deposit_amount: 0,
  },
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  email: defineComponentBinds("email"),
  phone: defineComponentBinds("phone"),
  gender: defineComponentBinds("gender"),
  date_start: defineComponentBinds("date_start"),
  room_deposit_amount: defineComponentBinds("room_deposit_amount"),
});
</script>
<template>
  <div class="modal-change-information">
    <div class="">
      <button
        @click="$emit('close')"
        class="modal-change-information__btn-close"
      >
        <IconClose />
      </button>
      <h5
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Chỉnh sửa thông tin phòng
      </h5>
      <p class="tw-text-[15px] tw-leading-5 tw-text-center">
        A message should be a short, complete sentence.
      </p>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-input
          label="Tên"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>
        <g-date-picker
          v-bind="validateFormData.date_start"
          :error="errors.date_start"
          class="tw-pt-4"
          label="Ngày bắt đầu"
          required
        ></g-date-picker>
        <g-input class="tw-pt-4" label="Email"> </g-input>
        <g-input class="tw-pt-4" label="Số điện thoại" required> </g-input>
        <g-autocomplete label="Dân tộc" class="tw-mt-4"> </g-autocomplete>
        <g-input class="tw-pt-4" label="Địa chỉ"> </g-input>
      </div>
      <hr class="tw-mt-8" />
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="$emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
      <g-button>Cập nhật</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
