import { defineStore } from "pinia";

export const useMemberStore = defineStore({
  id: "member",
  state: () => ({}),
  actions: {
    async getAllMemberInRoom(id: string) {
      const res = await useFetchData(
        `${MEMBERS.GET_ALL_MEMBER_IN_ROOM}/${id}`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async createRoomHost(payload: any) {
      const res = await useFetchData(`${MEMBERS.CREATE_ROOM_OWNER}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async createRoomMember(payload: any) {
      const res = await useFetchData(`${MEMBERS.CREATE_ROOM_MEMBER}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
  },
});
