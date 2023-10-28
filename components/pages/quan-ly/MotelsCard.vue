<script setup>
import IconEditMotel from "@/assets/svg/edit-motel.svg";
import IconManagerMotel from "@/assets/svg/manager-motel.svg";
import IconDeleteMotel from "@/assets/svg/delete-motel.svg";
import IconAddressMotel from "@/assets/svg/address-motel.svg";
import IconHomeMotel from "@/assets/svg/home-motel.svg";
import DeleteMotelForm from "@/components/pages/quan-ly/DeleteMotelFrom.vue";
import UpdateMotelForm from "@/components/pages/quan-ly/UpdateMotelForm.vue";
const props = defineProps({
  items: {
    type: Object,
    default: {},
  },
});
const item = props.items;

const showPassword = ref(false);
const isDisplayDeleteMotel = ref(false);
const isDisplayUpdateMotel = ref(false);

const closePopupAll = () => {
  isDisplayDeleteMotel.value = false;
  isDisplayUpdateMotel.value = false;
};
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
              <IconHomeMotel />
              <h5 class="tw-line-clamp-1">
                {{ item.name }}
              </h5>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <!-- <span class="me-1">{{ item.motelIds.length }} phòng</span> -->
            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <div class="tw-flex tw-items-center tw-gap-3">
            <IconAddressMotel />
            <h5 class="tw-line-clamp-2">
              {{
                `${item.address}, ${item.ward}, ${item.district}, ${item.city} `
              }}
            </h5>
          </div>
        </v-card-text>
      </div>

      <div class="tw-mt-auto tw-flex tw-w-full tw-py-2 tw-gap-1 tw-px-3">
        <NuxtLink :to="'quan-ly/' + item._id">
          <g-button
            class="tw-text-white tw-bg-blue-700 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-ring-blue-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-mr-2 tw-mb-2 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 focus:tw-outline-none dark:focus:tw-ring-blue-800"
          >
            <template #prepend>
              <IconManagerMotel />
            </template>
            Quản lý
          </g-button>
        </NuxtLink>

        <g-button @click="isDisplayUpdateMotel = true" variant="bezeled">
          <template #prepend>
            <IconEditMotel />
          </template>
          Chỉnh sửa
        </g-button>
        <v-dialog width="544" v-model="isDisplayUpdateMotel">
          <UpdateMotelForm
            :item="item"
            :closePopupAll="closePopupAll"
            @close="isDisplayUpdateMotel = false"
          />
        </v-dialog>
        <g-button @click="isDisplayDeleteMotel = true" class="tw-bg-red-500">
          <template #prepend>
            <IconDeleteMotel />
          </template>
          Xoá
        </g-button>
        <v-dialog width="544" v-model="isDisplayDeleteMotel">
          <DeleteMotelForm :item="item" @close="isDisplayDeleteMotel = false" />
        </v-dialog>
      </div>
    </div>
  </v-card>
</template>

<style scoped></style>
