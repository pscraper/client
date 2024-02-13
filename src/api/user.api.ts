import { defaultClient, formClient } from "./client";
import { HttpStatusCode } from "axios";
import { User } from "../spec/spec";



export const getAllUsers: () => Promise<User[]> = async () => {
    const res = await defaultClient.get("/user/");
    if (res.status !== HttpStatusCode.Ok) {
        throw Error("[getAllUsers] 요청 실패");
    }
    
    return Promise.resolve((res.data as User[]));
}


export const signup: (email: string, password: string) => Promise<User> = async (email, password) => {
    const res = await defaultClient.post("/user/", 
        {
            "email": email,
            "password": password
        }, 
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    )

    if (res.status !== HttpStatusCode.Created) {
        throw Error("[signup] 요청 실패");
    }

    return Promise.resolve((res.data as User));
}


export const deleteUser = (id: number) => {
    return defaultClient.delete(`/user/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    );
}


export const getCookie = () => {
    return defaultClient.post("/cookie");
}