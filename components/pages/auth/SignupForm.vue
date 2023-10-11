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
//store
const authStore = useAuthStore();

//state

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    username: yup
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
  username: defineComponentBinds("username"),
  password: defineComponentBinds("password"),
});

const isCheck = ref(false);
const isShowPassword = ref(false);
const isChangePassword = ref(false);

//method

const handleLogin = handleSubmit(async () => {
  const res = await authStore.login({
    username: values.username,
    password: values.password,
  });
  if (res.data) {
    const accessToken = res.data.access_token;
    const decoded = jwt_decode(accessToken);
    setAccessToken(res.data.access_token);
    if (
      decoded &&
      !decoded?.isChangeDefaultPassword &&
      decoded.roles[0] !== "SUPER_ADMIN"
    ) {
      changePassword.value = true;
      accessToken.value = accessToken;
    } else {
      navigateTo("/");
    }
  }

  if (res.error) {
    throwError(res.error);
  }
});
</script>
<template>
  <div
    v-if="!isChangePassword"
    class="tw-absolute tw-right-0 tw-top-[50%] tw-translate-y-[-50%] tw-w-[40%]"
    @keyup.enter="handleLogin"
  >
    Đăng kí
    <div class="tw-flex tw-flex-col tw-gap-y-[12px] tw-w-[400px]">
      <div class="tw-w-full">
        <g-input label="Tên tài khoản" v-bind="formData.username">
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
        <span class="tw-text-[#1a3b70] hover:tw-underline" @click="$emit('signin')"
          >Đã có tài khoản?</span
        >
      </div>
      <div class="tw-w-full tw-flex tw-mt-[10px]">
        <button
          class="tw-w-full tw-py-4 tw-bg-black tw-text-white tw-rounded-[10px]"
          @click="handleLogin"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  </div>
</template>
