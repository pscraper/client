import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signinBasic } from "../api/user.api";


const Login = () => {
    // useRef: 제네릭 T, 인자 nullable -> RefObject<T>
    // - current가 readonly이지만 하위 current.value는 여전히 수정 가능  
    const emailRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onLoginBtnClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const pw = pwRef.current?.value;
        
        if (email == "" || pw == "" || email == undefined || pw == undefined) {
            alert("ID 또는 PW를 입력해주세요.");
            return;
        }

        const res = await signinBasic(email, pw);
        const accessToken = res.headers['authorization'];
        const refreshToken = res.headers['authorization-refresh'];
        const sessionId = res.headers['authorization-session'];

        localStorage.setItem("session_id", sessionId);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("token_type", "Bearer");

        navigate("/");
    }

    const navigateSignup = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate("/signup")
    }

    return (
        <div>
            <h2 className="text-blue-500 text-xl font-bold">로그인이 필요한 서비스입니다</h2>
            <input type="text" placeholder="Input Your Email" ref={emailRef} /> <br/>
            <input type="password" placeholder="Input Your Password" ref={pwRef} /> <br/>
            <button onClick={e => onLoginBtnClick(e)}>Submit</button>
            <button onClick={e => navigateSignup(e)}>계정이 없으신가요?</button>
        </div>
    )
}


export default Login;