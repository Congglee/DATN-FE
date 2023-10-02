// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/main.css",
  ],
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts"],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  googleFonts: {
    // Options
  },
  runtimeConfig: {
    public: {
      URL_API: process.env.URL_API,
      USER_API: process.env.USER_API,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  ssr: false,
});
