export const AUTH = {
  SIGNIN: "/owners/login",
  SIGNUP: "/owners/register",
  CONFIRM_MAIL: "/owners/final-register",
  RESET_PASSWORD: "/owners/reset-password",
  SEND_MAIL_RESET_PASSWORD: "/owners/send-mail-reset-password",
};
export const ADMINISTRATIVE = {
  GET_ALL_PROVINCES: "/provinces/getAll",
  GET_ALL_DISTRICT: "/districts/getAll",
  GET_DISTRICTS_BY_PROVINCE: "/districts/getByProvince",
  GET_WARDS_BY_DISTRICT: "/wards/getByDistrict",
};

export const MOTELS = {
  GET_LIST_MOTELS: "/motels/get-all-motel",
  CREATE_MOTEL: "/motels/create-new-motel",
  UPDATE_MOTEL: "/motels/update-motel",
  DELETE_MOTEL: "/motels/delete-motel",
};

export const ROOM = {
  GET_LIST_ROOM: "/rooms/get-all-room-in-motel",
  GET_ONE_ROOM: "/rooms/get-one-room",
  GET_ALL_ROOM_OF_OWNER: "/rooms/get-all-room",
  ROOM_STATISTICAL: "/rooms/statistical",
  CREATE_ROOM: "/rooms/create-new-room",
  UPDATE_ROOM: "/rooms/update-room-info",
  MOVE_MEMBER_ROOM: "/rooms/move-member-room-in-room",
  DELETE_ROOM: "/rooms/delete-room",
};

export const MEMBERS = {
  GET_ROOM_OWNERS: "/members/get-all-host-member",
  GET_ALL_MEMBER_IN_ROOM: "/members/get-all-member-in-room",
  GET_ONE_MEMBER_IN_ROOM: "/members/get-one-member",
  DELETE_ONE_MEMBER_IN_ROOM: "/members/get-one-member",
  CREATE_ROOM_OWNER: "/members/create-new-host-member",
  CREATE_ROOM_MEMBER: "/members/create-new-room-normal-member",
  UPDATE_ROOM_OWNER: "/members/update-host-member-info",
  UPDATE_MEMBER: "/members/update-room-normal-member",
};

export const SERVICES = {
  GET_SERVICES: "/services/get-all-service",
  GET_ONE_SERVICE: "/services/get-one-service",
  CREATE_SERVICES: "/services/create-new-service",
  UPDATE_SERVICES: "/services/update-service/",
  DELETE_SERVICES: "/services/delete-service",
};
