<script setup>
import { useRoomStore } from "@/store/room";
import MotelsCard from "@/components/pages/quan-ly/MotelsCard.vue";
import Header from "~/components/global/header/Header.vue";
import Footer from "~/components/global/footer/Footer.vue";
import "@/assets/css/main.css";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const roomStore = useRoomStore();

const motels = ref(null);

const getAllMotels = async () => {
  const res = await roomStore.getMotels();
  if (res.data) {
    motels.value = res.data.motels;
  }
};
getAllMotels();
const submitForm = async () => {
  console.log("ccc");
};

// Search

//
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

const formValues = {
  name: "init value",
};

function onSubmit(values) {
  // Submit values to API...
  console.log(values);
  // alert(JSON.stringify(values, null, 2));
}
</script>
<template>
  <Header></Header>
  <section
    class="tw-bg-[linear-gradient(193deg,#f5f5f5_0%,#f7dfd0_66%,#dedede_100%)] tw-min-h-[85vh]"
  >
    <aside class="tw-bg-[#f88125] tw-text-white">
      <div
        class="tw-w-full tw-max-w-7xl tw-m-auto tw-flex max-lg:tw-flex-col tw-justify-between tw-items-center"
      >
        <h3
          class="tw-py-3 max-lg:tw-py-2 tw-text-2xl max-lg:tw-text-xl tw-font-medium"
        >
          Danh sách nhà trọ
        </h3>
        <div class="tw-w-96">
          <v-card
            class="mx-auto"
            color="#fff0"
            max-width="400"
            style="box-shadow: none"
          >
            <v-card-text class="max-lg:tw-p-0 tw-flex">
              <v-dialog width="500" class="tw-italic">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    class="tw-h-11 tw-w-11 tw-bg-[#15d798] tw-mr-1 tw-flex tw-justify-center tw-items-center tw-rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 0 512 512"
                      fill="#ffffff"
                    >
                      <path
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                      />
                    </svg>
                  </button>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card
                    class="tw-not-italic py-4"
                    :title="'Thêm nhà trọ mới'"
                  >
                    <v-card-text class="tw-not-italic">
                      <VeeForm
                        v-slot="{ handleSubmit }"
                        :validation-schema="schema"
                        :initial-values="formValues"
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
                          <ErrorMessage
                            class="tw-text-red-600"
                            name="address"
                          />
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
                                Thêm mới
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

              <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Tìm tên nhà...."
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                type="search"
                @click:append-inner="submitForm"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </aside>
    <aside
      v-if="!motels || motels.length == 0"
      class="tw-py-2 tw-px-5 tw-w-full tw-text-center"
    >
      <h2 class="tw-font-semibold tw-py-20 tw-text-gray-600">
        Danh sách trống
      </h2>
    </aside>
    <aside
      v-if="motels && motels.length > 0"
      class="tw-grid tw-grid-flow-cols lg:tw-grid-cols-5 md:tw-grid-cols-3 sm:tw-grid-cols-1 lg:tw-gap-10 tw-gap-1 tw-py-2 tw-px-5"
    >
      <MotelsCard :items="item" v-for="item in motels" />
    </aside>
  </section>
  <Footer></Footer>
</template>

<style lang="css" scoped>
.cta {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 25px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  background: #f88125;
  transition: 1s;
  box-shadow: 6px 6px 0 #ffbc89;
  transform: skewX(-15deg);
}

.cta:focus {
  outline: none;
}

.cta:hover {
  transition: 0.5s;
  box-shadow: 10px 10px 0 #ee6060;
}

.cta span:nth-child(2) {
  transition: 0.5s;
  margin-right: 0px;
}

.cta:hover span:nth-child(2) {
  transition: 0.5s;
  margin-right: 25px;
}
</style>
