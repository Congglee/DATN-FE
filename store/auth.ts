import { AUTH } from "./../utils/endpoint";
import { defineStore } from "pinia";

interface ILogin {
  username: string;
  password: string;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({}),
  actions: {
    async login(payload: ILogin) {
      const res = await useFetchData(`${AUTH.LOGIN}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
  },
});
