<script setup>
import { useForm } from "vee-validate";
import IconUser from "@/assets/svg/login/user.svg";
import IconLock from "@/assets/svg/login/lock.svg";
import IconEye from "@/assets/svg/login/eye.svg";
import IconEyeSlash from "@/assets/svg/login/eye-slash.svg";
import * as yup from "yup";

//state

const { values, error, defineComponentBinds, handleSubmit, resetForm } =
  useForm({
    validationSchema: yup.object({
      username: yup.string().required().trim(),
      password: yup.string().required().trim(),
    }),
  });

const formData = reactive({
  username: defineComponentBinds("username"),
  password: defineComponentBinds("password"),
});

const isShowPassword = ref(false);

//method

const handleSubmitForm = () => {
  console.log(values)
}

</script>
<template>
  <div class="tw-flex tw-w-screen">
    <div class="tw-w-[55%] tw-h-screen tw-bg-[#f88125] tw-relative">
      <div class="tw-absolute -tw-right-40 tw-top-[50%] tw-translate-y-[-50%]">
        <div class="tw-w-[650px] tw-h-[650px] tw-rounded-full tw-bg-white tw-opacity-40 tw-shadow-2xl">
        </div>
      </div>
      <div class="tw-absolute tw-right-0 tw-top-[50%] tw-translate-y-[-50%] tw-w-[40%]">
        <div class="tw-flex tw-flex-col tw-gap-y-[12px] tw-w-[400px]">
          <div class="tw-w-full">
            <g-input label="Tên tài khoản" v-bind="formData.username">
              <template #prepend>
                <IconUser />
              </template>
            </g-input>
          </div>
          <div class="tw-w-full">
            <g-input label="Mật khẩu" v-bind="formData.password" :type="isShowPassword ? 'text' : 'password'">
              <template #prepend>
                <IconLock />
              </template>
              <template #append>
                <div class="tw-cursor-pointer active:tw-opacity-70" @click="isShowPassword = !isShowPassword">
                  <IconEye v-if="isShowPassword" />
                  <IconEyeSlash v-if="!isShowPassword" />
                </div>
              </template>
            </g-input>
          </div>
          <div>
            <nuxt-link to="/dang-ky"><span class="tw-text-[#1a3b70] hover:tw-underline">Chưa có tài
                khoản?</span></nuxt-link>
          </div>
          <div class="tw-w-full tw-flex tw-mt-[10px]">
            <button class="tw-w-full tw-py-4 tw-bg-black tw-text-white tw-rounded-[10px]" @click="handleSubmitForm">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
      <div class="tw-absolute tw-bottom-10">
        <div class="tw-w-[200px]">
          <img src="@/assets/img/logo.png" alt="" />
        </div>
      </div>
    </div>
    <div class="tw-w-[45%] tw-flex tw-flex-col tw-items-end tw-p-10">
      <span class="tw-text-[64px] tw-font-extrabold tw-leading-[78px] tw-uppercase tw-justify-end">Website
      </span>
      <span class="tw-text-[64px] tw-font-extrabold tw-leading-[78px] tw-uppercase tw-justify-end">quản lý nhà trọ
      </span>
      <span class="tw-text-[64px] tw-font-extrabold tw-leading-[78px] tw-uppercase tw-justify-end tw-text-[#f88125]">Poly
        Home Rent
      </span>
    </div>
  </div>
</template>
