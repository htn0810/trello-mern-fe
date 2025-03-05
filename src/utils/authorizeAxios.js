import { interceptorLoadingElements } from "@/utils/formatters";
import axios from "axios";
import { toast } from "react-toastify";

// init an custom axios instance to use in project
let authorizeAxiosInstance = axios.create({
  baseURL: "http://localhost:8017",
  withCredentials: true,
  timeout: 1000 * 60 * 10,
});

authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    interceptorLoadingElements(false);
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    if (error.response?.status !== 410) {
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default authorizeAxiosInstance;
