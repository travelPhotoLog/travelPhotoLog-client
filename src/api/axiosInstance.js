import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  // withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    config.headers.Authorization = `Bearer ${accessToken} ${refreshToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    const { data } = response;

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return response;
  },
  function (error) {
    return error;
  }
);

export default instance;
