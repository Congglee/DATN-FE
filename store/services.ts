import { defineStore } from "pinia";
import { SERVICES } from "~/utils/endpoint";

export const useServiceStore = defineStore({
  id: "service",
  state: () => ({}),
  actions: {
    async getAllServices() {
      const res = await useFetchData(`${SERVICES.GET_SERVICES}`, {
        method: "GET",
      });
      return res;
    },
    async getOneService(id: string) {
      const res = await useFetchData(`${SERVICES.GET_SERVICES}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async createService(payload: any) {
      const res = await useFetchData(`${SERVICES.CREATE_SERVICES}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async updateService(payload: any) {
      const res = await useFetchData(
        `${SERVICES.UPDATE_SERVICES}${payload["_id"]}`,
        {
          method: "PUT",
          body: payload["data"],
        }
      );
      return res;
    },
    async deleteService(id: number | string) {
      const res = await useFetchData(`${SERVICES.DELETE_SERVICES}${id}`, {
        method: "DELETE",
      });
      return res;
    },
  },
});
