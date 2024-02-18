import axios from "axios";
import { MediaType } from "../enums/enum";


const SERVER_ADDR = import.meta.env.VITE_SERVER_ADDR;
const TIMEOUT = 3000;


export const defaultClient = axios.create(
    {
        baseURL: SERVER_ADDR,
        timeout: TIMEOUT,
        headers: {
            "Content-Type": MediaType.APPLICATION_JSON,
            "Accept": MediaType.APPLICATION_JSON
        }
    }
);


export const formClient = axios.create(
    {
        baseURL: SERVER_ADDR,
        timeout: TIMEOUT,
        headers: {
            "Content-Type": MediaType.MULTIPART_FORMDATA,
            "Accept": MediaType.APPLICATION_JSON
        }
    }
);