import { defaultClient, formClient } from "./client";
import { HttpStatusCode } from "axios";
import { UserResponse, TokenResponse } from "../spec/spec";


type SignupType = (email: string, password: string) => Promise<UserResponse>
type SigninType = (email: string, password: string) => Promise<TokenResponse>
type GetUserInfoType = () => Promise<UserResponse>


export const signup: SignupType = async (email, password) => {
    const body = { email, password }
    const res = await defaultClient.post("/user/signup", body)

    if (res.status !== HttpStatusCode.Created) {
        throw Error("[signup] 요청 실패");
    }

    return Promise.resolve((res.data as UserResponse));
}


export const signin: SigninType = async (email, password) => {
    const body = { "username": email, "password": password };
    const res = await formClient.post("/user/signin", body);
    
    if (res.status !== HttpStatusCode.Ok) {
        throw Error("[signin] 요청 실패");
    }

    return Promise.resolve((res.data as TokenResponse));
}


export const getUserInfo: GetUserInfoType = async () => {
    const tokenType = localStorage.getItem("token_type");
    const accessToken = localStorage.getItem("access_token");

    if (tokenType == null || accessToken == null) {
        throw Error("[getUserInfo] 요청 실패");
    }

    const headers = { "Authorization": `${tokenType} ${accessToken}` };
    const res = await defaultClient.get("/user/", { headers });
    
    if (res.status !== HttpStatusCode.Ok) {
        throw Error("[getUserInfo] 요청 실패");
    }

    return Promise.resolve((res.data));
}