import axios from "axios";

export const Api = axios.create({
    baseURL: "http://3.37.103.251:8089/api",
    headers: {
        "Content-type": "application/json"
    }
});

Api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);