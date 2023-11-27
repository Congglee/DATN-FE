<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import IconRequired from "@/assets/svg/required.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useDepositsStore } from "~/store/deposits";
import { useMotelStore } from "~/store/motel";
//props

const props = defineProps({
  data: {
    Type: Array,
    default: [],
  },
});

//composable
const toast = useToast();
const route = useRoute();
const fetchListDepositsEventBus = useEventBus(`fetch-list-deposits`);

//emit

const emit = defineEmits("close");

//store
const depositsStore = useDepositsStore();
const depositId = props.data._id;

//state
const note = ref(props.data.note);

function convertDATE(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${month}/${day}/${year}`;
}

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .trim("Tên phòng không được bỏ trống ")
      .required("Tên phòng là trường bắt buộc")
      .min(3, "Tên tối thiểu 3 ký tự"),
    money: yup
      .number()
      .typeError("Cọc phòng phải là số")
      .required("Cọc phòng là trường bắt buộc")
      .min(0, "Cọc phải lớn >= 0"),
    phone: yup
      .string()
      .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ")
      .test(
        "is-phone-length",
        "Số điện thoại phải có độ dài 10 ký tự",
        (value) => {
          return value.length === 10;
        }
      )
      .required("Số điện thoại là trường bắt buộc"),
    bookingDate: yup.string().trim().required("Ngày đặt cọc"),
    checkInDate: yup.string().trim().required("Ngày bắt đầu vào ở"),
    note: yup.string().default("").trim(),
    status: yup.string().required("Trạng thái là trường bắt buộc"),
  }),
  initialValues: {
    ...props.data,
    bookingDate: convertDATE(props.data.bookingDate),
    checkInDate: convertDATE(props.data.checkInDate),
  },
});
const status_data = [
  {
    title: "Đã thanh toán",
    status: true,
  },
  {
    title: "Chưa thanh toán",
    status: false,
  },
];
const validateFormData = reactive({
  name: defineComponentBinds("name"),
  money: defineComponentBinds("money"),
  phone: defineComponentBinds("phone"),
  bookingDate: defineComponentBinds("bookingDate"),
  checkInDate: defineComponentBinds("checkInDate"),
  status: defineComponentBinds("status"),
});

const formData = reactive({
  note: "",
});

const loading = ref(false);

// //methods

const createDeposits = handleSubmit(async () => {
  function removeUnwantedProperties(obj) {
    const { _id, createdAt, updatedAt, __v, ...cleanedObj } = obj;
    return cleanedObj;
  }
  const payload = {
    ...values,
    ...formData,
    bookingDate: convertDateType(values.bookingDate, "DD/MM/YYYY"),
    checkInDate: convertDateType(values.checkInDate, "DD/MM/YYYY"),
    expectedArrivalDate: convertDateType(values.checkInDate, "DD/MM/YYYY"),
    status: values.status,
    note: note._value,
    roomId: props.data.roomId._id,
    motelId: props.data.motelId._id,
  };
  if (payload.roomId == null || payload.roomId == "all") {
    return toast.error("Kiểm tra lại phòng cọc");
  }
  if (new Date(values.bookingDate) > new Date(values.checkInDate)) {
    return toast.error("Ngày đặt cọc phải bé hơn ngày vào ở");
  }
  const sendData = removeUnwantedProperties(payload);
  loading.value = true;
  const res = await depositsStore.updateDeposits({
    _id: props.data._id,
    data: sendData,
  });
  if (res.data) {
    fetchListDepositsEventBus.emit();
    toast.success("Cập nhật cọc phòng thành công!");
    loading.value = false;
    emit("close");
  }
  if (res.error) {
    toast.error(res.error.data.message);
    loading.value = false;
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
        Cập nhật cọc phòng
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <div class="tw-flex tw-flex-col tw-text-black">
          <h5 class="tw-text-[14px] tw-py-2">Nhà Trọ</h5>
          <div
            class="form-control tw-h-[38px] tw-flex tw-justify-center tw-items-center tw-border-gray-400 focus:tw-outline-none tw-px-2 tw-bg-white tw-text-[16px] tw-text-gray-600"
            style="
              border: 1px solid rgb(218, 218, 218) !important ;
              border-radius: 3px;
            "
          >
            <span>{{ props.data?.motelId?.name }}</span>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-text-black">
          <h5 class="tw-text-[14px] tw-py-2">Phòng trọ</h5>
          <div
            class="form-control tw-h-[38px] tw-flex tw-justify-center tw-items-center tw-border-gray-400 focus:tw-outline-none tw-px-2 tw-bg-white tw-text-[16px] tw-text-gray-600"
            style="
              border: 1px solid rgb(218, 218, 218) !important ;
              border-radius: 3px;
            "
          >
            <span>{{ props.data?.roomId?.name }}</span>
          </div>
        </div>
        <g-input
          label="Họ tên người cọc"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>
        <g-input
          label="Số tiền cọc"
          required
          v-bind="validateFormData.money"
          :error="errors.money"
        ></g-input>
        <g-input
          class="tw-pt-4"
          label="Điện thoại liên hệ"
          required
          v-bind="validateFormData.phone"
          :error="errors.phone"
        >
        </g-input>
        <g-date-picker
          class="tw-pt-4"
          label="Ngày đặt cọc"
          v-bind="validateFormData.bookingDate"
          :error="errors.bookingDate"
        ></g-date-picker>
        <g-date-picker
          class="tw-pt-4"
          label="Ngày bắt đầu ở"
          v-bind="validateFormData.checkInDate"
          :error="errors.checkInDate"
        ></g-date-picker>
        <div class="tw-gap-y-1 tw-grid tw-pt-4">
          <p>Ghi chú</p>
          <textarea
            :value="note"
            @input="note = $event.target.value"
            class="tw-resize-none tw-rounded-[10px] tw-bg-white tw-outline tw-p-3 !tw-outline-[#c0c0c0] tw-outline-[1px] focus:!tw-outline-[#f88125] tw-w-full tw-h-[158px] focus:!tw-shadow-[0px_0px_0px_2px_rgba(248,129,37,0.2)]"
          ></textarea>
        </div>
        <g-select
          class="tw-pt-4"
          label="Trạng thái"
          :items="status_data"
          required
          v-bind="validateFormData.status"
          :error="errors.status"
        >
        </g-select>
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Đóng
      </g-button>
      <g-button @click="createDeposits" :loading="loading">Cập nhật</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
