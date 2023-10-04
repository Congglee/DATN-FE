import { defineStore } from "pinia";

export const useTestStore = defineStore({
  id: "test",
  state: () => ({
    users: [],
  }),
  actions: {
    async getUsers(payload: any) {
      const res = await useFetchUser(
        `https://jsonplaceholder.typicode.com/users`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async addUser(payload: any) {
      const res = await useFetchUser(
        `https://jsonplaceholder.typicode.com/users`,
        {
          method: "POST",
          body: payload,
        }
      );
      return res;
    },
  },
});
