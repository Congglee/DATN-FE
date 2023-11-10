import { defineStore } from "pinia";
import { UPLOAD_IMAGES } from "~/utils/endpoint";

export const useUploadImagesStore = defineStore({
  id: "uploadImages",
  state: () => ({}),
  actions: {
    async uploadImages(payload: any) {
      const res = await useFetchData(`${UPLOAD_IMAGES.UPLOAD_IMAGES}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
  },
});
