import { interceptorLoadingElements } from "@/utils/formatters";
import axios from "axios";
import { toast } from "react-toastify";

// init an custom axios instance to use in project
let authorizeAxiosInstance = axios.create({
  baseURL: "http://localhost:8017",
});

// time-out of 1 request: 10 mins
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// allow axios auto send cookie with each request send to server (use for jwt)
// authorizeAxiosInstance.defaults.withCredentials = true;

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
