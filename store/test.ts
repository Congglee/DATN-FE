import { AUTH } from "./../utils/endpoint";
import { defineStore } from "pinia";

interface ILogin {
  username: string;
  password: string;
}

export const useTestStore = defineStore({
  id: "auth",
  state: () => ({}),
  actions: {
    async getUsers(payload: ILogin) {
      const res = await useFetchUser(`users`, {
        method: "GET",
      });
      return res;
    },
  },
});
