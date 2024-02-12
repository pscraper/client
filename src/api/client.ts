import axios from "axios";


export const defaultClient = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 3000,
    headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json"
    },
    responseType: "json"
});


export const formClient = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 3000,
    headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
    },
    responseType: "json"
});