<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useMotelStore } from "@/store/motel";
import { useAdministrativeStore } from "@/store/administrative";
//props
const props = defineProps({
  motelInfo: {
    type: Object,
    default: {},
  },
});

//composable

const emit = defineEmits(["close"]);
const fetchListMotel = useEventBus(`fetch-list-motel`);
const toast = useToast();
const route = useRoute();

//store
const motelStore = useMotelStore();
const administrativeStore = useAdministrativeStore();

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
    // password: yup
    //   .string()
    //   .trim("Mật khẩu không được bỏ trống")
    //   .required("Mật khẩu là trường bắt buộc")
    //   .min(6, "Mật khẩu tối thiểu 6 ký tự"),
  }),
  initialValues: {
    name: props.motelInfo.name,
    address: props.motelInfo.address,
  },
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  address: defineComponentBinds("address"),
});

const province = ref("Hà Nội");
const districts = ref([]);
const wards = ref([]);
const choosedDistrict = ref(props.motelInfo.district);
const choosedWard = ref(props.motelInfo.ward);
const id = ref(props.motelInfo._id);

//methods

const getDistrictOfHaNoi = async () => {
  const params = {
    provinceCode: "01",
    limit: "-1",
  };
  const res = await administrativeStore.getDistrictOfHaNoi(params);
  if (res.data) {
    districts.value = res.data.data.data;
  }
};

getDistrictOfHaNoi();

const getWards = async (e) => {
  const params = {
    districtCode: e.code,
    limit: "-1",
  };
  const res = await administrativeStore.getWardByDistrict(params);
  if (res.data) {
    wards.value = res.data.data.data;
  }
};

getWards(choosedDistrict.value);

watch(
  () => choosedDistrict.value,
  (newVal) => {
    choosedWard.value = "";
    getWards(newVal);
  }
);

const updateMotel = handleSubmit(async () => {
  const payload = {
    ...values,
    city: province.value,
    district: choosedDistrict.value.name,
    ward: choosedWard.value.name,
  };
  const res = await motelStore.updateMotel(payload, id.value);
  if (res.data) {
    toast.success("Cập nhà trọ thành công!");
    fetchListMotel.emit();
    emit("close");
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
          <g-autocomplete
            label="Tỉnh/TP"
            disabled
            v-model="province"
          ></g-autocomplete>
          <g-autocomplete
            v-model="choosedDistrict"
            label="Quận/Huyện"
            required
            :items="districts"
            item-title="name"
          ></g-autocomplete>
          <g-autocomplete
            v-model="choosedWard"
            label="Phường/Xã"
            required
            :items="wards"
            item-title="name"
            :disabled="!choosedDistrict"
          ></g-autocomplete>
        </div>
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button @click="updateMotel">Thêm</g-button
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
~/store/motel
