import { defineStore } from "pinia";

export const useRoomStore = defineStore({
  id: "room",
  state: () => ({}),
  actions: {
    async getMotels() {
      const res = await useFetchData(`${MOTELS.GET_LIST_MOTELS}`, {
        method: "GET",
      });
      return res;
    },
    async createMotel(payload: any) {
      const res = await useFetchData(`${MOTELS.CREATE_MOTEL}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
  },
});
