<script setup>
import IconDelete from "@/assets/svg/delete.svg";
import { useToast } from "vue-toastification";
import { useNotificationStore } from "~/store/notification";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

const route = useRoute();
const toast = useToast();

const getListNotiEventBus = useEventBus(
  `get-list-noti-${route.params.guestId}`
);

const notificationStore = useNotificationStore();

const isShowConfirmDeleteNoti = ref(false);

const handleRemoveNoti = async () => {
  const res = await notificationStore.deleteNotification(props.item._id);
  if (res.data) {
    toast.success("Xóa thông báo thành công!");
    isShowConfirmDeleteNoti.value = false;
    getListNotiEventBus.emit();
  }
};
</script>
<template>
  <article
    class="tw-rounded-xl tw-border-2 tw-border-gray-100 tw-bg-white tw-mb-5 tw-w-[50%]"
  >
    <div class="tw-w-full tw-justify-end tw-flex tw-p-4">
      <IconDelete
        class="tw-cursor-pointer"
        @click="isShowConfirmDeleteNoti = true"
      />
    </div>
    <div class="tw-flex tw-items-start tw-gap-4 tw-p-4 sm:tw-p-6 lg:tw-pr-8">
      <a href="#" class="block shrink-0">
        <img
          alt="Speaker"
          src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
          class="tw-h-14 tw-w-14 tw-rounded-lg tw-object-cover"
        />
      </a>

      <div>
        <h3 class="ftw-ont-medium sm:tw-text-lg">
          <a href="#" class="hover:tw-underline">
            {{ item.title }}
          </a>
        </h3>

        <p class="tw-line-clamp-2 tw-text-sm tw-text-gray-700">
          {{ item.content }}
        </p>

        <!-- <div class="tw-mt-2 sm:tw-flex sm:tw-items-center">
          <span class="tw-hidden sm:tw-block" aria-hidden="true">&middot;</span>

          <p class="tw-hidden sm:tw-block sm:tw-text-xs sm:tw-text-gray-500">
            Người gửi
            <a
              href="#"
              class="tw-font-medium tw-underline hover:tw-text-gray-700"
            >
              John
            </a>
          </p>
        </div> -->
      </div>
    </div>

    <div class="tw-flex tw-justify-end" v-if="item.status === 'Chưa xử lý'">
      <strong
        class="tw--mb-[2px] tw--me-[2px] tw-inline-flex tw-items-center tw-gap-1 tw-rounded-ee-xl tw-rounded-ss-xl tw-bg-red-600 px-3 tw-py-1.5 tw-text-white"
      >
        <span class="tw-text-[10px]tw-font-medium sm:tw-text-xs"
          >Chưa xử lý!</span
        >
      </strong>
    </div>
    <div class="tw-flex tw-justify-end" v-if="item.status === 'Đã xử lý'">
      <strong
        class="tw--mb-[2px] tw--me-[2px] tw-inline-flex tw-items-center tw-gap-1 tw-rounded-ee-xl tw-rounded-ss-xl tw-bg-green-600 px-3 tw-py-1.5 tw-text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="tw-h-4 tw-w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>

        <span class="tw-text-[10px]tw-font-medium sm:tw-text-xs"
          >Đã xử lý!</span
        >
      </strong>
    </div>
  </article>
  <g-modal-confirm
    v-model="isShowConfirmDeleteNoti"
    title="Xóa thông báo này?"
    description="Hành động không thể hoàn tác"
    @ok="handleRemoveNoti"
  ></g-modal-confirm>
</template>
