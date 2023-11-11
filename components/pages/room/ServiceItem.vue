<script setup>
import { useServiceStore } from "@/store/services";
import { useToast } from "vue-toastification";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
  roomServices: {
    type: Array,
    default: [],
  },
});

const route = useRoute();
const toast = useToast();

const serviceStore = useServiceStore();

const activeService = ref(false);

const getService = () => {
  const found = props.roomServices.find(
    (item) => item.name === props.item.name
  );
  if (found) {
    activeService.value = true;
  }
};

getService();

// const handleActiveStatus = async () => {
//   if (!activeService.value) {
//     await serviceStore
//       .addServiceToRoom(route.params.roomId, props.item._id)
//       .then(() =>
//         toast.success(`Kích hoạt dịch vụ ${props.item.name} thành công!`)
//       );
//   } else {
//     await serviceStore
//       .deleteServiceFromRoom(route.params.roomId, props.item._id)
//       .then(() => toast.success(`Xóa dịch vụ ${props.item.name} thành công!`));
//   }
// };

watch(
  () => activeService.value,
  async (newVal) => {
    if (newVal) {
      await serviceStore
        .addServiceToRoom(route.params.roomId, props.item._id)
        .then(() =>
          toast.success(`Kích hoạt dịch vụ ${props.item.name} thành công!`)
        );
    } else {
      await serviceStore
        .deleteServiceFromRoom(route.params.roomId, props.item._id)
        .then(() =>
          toast.success(`Xóa dịch vụ ${props.item.name} thành công!`)
        );
    }
  }
);
</script>
<template>
  <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
    <td class="tw-text-center">{{ index + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>
      {{ formatCurrency(item.price) }}
      <span v-if="item.type === 'ĐIỆN' || item.type === 'NƯỚC'"> /1 số </span>
    </td>
    <td>
      <g-switch v-model="activeService" @click="handleActiveStatus"></g-switch>
    </td>
    <!-- <div
          class="tw-absolute tw-right-3 tw-top-[50%] tw-translate-y-[-50%] tw-hidden group-hover:tw-flex tw-space-x-2"
        >
          <div>
            <g-button class="!tw-ml-0 !tw-p-1" variant="bezeled">
              <IconEdit />
            </g-button>
          </div>
          <div>
            <g-button class="!tw-ml-0 !tw-p-1" variant="bezeled">
              <IconRemove class="!tw-ml-0" />
            </g-button>
          </div>
        </div> -->
  </tr>
</template>
