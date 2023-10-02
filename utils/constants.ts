import imageDefault from "~/assets/images/default-thumbnail.jpg";
import avatarDefault from "@/public/images/avatar-default.png";

export const PREFIX_CLASS = "s-";

export const ACCESS_TOKEN = "lms_access_token";

export const CLASS_ID_COOKIE = "lms_class_id";

export const UPLOAD_KEY =
  "MGMJU97D7WVRANW44JLM9M9PSH2MUWS1JBBW1D9PDJ37J2GMGZYI1CWT7GWWWSE";

type keyType = {
  [key: string]: String;
};

export const MINISTRY_TYPE: keyType = {
  CLASS_MONITOR: "Lớp trưởng",
  FORM_TEACHER: "Giáo viên chủ nhiệm ",
};

export const GENDER_TYPE: keyType = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "Khác",
};

export const ROLE_TYPE: keyType = {
  STUDENT: "Học sinh",
  TEACHER: "Giáo viên phụ trách",
};

export const CLASS_ATTENDANCES_TYPE = {
  ON_TIME: "ON_TIME",
  ABSENT: "ABSENT",
  ABSENT_WITH_PETITION: "ABSENT_WITH_PETITION",
};

export const PICKUP_USER_RELATIONSHIP: keyType = {
  FATHER: "Bố",
  MOTHER: "Mẹ",
  GRANDMOTHER: "Bà",
  GRANDFATHER: "Ông",
  BROTHER: "Anh trai",
  SISTER: "Chị gái",
  OTHER: "Khác",
};

export const IMAGE_DEFAULT = imageDefault;
export const AVATAR_DEFAULT = avatarDefault;

export const TYPE_SCHOOL = [
  {
    label: "Công lập",
    value: "PUBLIC_SCHOOL",
  },
  {
    label: "Tư thục",
    value: "PRIVATE_SCHOOL",
  },
  {
    label: "Bán công",
    value: "SEMI_PUBLIC_SCHOOL",
  },
];
export const enum COLOR_CARD {
  "#696969" = "#696969",
  "#70A66F" = "#70A66F",
  "#C3AD74" = "#C3AD74",
  "#6A1A9B" = "#6A1A9B",
  "#612302" = "#612302",
  "#36454F" = "#36454F",
  "#953E3E" = "#953E3E",
  "#838AC8" = "#838AC8",
  "#6FA69C" = "#6FA69C",
  "#6F71A6" = "#6F71A6",
  "#A66F97" = "#A66F97",
  "#A06868" = "#A06868",
  "#02614A" = "#02614A",
  "#5F6102" = "#5F6102",
  "#708D41" = "#708D41",
  "#3E6197" = "#3E6197",
}

export enum USER_ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  SCHOOL_ADMIN = "SCHOOL_ADMIN",
  MANAGER = "MANAGER",
  TEACHER = "TEACHER",
  PARENTS = "PARENTS",
  STUDENT = "STUDENT",
}

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
