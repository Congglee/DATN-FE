import Cookie from "js-cookie";
import { ACCESS_TOKEN, CLASS_ID_COOKIE } from "~/utils/constants";

export const useSetToken = (token: any) => {
  if (!token) return;
  Cookie.set(ACCESS_TOKEN, token, { expires: 30 });
};

export const useGetToken = () => {
  if (process.server) return;
  const accessToken = Cookie.get(ACCESS_TOKEN);
  return accessToken ? accessToken : null;
};

export const useRemoveToken = () => {
  Cookie.remove(ACCESS_TOKEN);
};

export const useSetClassCookie = (e: any) => {
  Cookie.set(CLASS_ID_COOKIE, e, { expires: 30 });
};
export const useGetClassCookie = () => {
  if (process.server) return;
  const classId = Cookie.get(CLASS_ID_COOKIE);
  return classId;
};

export const useRemoveClassId = () => {
  Cookie.remove(CLASS_ID_COOKIE);
};
