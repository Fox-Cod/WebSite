import axios from "axios";

const $host = axios.create({
    baseURL: process.env.VITE_API_BASE_URL
});

const $authHost = axios.create({
    baseURL: process.env.VITE_API_BASE_URL
});

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${getCookie("token")}`;
    config.withCredentials = true;
    return config;
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
