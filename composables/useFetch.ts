import { UseFetchOptions } from "nuxt/dist/app";
const config = useRuntimeConfig();

export const useFetchData = async (
  url: string,
  options: UseFetchOptions<object>
) => {
  const { data, pending, error, refresh }: any = await useFetch(url, {
    baseURL: config.public.URL_API,
    ...options,
    onRequest({ request, options }) {
      // Set the request headers
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  });
  return {
    data: data?._rawValue,
    pending,
    error,
  };
};

export const useFetchUser = async (
  url: string,
  options: UseFetchOptions<object>
) => {
  const { data, pending, error, refresh }: any = await useFetch(url, {
    baseURL: config.public.USER_API,
    ...options,
    onRequest({ request, options }) {
      // Set the request headers
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  });
  return {
    data: data?._rawValue,
    pending,
    error,
  };
};
