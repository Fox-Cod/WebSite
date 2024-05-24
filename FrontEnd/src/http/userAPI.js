import { $authHost, $host } from "./index";

export const registration = async (userData) => {
    const { data } = await $host.post('api/user/registration', userData)
    return data
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
