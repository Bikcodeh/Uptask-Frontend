import axios from "axios";

export const uptaskApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

uptaskApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})