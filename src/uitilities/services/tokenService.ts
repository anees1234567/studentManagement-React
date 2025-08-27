

import { getItem, setItem, storageKey } from "../storage/storage";
import { Instance } from "../../../constants";


const API_URL = import.meta.env.VITE_API_URL as string;




Instance.interceptors.request.use(

  (config) => {
    const token = getItem(storageKey.TOKEN);
    if (token) {
   
      config.headers = config.headers || {};
      if (config.headers.set) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    console.log("Final Request Config:", config);
    return config;
  },
  (error) => Promise.reject(error)
);


Instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if Unauthorized and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getItem(storageKey.REFRESH_TOKEN);
        if (!refreshToken) throw new Error("No refresh token");
        const refreshResponse = await Instance.post(`/user/refresh`, {
          refreshtoken:refreshToken,
        });

        const { accessToken } = refreshResponse.data;
        setItem(storageKey.TOKEN, { accessToken });
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return Instance(originalRequest);
      } catch (refreshError) {
        // refresh failed → logout user
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


