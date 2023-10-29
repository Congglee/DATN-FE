<script setup>
import IconXMark from "@/assets/svg/x-mark.svg";
import IconClose from "@/assets/svg/close.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import { useForm } from "vee-validate";
import { genders } from "@/utils/constants";
import * as yup from "yup";
import { useMemberStore } from "~/store/member";
import { useToast } from "vue-toastification";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const toast = useToast();

const emit = defineEmits(["close"]);

//store
const memberStore = useMemberStore();

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().trim().required(),
    email: yup.string().email().trim().required(),
    phone: yup.string().trim().required().length(10),
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
  date_start: defineComponentBinds("date_start"),
  room_deposit_amount: defineComponentBinds("room_deposit_amount"),
});
const gender = ref(genders[0].value);

//method

const handleCreateRoomHost = handleSubmit(async () => {
  const startDateConverted = convertDateType(
    validateFormData.date_start.modelValue,
    "DD/MM/YYYY"
  );
  const payload = {
    ...values,
    date_start: startDateConverted,
    roomId: props.roomInfo._id,
  };
  const res = await memberStore.createRoomHost(payload);
  if (res.data) {
    toast.success("Thêm chủ phòng thành công");
    emit("close");
  }
  if (res.error) {
    toast.error(res.error.data.message);
  }
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
        Thêm chủ phòng
      </h5>
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
        <g-input
          class="tw-pt-4"
          label="Email"
          v-bind="validateFormData.email"
          :error="errors.email"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Số điện thoại"
          required
          v-bind="validateFormData.phone"
          :error="errors.phone"
        >
        </g-input>
        <div class="tw-w-full tw-py-8">
          <div class="tw-grid tw-gap-y-4">
            <div class="tw-flex tw-gap-x-1">
              <p>Giới tính</p>
              <IconRequired class="tw-mt-1" />
            </div>
            <div class="tw-flex tw-items-center tw-gap-x-8">
              <g-radio-group
                name="gender"
                :options="genders"
                v-model="gender"
                inline
              />
            </div>
          </div>
        </div>
        <g-input
          class="tw-pt-4"
          label="Tiền cọc"
          required
          v-bind="validateFormData.room_deposit_amount"
        >
        </g-input>
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
      <g-button @click="handleCreateRoomHost">Thêm</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
