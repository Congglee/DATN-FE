export const AUTH = {
  SIGNIN: "/owners/login",
  SIGNUP: "/owners/register",
  CONFIRM_MAIL: "/owners/final-register",
  RESET_PASSWORD: "/owners/reset-password",
  SEND_MAIL_RESET_PASSWORD: "/owners/send-mail-reset-password",
};
export const USER = {
  GET_ONE_USER: "/owners/get-info-owner",
  UPDATE_USER: "/owners/update-owner",
};
export const ADMINISTRATIVE = {
  GET_ALL_PROVINCES: "/provinces/getAll",
  GET_ALL_DISTRICT: "/districts/getAll",
  GET_DISTRICTS_BY_PROVINCE: "/districts/getByProvince",
  GET_WARDS_BY_DISTRICT: "/wards/getByDistrict",
};

export const MOTELS = {
  GET_LIST_MOTELS: "/motels/get-all-motel",
  GET_ONE_MOTELS: "/motels/get-one-motel",
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
  DELETE_ONE_MEMBER_IN_ROOM: "/members/delete-member",
  CREATE_ROOM_OWNER: "/members/create-new-host-member",
  CREATE_ROOM_MEMBER: "/members/create-new-room-normal-member",
  UPDATE_ROOM_OWNER: "/members/update-host-member-info",
  UPDATE_MEMBER: "/members/update-room-normal-member",
};

export const SERVICES = {
  GET_SERVICES: "/services/get-all-service",
  GET_ONE_SERVICE: "/services/get-one-service",
  CREATE_SERVICES: "/services/create-new-service",
  UPDATE_SERVICES: "/services/update-service",
  DELETE_SERVICES: "/services/delete-service",
  ADD_SERVICE_TO_ROOM: "/add-services-room",
  DELETE_SERVICE_FROM_ROOM: "/delete-services-one-room",
};
export const ELECTRICITY = {
  GET_ELECTRICITY: "/electricity-usages/get-all-electricity-usage",
  UPDATE_ELECTRICITY: "/electricity-usages/calculate-electricity-usage",
};
export const WATER = {
  GET_WATER: "/water-usages/get-all-water-usage",
  UPDATE_WATER: "/water-usages/calculate-water-usage",
};

export const CONTRACT = {
  GET_SAMPLE_CONTRACT: "/contracts/get-one-samplecontract",
  CREATE_SAMPLE_CONTRACT: "/contracts/create-new-samplecontract",
  UPDATE_SAMPLE_CONTRACT: "/contracts/update-samplecontract",
  CREATE_NEW_CONTRACT_BY_ROOM: "/contracts/create-new-contract",
};

export const BILL = {
  CREATE_MONTHLY_BILL: "/bills/create-monthly-bill",
  GET_ALL_BILLS: "/bills/get-all-bill",
  GET_ONE_BILL: "/bills/get-one-bill",
  UPDATE_BILL_PAID_AMOUNT: "/bills/update-bill-paid-amount",
  DELETE_BILL: "/bills/delete-bill",
  SEND_MAIL_MONTHLY_BILL: "/bills/send-mail-monthly-bill",
};
