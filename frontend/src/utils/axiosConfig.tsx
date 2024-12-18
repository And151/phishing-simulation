import axios from 'axios';
import {getToken, removeToken} from './jwt-utils'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            removeToken();

            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
