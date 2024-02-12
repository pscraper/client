import axios from "axios";
import { defaultClient, formClient } from "./client";



export const signup = (id: string, pw: string) => {
    if (id.length <= 5 || pw.length <= 5) {
        window.alert("id는 5글자보다 길어야합니다.");
        return null;
    }

    defaultClient.post("/user/signup", 
        {
            "user_email": id,
            "user_password": pw
        })
        .then(res => {
            console.log(res);

            if (res.status == 200) {
                sessionStorage.setItem('user_email', id);
                sessionStorage.setItem('user_password', pw);
            }
        })
        .catch(err => {
            console.log(err);
        })
}



export const signin = (id: string | undefined, pw: string | undefined) => {
    if (id === undefined || pw === undefined) {
        window.alert("id 또는 pw를 입력해주세요");
        return null;
    }

    if (id.length <= 5 || pw.length <= 5) {
        window.alert("id는 5글자보다 길어야합니다.");
        return null;
    }

    formClient.post("/user/signin", 
        {
            "username": id,
            "password": pw,
        })
        .then(res => {
            console.log(res.data);
            sessionStorage.setItem('access_token', res.data['access_token']);
            sessionStorage.setItem('token_type', res.data['token_type']);
        })
        .catch(err => {
            console.log(err);
        })
}