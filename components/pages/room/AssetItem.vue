<script setup>
import { useServiceStore } from "@/store/services";
import { useToast } from "vue-toastification";
import { useAssetStore } from "~/store/assets";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
  roomInfo: {
    type: Object,
    default: {},
  },
});

const route = useRoute();
const toast = useToast();

const assetStore = useAssetStore();

const activeAsset = ref(false);

watch(
  () => activeAsset.value,
  async (newVal) => {
    if (newVal) {
      await assetStore
        .addAssetToRoom(route.params.roomId, props.item._id)
        .then(() =>
          toast.success(`Thêm ${props.item.name} vào phòng thành công!`)
        );
    } else {
      await assetStore
        .deleteAssetFromRoom(route.params.roomId, props.item._id)
        .then(() => toast.success(`Xóa ${props.item.name} thành công!`));
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
    </td>
    <td>{{ item.note }}</td>
    <td>
      <g-switch v-model="activeAsset" @click="handleActiveStatus"></g-switch>
    </td>
  </tr>
</template>
