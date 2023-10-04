import { defineStore } from "pinia";

const useRoomStore = defineStore({
  id: "room",
  state: () => ({}),
  actions: {
    async getRoom() {
      const res = await useFetchData(`localhost:3001`, {
        method: "GET",
      });
      return res
    },
  },
});
