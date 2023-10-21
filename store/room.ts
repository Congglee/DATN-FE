import { defineStore } from "pinia";

export const useRoomStore = defineStore({
  id: "room",
  state: () => ({}),
  actions: {
    async getMotels() {
      const res = await useFetchData(`${MOTELS.GET}`, {
        method: "GET",
      });
      return res
    },
  },
});
