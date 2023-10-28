export const AUTH = {
  SIGNIN: "/owners/login",
  SIGNUP: "/owners/register",
  CONFIRM_MAIL: "/owners/finalregister",
  RESET_PASSWORD: "/owners/resetpassword",
};

export const MOTELS = {
  GET_LIST_MOTELS: "/motels/",
  CREATE_MOTEL: "/motels",
  UPDATE_MOTEL: "/motels/update/",
  DELETE_MOTEL: "/motels/",
};

export const ROOM = {
  GET_LIST_ROOM: "/rooms/getall",
  GET_ONE_ROOM: "/rooms/getone",
  GET_ALL_ROOM_OF_OWNER: "/rooms/getall",
  ROOM_STATISTICAL: "/rooms/statistical",
  CREATE_ROOM: "/rooms",
  UPDATE_ROOM: "/rooms/update",
  MOVE_MEMBER_ROOM: "/rooms/movememberroom",
  DELETE_ROOM: "/rooms/delete",
};

export const MEMBERS = {
  GET_ROOM_OWNERS: "/members",
  UPDATE_MEMBER: "/members/member",
};

export const SERVICES = {
  GET_SERVICES: "/services/",
  CREATE_SERVICES: "/services",
  UPDATE_SERVICES: "/services/update/",
  DELETE_SERVICES: "/services/",
};
