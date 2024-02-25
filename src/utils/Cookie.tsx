import { Cookies } from "react-cookie";
import { CookieGetOptions, CookieSetOptions } from "universal-cookie";


const cookies = new Cookies();


export const setCookie = (name: string, value: Cookies, options?: CookieSetOptions) => {
    try {
        cookies.set(name, value, { ...options });
    } catch (err) {
        console.error(err);
    }
}


export const getCookie = (name: string, options?: CookieGetOptions) => {
    try {
        return cookies.get(name, { ...options });
    } catch (err) {
        console.error(err);
    }
}


export const removeCookie = (name: string, options?: CookieSetOptions) => {
    try {
        cookies.remove(name, { ...options });
    } catch (err) {
        console.error(err);
    }
}