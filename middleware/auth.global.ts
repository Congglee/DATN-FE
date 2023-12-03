//bao gio co api dang nhap thi doi ten file thanh auth.global.ts

import { useGetToken } from "~/composables/storage";
export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useGetToken();
  const guestAccessToken = useGetGuestToken();
  if (process.server) return;
  if (to.name === "quen-mat-khau") return;
  if (to.name === "dang-ky") return;
  if (to.name === "dang-nhap") return;
  if (!accessToken && !guestAccessToken && to.name !== "dang-nhap-guest") {
    return navigateTo("/dang-nhap-guest");
  }
});
