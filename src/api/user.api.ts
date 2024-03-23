import { authClient as client, basicClient } from "./client";
import { Axios, AxiosResponse, HttpStatusCode } from "axios";
import { User, UserResponse } from "../spec/spec";
import { UserRole } from "../enums/enum";






type SignupType = (form: FormData) => Promise<AxiosResponse<void>>
type SignoutType = (sessionId: string) => Promise<AxiosResponse<void>>
type IsValidSessionIdType = (sessionId: string) => Promise<AxiosResponse<boolean>>


export const signup: SignupType = async (form) => {
    const res = await client.post("/user/signup", form, { headers: { 'Content-Type': 'multipart/form-data' }})
    return Promise.resolve(res);
}


interface SigninBasic {
    email: string
    profile_image: string
    role: UserRole
    last_login_date: Date
}

type SigninBasicType = (email: string, password: string) => Promise<AxiosResponse<SigninBasic>>

export const signinBasic: SigninBasicType = async (email, password) => {
    const credentials = btoa(`${email}:${password}`)
    const headers = { "Authorization": `Basic ${credentials}` };
    const res = await basicClient.post<SigninBasic>("/user/signin/basic", undefined, {headers})
    if (res.status === HttpStatusCode.Unauthorized) return Promise.reject();
    return Promise.resolve(res);
}


export const getUserByToken: () => Promise<AxiosResponse<User>> = async () => {
    const res = await client.get("/user/info");
    if (res.status == HttpStatusCode.Unauthorized) return Promise.reject();
    return Promise.resolve(res);
}


export const signout: SignoutType = async (sessionId) => {
    const res = await client.get(`/user/signout/${sessionId}`);
    return Promise.resolve(res);
}


export const isValidSessionId: IsValidSessionIdType = async (sessionId) => {
    const res = await client.get(`/user/valid/${sessionId}`);
    return Promise.resolve(res);
}


export const refreshTokens: (refreshToken: string) => Promise<AxiosResponse<number>> = async (refreshToken) => {
    const res = await client.get("/user/refresh", { headers: { 'Authorization-Refresh': refreshToken }});
    if (res.status == HttpStatusCode.Ok) return Promise.resolve(res);
    return Promise.reject();
}