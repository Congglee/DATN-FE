<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useArisesStore } from "~/store/arises";
import { useMotelStore } from "~/store/motel";
import { convertMonthYear, formatMonthYear } from "~/utils/helps";

//props

//composable
const toast = useToast();
const route = useRoute();
const idMotel = route.params?.motelId;
const fetchListArisesEventBus = useEventBus(`fetch-list-arises`);

//emit

const emit = defineEmits("close");

//store

const motelStore = useMotelStore();
const arisesStore = useArisesStore();
const owner = JSON.parse(window.localStorage.getItem("owner"));

//state
const listMotel = ref(null);
const listRoom = ref([]);
const roomId = ref(null);
const monthYear = ref(null);
const msg_err_room = ref(null);
const msg_err_note = ref(null);

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    monthYear: yup
      .string()
      .trim()
      .required("Ngày tháng phát sinh không được bỏ trống"),
    price: yup
      .number()
      .typeError("Chi phí phải là số")
      .min(0, "Chi phí phải là một số dương")
      .required("Chi phí không được bỏ trống"),
  }),
});
const validateFormData = reactive({
  monthYear: defineComponentBinds("monthYear"),
  price: defineComponentBinds("price"),
});

const formData = reactive({
  note: "",
});

const loading = ref(false);

//methods
const getAllRoom = async (idMotel) => {
  try {
    listRoom.value = [];
    const res = await motelStore.getOneMotels(idMotel);
    if (res.data) {
      listRoom.value = res.data.motelData.roomIds;
    }
  } catch (error) {
    throw error;
  }
};
getAllRoom(idMotel);

const getAllMotels = async () => {
  try {
    const res = await motelStore.getMotels(owner._id);
    if (res.data) {
      listMotel.value = res.data.motels.filter((item) => item._id == idMotel);
    }
  } catch (error) {
    throw error;
  }
};
getAllMotels();

const onHandleRoom = (event) => {
  if (event.target.value == "all") return (roomId.value = null);
  roomId.value = event.target.value;
};

const handleCreateArises = handleSubmit(async () => {
  const payload = {
    ...values,
    monthYear: convertDateType(values.monthYear, "MM/YYYY"),
    ...formData,
    roomId: roomId?._value,
  };
  if (payload.roomId == null) {
    return toast.error("Vui lòng chọn phòng");
  }
  if (payload.note.trim() == "") {
    return toast.error("Nội dung chi phí không được bỏ trống");
  }
  loading.value = true;
  const res = await arisesStore.createArises(payload);
  if (res.data) {
    fetchListArisesEventBus.emit();
    toast.success("Cập nhật chi phi phát sinh thành công!");
    loading.value = false;
    emit("close");
  }
  if (res.error) {
    fetchListArisesEventBus.emit();
    emit("close");
    toast.error(res.error.data.message);
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
        Chi phí phát sinh
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <div class="tw-flex tw-flex-col tw-text-black">
          <h5 class="tw-text-[14px] tw-py-2">Nhà Trọ</h5>
          <select
            class="form-control tw-h-[38px] tw-border-gray-400 focus:tw-outline-none tw-px-2 tw-bg-white tw-text-[16px] tw-text-gray-600"
            style="
              border: 1px solid rgb(218, 218, 218) !important ;
              border-radius: 3px;
            "
          >
            <option
              v-for="item in listMotel"
              :key="item?.id"
              :value="item?._id"
              selected
            >
              {{ item?.name }}
            </option>
          </select>
        </div>
        <div class="tw-flex tw-flex-col tw-text-black">
          <h5 class="tw-text-[14px] tw-py-2">Nhà Trọ</h5>
          <select
            class="form-control tw-h-[38px] tw-border-gray-400 focus:tw-outline-none tw-px-2 tw-bg-white tw-text-[16px] tw-text-gray-600"
            style="
              border: 1px solid rgb(218, 218, 218) !important ;
              border-radius: 3px;
            "
            @change="onHandleRoom($event)"
          >
            <option value="all" selected>Danh sách phòng</option>
            <option v-for="item in listRoom" :key="item?.id" :value="item?._id">
              {{ item?.name }}
            </option>
          </select>
        </div>

        <g-date-picker
          class="tw-pt-4"
          label="Theo tháng"
          v-bind="validateFormData.monthYear"
          :error="errors.monthYear"
        ></g-date-picker>
        <g-input
          class="tw-pt-4"
          label="Số tiền phát sinh"
          placeholder="0"
          v-bind="validateFormData.price"
          :error="errors.price"
        >
        </g-input>
        <div class="tw-gap-y-1 tw-grid tw-pt-4">
          <p>Ghi chú</p>
          <textarea
            placeholder="Nội dung ...."
            v-model="formData.note"
            class="tw-resize-none tw-rounded-[10px] tw-bg-white tw-outline tw-p-3 !tw-outline-[#c0c0c0] tw-outline-[1px] focus:!tw-outline-[#f88125] tw-w-full tw-h-[158px] focus:!tw-shadow-[0px_0px_0px_2px_rgba(248,129,37,0.2)]"
          ></textarea>
        </div>
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
      <g-button @click="handleCreateArises" :loading="loading"
        >Cập nhật</g-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
