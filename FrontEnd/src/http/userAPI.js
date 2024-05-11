import { $authHost, $host } from "./index";
import axios from "axios";

export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password }, { withCredentials: true });
    return data;
}


export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    return data;
}

export const logout = async () => {
    const { data } = await $authHost.post('/logout')
    return data;
}
