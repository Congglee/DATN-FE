<script setup>
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const props = defineProps({
  items: {
    type: Object,
    default: {},
  },
});

const showPassword = ref(false);
const item = props.items;

const schema = yup.object({
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
});
function onSubmit(values) {
  // Submit values to API...
  console.log(values);
  // alert(JSON.stringify(values, null, 2));
}
</script>
<template>
  <v-card
    class="mx-auto tw-my-4 tw-flex tw-flex-col tw-bg-red-400 rounded-xl"
    max-width="374"
  >
    <v-img
      cover
      style="flex-shrink: 0"
      height="250"
      src="https://cafefcdn.com/thumb_w/640/203337114487263232/2021/3/3/photo1614738126212-16147381266471125055486.jpg"
    ></v-img>
    <div style="flex: 1" class="tw-bg-[#FFFFFF] tw-pb-5">
      <div>
        <v-card-item>
          <v-card-title>
            <div class="tw-flex tw-items-center tw-gap-2">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="house"
                class="svg-inline--fa fa-house w-[20px] text-emerald-500"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                height="18px"
              >
                <path
                  fill="currentColor"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                ></path>
              </svg>
              <h5 class="tw-line-clamp-1">
                {{ item.name }}
              </h5>
            </div>
          </v-card-title>

          <v-card-subtitle>
            <span class="me-1">{{ item.roomIds.length }} phòng</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <div class="tw-flex tw-items-center tw-gap-3">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="location-dot"
              class="svg-inline--fa fa-location-dot w-[10px] pt-1 text-indigo-700"
              role="img"
              height="18px"
              width="18px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"
              ></path>
            </svg>
            <h5 class="tw-line-clamp-2">
              {{
                `${item.address}, ${item.ward}, ${item.district}, ${item.city} `
              }}
            </h5>
          </div>
        </v-card-text>
      </div>

      <div class="tw-mt-auto tw-flex tw-w-full tw-py-2 tw-gap-2 tw-px-3">
        <NuxtLink
          :to="'quan-ly/' + item._id"
          class="tw-relative tw-inline-flex tw-items-center tw-justify-start tw-px-5 tw-py-2 tw-overflow-hidden tw-font-medium tw-transition-all tw-bg-blue-500 tw-rounded-xl tw-group hover:tw-transition-all hover:tw-duration-500 hover:tw-ease-in-out hover:tw-bg-blue-700"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            class="tw-mr-2"
            height="14px"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            ></path>
          </svg>
          <h5
            class="tw-relative tw-w-full tw-text-left tw-text-white tw-transition-colors tw-duration-200 tw-ease-in-out tw-group-hover:text-white"
          >
            Quản lý
          </h5>
        </NuxtLink>

        <v-dialog width="500" class="tw-italic">
          <template v-slot:activator="{ props }">
            <button
              v-bind="props"
              class="tw-relative tw-inline-flex tw-items-center tw-justify-start tw-px-2 tw-py-2 tw-overflow-hidden tw-font-medium tw-transition-all tw-bg-green-500 tw-rounded-xl tw-group"
            >
              <h5
                class="tw-absolute tw-top-0 tw-right-0 tw-inline-block tw-w-4 tw-h-4 tw-transition-all tw-duration-500 tw-ease-in-out tw-bg-green-700 tw-rounded group-hover:tw-mr-4 group-hover:tw-mt-4"
              >
                <h5
                  class="tw-absolute tw-top-0 tw-right-0 tw-w-5 tw-h-5 tw-rotate-45 tw-translate-x-1/2 tw--translate-y-1/2 tw-bg-white"
                ></h5>
              </h5>
              <h5
                class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-full tw-transition-all tw-duration-500 tw-ease-in-out tw-delay-200 -tw-translate-x-full tw-translate-y-full tw-bg-green-600 tw-rounded-2xl group-hover:tw-mb-9 group-hover:tw-translate-x-0"
              ></h5>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="pen-to-square"
                class="tw-mr-2"
                role="img"
                height="14px"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#ffffff"
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                ></path>
              </svg>
              <h5
                class="tw-relative tw-w-full tw-text-left tw-text-white tw-transition-colors tw-duration-200 tw-ease-in-out tw-group-hover:text-white"
              >
                Chỉnh sửa
              </h5>
            </button>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card class="tw-not-italic py-4" :title="'Cập nhật thông tin'">
              <v-card-text class="tw-not-italic">
                <VeeForm
                  v-slot="{ handleSubmit }"
                  :validation-schema="schema"
                  as="div"
                >
                  <form @submit="handleSubmit($event, onSubmit)">
                    <Field
                      name="name"
                      class="tw-w-full tw-border-gray-300"
                      v-slot="{ field }"
                    >
                      <label for="">Tên cơ sở nhà trọ</label>
                      <input
                        v-bind="field"
                        type="text"
                        placeholder="Tên cơ sở nhà trọ"
                        style="border: 1px solid rgb(211, 211, 211)"
                        class="tw-my-2 tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-py-3 tw-px-3 focus:tw-outline-none focus:tw-border-blue-700"
                      />
                    </Field>
                    <ErrorMessage class="tw-text-red-600" name="name" />
                    <br />
                    <Field
                      name="address"
                      class="tw-w-full tw-border-gray-300 tw-my-2"
                      v-slot="{ field }"
                    >
                      <label for="">Địa chỉ</label>
                      <input
                        v-bind="field"
                        type="text"
                        placeholder="Chi tiết địa chỉ"
                        style="border: 1px solid rgb(211, 211, 211)"
                        class="tw-my-2 tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-py-3 tw-px-3 focus:tw-outline-none focus:tw-border-blue-700"
                      />
                    </Field>
                    <ErrorMessage class="tw-text-red-600" name="address" />
                    <div
                      class="tw-grid tw-grid-cols-3 max-lg:tw-grid-cols-1 tw-gap-x-4"
                    >
                      <div>
                        <Field
                          name="city"
                          class="tw-border-gray-300 tw-my-2"
                          v-slot="{ field }"
                        >
                          <label for="" class="tw-line-clamp-1"
                            >Tỉnh / Thành phố</label
                          ><input
                            v-bind="field"
                            type="text"
                            placeholder="Tỉnh / Thành phố ..."
                            style="border: 1px solid rgb(211, 211, 211)"
                            class="tw-my-2 tw-w-full tw-border tw-border-[#c0c0c0] tw-rounded-md tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-border-blue-700"
                        /></Field>
                        <ErrorMessage
                          class="tw-text-red-600 max-lg:tw-line-clamp-1"
                          name="city"
                        />
                      </div>
                      <div>
                        <Field
                          name="ward"
                          class="tw-border-gray-300 tw-my-2"
                          v-slot="{ field }"
                        >
                          <label for="" class="tw-line-clamp-1"
                            >Quận / Huyện</label
                          ><input
                            v-bind="field"
                            type="text"
                            placeholder="Quận / Huyện ..."
                            style="border: 1px solid rgb(211, 211, 211)"
                            class="tw-my-2 tw-w-full tw-border tw-border-[#c0c0c0] tw-rounded-md tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-border-blue-700"
                        /></Field>
                        <ErrorMessage
                          class="tw-text-red-600 max-lg:tw-line-clamp-1"
                          name="ward"
                        />
                      </div>
                      <div>
                        <Field
                          name="district"
                          class="tw-border-gray-300 tw-my-2"
                          v-slot="{ field }"
                        >
                          <label for="" class="tw-line-clamp-1"
                            >Phường / Xã</label
                          ><input
                            v-bind="field"
                            type="text"
                            placeholder="Phường / Xã ..."
                            style="border: 1px solid rgb(211, 211, 211)"
                            class="tw-my-2 tw-w-full tw-border tw-border-[#c0c0c0] tw-rounded-md tw-py-2 tw-px-3 focus:tw-outline-none focus:tw-border-blue-700"
                          />
                        </Field>
                        <ErrorMessage
                          class="tw-text-red-600 max-lg:tw-line-clamp-1"
                          name="district"
                        />
                      </div>
                    </div>

                    <v-card-actions
                      class="tw-italic max-lg:tw-flex max-lg:tw-flex-col max-lg:tw-justify-center max-lg:tw-items-center max-lg:tw-gap-2"
                    >
                      <v-spacer></v-spacer>
                      <button
                        type="submit"
                        class="lg:tw-mr-3 tw-relative tw-inline-flex tw-items-center tw-justify-start tw-px-5 tw-py-2 tw-overflow-hidden tw-font-medium tw-transition-all tw-bg-blue-500 tw-rounded-xl tw-group hover:tw-transition-all hover:tw-duration-500 hover:tw-ease-in-out hover:tw-bg-blue-700"
                      >
                        <h5
                          class="tw-not-italic tw-relative tw-w-full tw-text-left tw-text-white tw-transition-colors tw-duration-200 tw-ease-in-out tw-group-hover:text-white"
                        >
                          Cập nhật
                        </h5>
                      </button>
                      <button
                        type="reset"
                        class="lg:tw-mr-3 tw-relative tw-inline-flex tw-items-center tw-justify-start tw-px-5 tw-py-2 tw-overflow-hidden tw-font-medium tw-transition-all tw-bg-[#7808d0] tw-rounded-xl tw-group hover:tw-transition-all hover:tw-duration-500 hover:tw-ease-in-out hover:tw-bg-[#8c5faf]"
                      >
                        <h5
                          class="tw-not-italic tw-relative tw-w-full tw-text-left tw-text-white tw-transition-colors tw-duration-200 tw-ease-in-out tw-group-hover:text-white"
                        >
                          Reset
                        </h5>
                      </button>
                      <button
                        @click="isActive.value = false"
                        class="tw-relative tw-inline-flex tw-items-center tw-justify-start tw-px-5 tw-py-2 tw-overflow-hidden tw-font-medium tw-transition-all tw-bg-red-500 tw-rounded-xl tw-group hover:tw-transition-all hover:tw-duration-500 hover:tw-ease-in-out hover:tw-bg-red-700"
                      >
                        <h5
                          class="tw-not-italic tw-relative tw-w-full tw-text-left tw-text-white tw-transition-colors tw-duration-200 tw-ease-in-out tw-group-hover:text-white"
                        >
                          Đóng
                        </h5>
                      </button>
                    </v-card-actions>
                  </form>
                </VeeForm>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>

        <v-dialog width="500" class="tw-italic">
          <template v-slot:activator="{ props }">
            <button
              v-bind="props"
              class="tw-relative tw-inline-flex tw-items-center tw-justify-start tw-px-5 tw-py-2 tw-overflow-hidden tw-font-medium tw-transition-all tw-bg-red-500 tw-rounded-xl tw-group hover:tw-transition-all hover:tw-duration-500 hover:tw-ease-in-out hover:tw-bg-red-700"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="trash"
                height="14px"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="#ffffff"
                stroke="#ffffff"
                stroke-width="0px"
                class="tw-mr-2"
              >
                <path
                  fill="#ffffff"
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                ></path>
              </svg>
              <h5
                class="tw-relative tw-w-full tw-text-left tw-text-white tw-transition-colors tw-duration-200 tw-ease-in-out tw-group-hover:text-white"
              >
                Xoá
              </h5>
            </button>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card
              class="tw-not-italic py-4"
              :title="'Xác nhận muốn xoá ' + item.name"
            >
              <v-card-text class="tw-not-italic">
                Sau khi thực hiện hành động xoá thì mọi thông tin về cơ sở nhà
                trọ này sẽ bị mất và KHÔNG THỂ KHÔI PHỤC
                <v-text-field
                  v-bind="$attrs"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                  class="tw-my-3"
                  label="Nhập mật khẩu"
                  hide-details
                />
              </v-card-text>

              <v-card-actions class="tw-italic">
                <v-spacer></v-spacer>
                <button
                  @click="isActive.value = false"
                  class="tw-mr-3 tw-relative tw-inline-flex tw-items-center tw-justify-start tw-px-5 tw-py-2 tw-overflow-hidden tw-font-medium tw-transition-all tw-bg-red-500 tw-rounded-xl tw-group hover:tw-transition-all hover:tw-duration-500 hover:tw-ease-in-out hover:tw-bg-red-700"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="trash"
                    height="14px"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="#ffffff"
                    stroke="#ffffff"
                    stroke-width="0px"
                    class="tw-mr-2"
                  >
                    <path
                      fill="#ffffff"
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                    ></path>
                  </svg>
                  <h5
                    class="tw-not-italic tw-relative tw-w-full tw-text-left tw-text-white tw-transition-colors tw-duration-200 tw-ease-in-out tw-group-hover:text-white"
                  >
                    Xoá
                  </h5>
                </button>
                <button
                  @click="isActive.value = false"
                  class="tw-relative tw-inline-flex tw-items-center tw-justify-start tw-px-5 tw-py-2 tw-overflow-hidden tw-font-medium tw-transition-all tw-bg-blue-500 tw-rounded-xl tw-group hover:tw-transition-all hover:tw-duration-500 hover:tw-ease-in-out hover:tw-bg-blue-700"
                >
                  <h5
                    class="tw-not-italic tw-relative tw-w-full tw-text-left tw-text-white tw-transition-colors tw-duration-200 tw-ease-in-out tw-group-hover:text-white"
                  >
                    Huỷ
                  </h5>
                </button>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </div>
  </v-card>
</template>

<style scoped></style>
