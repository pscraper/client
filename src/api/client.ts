import axios from "axios";


const SERVER_ADDR = import.meta.env.VITE_SERVER_ADDR;
const TIMEOUT = 3000;
const APPLICATION_JSON = "application/json";
const FORM_URL_ENCODED = "x-www-form-urlencoded";


export const defaultClient = axios.create(
    {
        baseURL: SERVER_ADDR,
        timeout: TIMEOUT,
        headers: {
            "Content-Type": APPLICATION_JSON,
            "Accept": APPLICATION_JSON
        }
    }
);


export const formClient = axios.create(
    {
        baseURL: SERVER_ADDR,
        timeout: TIMEOUT,
        headers: {
            "Content-Type": FORM_URL_ENCODED,
            "Accept": APPLICATION_JSON
        }
    }
);