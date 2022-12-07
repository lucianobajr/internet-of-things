import {
  AxiosDefaults,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { api } from "./api";

//import AsyncStorage from "@react-native-async-storage/async-storage";

interface IFailedRequestQueue {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedRequestQueue: IFailedRequestQueue[] = [];

export function setAuthorizationHeader(
  request: AxiosDefaults | AxiosRequestConfig | any,
  token: string
) {
  request.headers.Authorization = `Bearer ${token}`;
}

function handleRefreshToken(refreshToken: string) {
  isRefreshing = true;

  api
    .post("/admins/refresh-token", { refreshToken })
    .then((response) => {
      const { token, refreshToken } = response.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("@MyReplenisher:token", token);
      if (refreshToken) {
        localStorage.setItem(
          "@MyReplenisher:refreshToken",
          JSON.stringify(refreshToken)
        );
      }

      failedRequestQueue.forEach((request) => request.onSuccess(token));
      failedRequestQueue = [];
    })
    .catch((error) => {
      failedRequestQueue.forEach((request) => request.onFailure(error));
      failedRequestQueue = [];
    })
    .finally(() => {
      isRefreshing = false;
    });
}

function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const token = localStorage.getItem("@MyReplenisher:token");
  token && setAuthorizationHeader(config, token);
  return config;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

function onResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

function onResponseError(
  error: AxiosError
): Promise<AxiosError | AxiosResponse> {
  if (error?.response?.status === 401) {
    const originalConfig = error.config;
    const refreshToken = JSON.parse(
      localStorage.getItem("@MyReplenisher:refreshToken")!
    );

    !isRefreshing && handleRefreshToken(refreshToken.id);

    return new Promise((resolve, reject) => {
      failedRequestQueue.push({
        onSuccess: (token: string) => {
          setAuthorizationHeader(originalConfig, token);
          resolve(api(originalConfig));
        },
        onFailure: (error: AxiosError) => {
          reject(error);
        },
      });
    });
  }

  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
