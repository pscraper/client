import { defaultClient, formClient } from "./client";
import { AxiosResponse, HttpStatusCode } from "axios";
import { UserResponse, TokenResponse } from "../spec/spec";


type SignupType = (email: string, password: string) => Promise<AxiosResponse<UserResponse>>
type SigninType = (email: string, password: string) => Promise<AxiosResponse<TokenResponse>>
type SigninBasicType = (email: string, password: string) => Promise<AxiosResponse<Boolean>>
type GetUserBySessionType = (sessionId: string) => Promise<AxiosResponse<UserResponse>>
type SignoutType = (sessionId: string) => Promise<AxiosResponse<void>>
type IsValidSessionIdType = (sessionId: string) => Promise<AxiosResponse<boolean>>


export const signup: SignupType = async (email, password) => {
    const body = { email, password }
    const res = await defaultClient.post("/user/signup", body)
    if (res.status !== HttpStatusCode.Created) throw Error("[signup] 요청 실패");
    return Promise.resolve(res);
}


export const signin: SigninType = async (email, password) => {
    const body = { "username": email, "password": password };
    const res = await formClient.post("/user/signin/oauth2", body, { withCredentials: true });
    if (res.status !== HttpStatusCode.Ok) throw Error("[signin] 요청 실패");
    return Promise.resolve(res);
}


export const signinBasic: SigninBasicType = async (email, password) => {
    const credentials = btoa(`${email}:${password}`)
    const headers = { "Authorization": `Basic ${credentials}` };
    const res = await defaultClient.post("/user/signin/basic", undefined, {headers})
    if (res.status != HttpStatusCode.Ok) throw Error("");
    return Promise.resolve(res);
}


export const getUserBySessionId: GetUserBySessionType = async (sessionId) => {
    const res = await defaultClient.get(`/user/info/${sessionId}`);
    if (res.status == HttpStatusCode.NotFound) return Promise.reject();
    return Promise.resolve(res);
}


export const signout: SignoutType = async (sessionId) => {
    const res = await defaultClient.get(`/user/signout/${sessionId}`);
    return Promise.resolve(res);
}


export const isValidSessionId: IsValidSessionIdType = async (sessionId) => {
    const res = await defaultClient.get(`/user/valid/${sessionId}`);
    return Promise.resolve(res);
}