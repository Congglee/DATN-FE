import imageDefault from "~/assets/images/default-thumbnail.jpg";
import avatarDefault from "@/public/images/avatar-default.png";

export const PREFIX_CLASS = "s-";

export const ACCESS_TOKEN = "accessToken";

export const CLASS_ID_COOKIE = "lms_class_id";

export const ROOM_STATUS = [
  { title: "Đã đặt cọc", status: "Đã đặt cọc" },
  { title: "Đang sửa", status: "Đang sửa" },
  { title: "Trống", status: "Trống" },
  { title: "Đã có người ở", status: "Đã có người ở" },
];

export const UPLOAD_KEY =
  "MGMJU97D7WVRANW44JLM9M9PSH2MUWS1JBBW1D9PDJ37J2GMGZYI1CWT7GWWWSE";

type keyType = {
  [key: string]: String;
};

export const GENDER_TYPE: keyType = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "Khác",
};



export const IMAGE_DEFAULT = imageDefault;
export const AVATAR_DEFAULT = avatarDefault;


export const LIST_GRADE_TYPE = [
  {
    label: "Đạt/Không đạt",
    value: "PASS/FAIL",
  },
  {
    label: "Điểm số",
    value: "GRADE",
  },
];

export const DAYS_OF_WEEK = [
  {
    value: "monday",
    label: "MONDAY",
  },
  {
    value: "tuesday",
    label: "TUESDAY",
  },
  {
    value: "wednesday",
    label: "WEDNESDAY",
  },
  {
    value: "thursday",
    label: "THURSDAY",
  },
  {
    value: "friday",
    label: "FRIDAY",
  },
  {
    value: "saturday",
    label: "SATURDAY",
  },
  {
    value: "sunday",
    label: "SUNDAY",
  },
];

export const enum WORK_TIME_DAY {
  "MONDAY" = "Thứ hai",
  "TUESDAY" = "Thứ ba",
  "WEDNESDAY" = "Thứ tư",
  "THURSDAY" = "Thứ năm",
  "FRIDAY" = "Thứ sáu",
  "SATURDAY" = "Thứ bảy",
  "SUNDAY" = "Chủ nhật",
}
