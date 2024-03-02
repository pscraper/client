import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/user.api";
import { HttpStatusCode } from "axios";
import { UserResponse } from "../spec/spec";
import { userState } from "../store";


const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);    
    const pwRef = useRef<HTMLInputElement>(null);    
    const pwCheckRef = useRef<HTMLInputElement>(null);    
    const setUser = useSetRecoilState<UserResponse>(userState);
    const navigate = useNavigate();

    const onSignupBtnClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const pw = pwRef.current?.value;
        const pwCheck = pwCheckRef.current?.value;
        
        if (
            email == undefined || 
            email == "" ||
            pw == undefined || 
            pw == "" ||
            pwCheck == undefined || 
            pwCheck == ""
        ) {
            alert("빈 칸을 채워주세요");
            return;
        }
        
        if (pw != pwCheck) {
            alert("비밀번호를 확인해주세요");
            return;
        }

        const res = await signup(email, pw);

        if (res.status != HttpStatusCode.Created) {
            throw Error("서버 에러");
        }

        const user = res.data;
        setUser(user);
        console.log(user);
        navigate("/home");
    }

    return (
        <div>
            <input type="text" ref={emailRef} placeholder="Sign up Email" /> <br/>
            <input type="password" ref={pwRef} placeholder="Sign up Password" /> <br/>
            <input type="password" ref={pwCheckRef} placeholder="패스워드 확인" /> <br/>
            <button type="submit" onClick={e => onSignupBtnClick(e)}>Signup</button>
        </div>
    )
}


export default Signup;