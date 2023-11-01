import dayjs from "dayjs";
import avatarDefault from "@/assets/images/defaultAvt.png";
import { useToast } from "vue-toastification";

export const convertDateType = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

export const getDifferenceObject = (oldObj: any, newObj: any) => {
  const keys = Object.keys(oldObj);
  const different: any = {};
  keys.forEach((el: string) => {
    if (oldObj[el] !== newObj[el]) different[el] = newObj[el];
  });
  const filteredObj = Object.entries(different).reduce(
    (acc: any, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
  return filteredObj;
};

const convertError = (type: number) => {
  switch (type) {
    case 401:
      return "Vui lòng đăng nhập lại.";
    case 403:
      return "Không có quyền truy cập.";
    default:
      return "Lỗi hệ thống.";
  }
};

export const convertStatusServiceType = (type: boolean) => {
  switch (type) {
    case true:
      return "Hoạt động";
    case false:
      return "Không hoạt động";
    default:
      return type;
  }
};
export const convertDepositRoomType = (type: boolean) => {
  switch (type) {
    case true:
      return "Đã hoàn thành";
    case false:
      return "Chưa hoàn thành";
    default:
      return type;
  }
};

export const formatCurrency = (amount: number) => {
  const strAmount = amount.toString();
  const result = strAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return result + " VND";
};

export const formatMonthYear = (dateString: string) => {
  const dateObject = new Date(dateString);
  const formattedDate = `${(dateObject.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateObject.getFullYear()}`;
  return formattedDate;
};

export const removeEmptyFields = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string" && obj[key].trim() === "") {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeEmptyFields(obj[key]);
    }
  });

  return obj;
};
