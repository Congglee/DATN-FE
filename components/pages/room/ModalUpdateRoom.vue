<script setup lang="ts">
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import IconRequired from "@/assets/svg/required.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
//props
const props = defineProps({});

//composable
const toast = useToast();
const route: any = useRoute();

//emit

//store

//methods
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
        <div class="tw-grid tw-grid-cols-3 tw-gap-x-4 tw-pt-4">
          <g-input label="Họ" required></g-input>
          <g-input label="Tên đệm"></g-input>
          <g-input label="Tên" required></g-input>
        </div>
        <g-date-picker class="tw-pt-4" label="Ngày tháng năm sinh" required>
          <template #append>
            <IconCalendar />
          </template>
        </g-date-picker>
        <g-input class="tw-pt-4" label="Email"> </g-input>
        <g-input class="tw-pt-4" label="Số điện thoại" required> </g-input>
        <g-autocomplete label="Dân tộc" class="tw-mt-4"> </g-autocomplete>
        <g-input class="tw-pt-4" label="Địa chỉ"> </g-input>
      </div>
      <hr class="tw-mt-8" />
      <div class="tw-w-full tw-py-8">
        <div class="tw-grid tw-gap-y-4">
          <div class="tw-flex tw-gap-x-1">
            <p>Giới tính</p>
            <IconRequired class="tw-mt-1" />
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-8">
            <g-radio-group name="gender" inline />
          </div>
        </div>
      </div>
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
