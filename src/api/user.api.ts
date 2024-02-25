import { defaultClient, formClient } from "./client";
import { HttpStatusCode } from "axios";
import { User, UserResponse, TokenResponse } from "../spec/spec";
import { Cookies } from "react-cookie";


type SignupType = (email: string, password: string) => Promise<UserResponse>
type SigninType = (email: string, password: string) => Promise<TokenResponse>
type SigninBasicType = (email: string, password: string) => Promise<User>
type GetUserInfoType = () => Promise<UserResponse>

const cookies = new Cookies();


export const signup: SignupType = async (email, password) => {
    const body = { email, password }
    const res = await defaultClient.post("/user/signup", body)

    if (res.status !== HttpStatusCode.Created) throw Error("[signup] 요청 실패");
    return Promise.resolve(res.data);
}


export const signin: SigninType = async (email, password) => {
    const body = { "username": email, "password": password };
    const res = await formClient.post("/user/signin/oauth2", body);
    
    if (res.status !== HttpStatusCode.Ok) throw Error("[signin] 요청 실패");
    return Promise.resolve(res.data);
}


export const signinBasic: SigninBasicType = async (email, password) => {
    const credentials = btoa(`${email}:${password}`)
    const headers = { "Authorization": `Basic ${credentials}` };
    const res = await defaultClient.post("user/signin/basic", undefined, {headers})
    
    if (res.status != HttpStatusCode.Ok) throw Error("");
    return Promise.resolve(res.data);
}


export const getUserInfo: GetUserInfoType = async () => {
    const tokenType = localStorage.getItem("token_type");
    const accessToken = localStorage.getItem("access_token");
    if (tokenType == null || accessToken == null) throw Error("[getUserInfo] 요청 실패");
    
    const headers = { "Authorization": `${tokenType} ${accessToken}` };
    const res = await defaultClient.get("/user/", {headers});
    if (res.status !== HttpStatusCode.Ok) throw Error("[getUserInfo] 요청 실패");
    return Promise.resolve(res.data);
}


export const getMyInfo = async () => {
    const session_id = cookies.get("JSESSIONID");
    console.log(session_id);
    const headers = { session_id };
    const res = await defaultClient.get("/user/basic/me", {headers});
    return Promise.resolve(res.data);
}


export const polling = async () => {
    const res = await defaultClient.get("/patch/count");
    if (res.status !== HttpStatusCode.Ok) throw Error("");
    return Promise.resolve(res.data);
}