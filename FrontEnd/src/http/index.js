import axios from "axios";

const $host = axios.create({
    baseURL: "http://localhost:8081"
});

const $authHost = axios.create({
    baseURL: "http://localhost:8081"
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
