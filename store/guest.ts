import { defineStore } from "pinia";

export const useGuestStore = defineStore({
  id: "guest",
  state: () => ({}),
  actions: {
    async guestSignin(payload: any) {
      const res = await useFetchData(`${GUEST.SIGN_IN}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
  },
});
