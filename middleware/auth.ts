//bao gio co api dang nhap thi doi ten file thanh auth.global.ts

import { useGetToken } from "~/composables/storage";
export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useGetToken();
  if (process.server) return;
  if (to.name === "quen-mat-khau") return;
  if (to.name === "dang-ky") return;
  if (!accessToken && to.name !== "dang-nhap") {
    return navigateTo("/dang-nhap");
  }
});

