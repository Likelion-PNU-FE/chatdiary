import axios from "axios";
import {redirect} from "react-router-dom";

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

Api.interceptors.request.use(
  config => {
    console.log(`[요청]${config.method} : ${config.url}`);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  response => {
    console.log(`[응답]${response.config.url} : ${response.status} ${response.data} ${response.headers}`);
    const token = response.headers.getAuthorization();
    if (token) {
      localStorage.setItem("token", token);
    }
    return response;
  },
  error => {
    console.log(`[에러]${error.config.url} : ${error.response.status} ${error.response.data}`);
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      redirect("/login");
    }
    return Promise.reject(error);
  }
);
