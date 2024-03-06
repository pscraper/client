import axios, { HttpStatusCode } from "axios";
import { MediaType } from "../enums/enum";
import { useNavigate } from "react-router-dom";
import { refreshTokens } from "./user.api";


const SERVER_ADDR = import.meta.env.VITE_SERVER_ADDR;
const TIMEOUT = import.meta.env.VITE_REQUEST_TIMEOUT;

 
const createAuthClient = () => {
    const TOKEN_TYPE = localStorage.getItem("token_type");
    const ACCESS_TOKEN = localStorage.getItem("access_token");
    const REFRESH_TOKEN = localStorage.getItem("refresh_token");

    const axiosInstance = axios.create({
        // withCredentials: true,
        baseURL: SERVER_ADDR,
        timeout: TIMEOUT,
        headers: {
            "Content-Type": MediaType.APPLICATION_JSON,
            "Accept": MediaType.APPLICATION_JSON
        }},
    );

    axiosInstance.interceptors.request.use(
        (req) => {
            if (!TOKEN_TYPE || !ACCESS_TOKEN) {
                return req;
            }
            req.headers['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
            
        return req;
    });

    axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
            const statusCode = err.statusCode;
            if (statusCode === HttpStatusCode.Unauthorized && REFRESH_TOKEN) {
                refreshTokens(REFRESH_TOKEN)
                .then(res => {
                    console.log("update tokens");
                    localStorage.setItem("access_token", res.headers['Authorization']);
                    localStorage.setItem("refresh_token", res.headers['Authorization-Refresh']);
                    localStorage.setItem("token_type", res.headers['Token-Type']);
                })
                .catch(err => {
                    localStorage.clear();
                    window.location.href = "/login";
                })
            }
        }
    )

    return axiosInstance;
}


export const authClient = createAuthClient();


export const formClient = axios.create({
    // withCredentials: true,
    baseURL: SERVER_ADDR,
    timeout: TIMEOUT,
    headers: {
        "Content-Type": MediaType.MULTIPART_FORMDATA,
        "Accept": MediaType.APPLICATION_JSON
    }}
);


export const basicClient = axios.create({
    baseURL: SERVER_ADDR,
    timeout: TIMEOUT,
    headers: {
        "Content-Type": MediaType.MULTIPART_FORMDATA,
        "Accept": MediaType.APPLICATION_JSON
    }
})