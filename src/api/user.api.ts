import { authClient as client, basicClient } from "./client";
import { AxiosResponse, HttpStatusCode } from "axios";
import { UserResponse, TokenResponse } from "../spec/spec";




type SignupType = (email: string, password: string) => Promise<AxiosResponse<UserResponse>>
type SigninBasicType = (email: string, password: string) => Promise<AxiosResponse<Boolean>>
type GetUserBySessionType = (sessionId: string) => Promise<AxiosResponse<UserResponse>>
type SignoutType = (sessionId: string) => Promise<AxiosResponse<void>>
type IsValidSessionIdType = (sessionId: string) => Promise<AxiosResponse<boolean>>


export const signup: SignupType = async (email, password) => {
    const body = { email, password }
    const res = await client.post("/user/signup", body)
    if (res.status !== HttpStatusCode.Created) throw Error("[signup] 요청 실패");
    return Promise.resolve(res);
}


export const signinBasic: SigninBasicType = async (email, password) => {
    const credentials = btoa(`${email}:${password}`)
    const headers = { "Authorization": `Basic ${credentials}` };
    const res = await basicClient.post("/user/signin/basic", undefined, {headers})
    if (res.status != HttpStatusCode.Ok) throw Error("");
    return Promise.resolve(res);
}


export const getUserBySessionId: GetUserBySessionType = async (sessionId) => {
    const res = await client.get(`/user/info/${sessionId}`);
    if (res.status == HttpStatusCode.NotFound) return Promise.reject();
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