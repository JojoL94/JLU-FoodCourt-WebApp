import { useAuth } from "../hooks";
import axios from "axios";

const AxiosJWT = () => {
    const axiosJWT = axios.create();
    const { token, setToken } = useAuth()

    axiosJWT.interceptors.request.use(
        async (config) => {
            config.headers.Authorization = `Bearer ${token}`
            return config;
        }, (error) => {
            return Promise.reject(error);
        });


    axiosJWT.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        const originalRequest = error.config
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const response = await axios.get('/api/auth/token');
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ` + response.data.accessToken;
            return axios(originalRequest);
        }
        return Promise.reject(error);
    });
    return axiosJWT;
}

export default AxiosJWT;
