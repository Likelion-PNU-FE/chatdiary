import axios from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:3000",
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