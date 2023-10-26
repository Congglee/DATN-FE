<script setup>
import IconUser from "@/assets/svg/login/user.svg";
import IconLock from "@/assets/svg/login/lock.svg";
import IconEye from "@/assets/svg/login/eye.svg";
import IconEyeSlash from "@/assets/svg/login/eye-slash.svg";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { setAccessToken } from "@/utils/auth";
import jwt_decode from "jwt-decode";
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";

//composable

const toast = useToast()

//store
const authStore = useAuthStore();

//state

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .trim()
      .required()
      .min(3, "Tên đăng nhập không thể nhỏ hơn 3 ký tự"),
    password: yup
      .string()
      .trim()
      .required()
      .max(255, "Mật khẩu không được lớn hơn 255 ký tự."),
  }),
});

const formData = reactive({
  email: defineComponentBinds("email"),
  password: defineComponentBinds("password"),
});

const isCheck = ref(false);
const isShowPassword = ref(false);

//method

const handleSignin = handleSubmit(async () => {
  const payload = { ...values };
  const res = await authStore.signin(payload);
  if (res.data) {
    useSetToken(res.data.accessToken);
    navigateTo("/")
  }
  if(res.error){
    toast.error(res.error.data.message)
  }
});
</script>
<template>
  <div
    v-if="!isChangePassword"
    class="tw-absolute tw-right-0 tw-top-[50%] tw-translate-y-[-50%] tw-w-[40%]"
    @keyup.enter="handleSignin"
  >
    <div class="tw-flex tw-flex-col tw-gap-y-[12px] tw-w-[400px]">
      <div class="tw-w-full">
        <g-input
          label="Tên tài khoản"
          v-bind="formData.email"
          :error="errors.email"
        >
          <template #prepend>
            <IconUser />
          </template>
        </g-input>
      </div>
      <div class="tw-w-full">
        <g-input
          label="Mật khẩu"
          v-bind="formData.password"
          :type="isShowPassword ? 'text' : 'password'"
          :error="errors.password"
        >
          <template #prepend> <IconLock /></template>
          <template #append>
            <div
              class="tw-cursor-pointer active:tw-opacity-70"
              @click="isShowPassword = !isShowPassword"
            >
              <IconEye v-if="isShowPassword" />
              <IconEyeSlash v-if="!isShowPassword" />
            </div>
          </template>
        </g-input>
      </div>
      <div>
        <span
          @click="$emit('signup')"
          class="tw-text-[#1a3b70] hover:tw-underline"
          >Chưa có tài khoản?</span
        >
      </div>
      <div class="tw-w-full tw-flex tw-mt-[10px]">
        <button
          class="tw-w-full tw-py-4 tw-bg-black tw-text-white tw-rounded-[10px]"
          @click="handleSignin"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  </div>
</template>
