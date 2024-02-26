import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signin, signinBasic } from "../api/user.api";


const LoginComponent = () => {
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (accessToken != null && refreshToken != null) {
            
        }

    }, []);

    // useRef: 제네릭 T, 인자 nullable -> RefObject<T>
    // - current가 readonly이지만 하위 current.value는 여전히 수정 가능  
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onLoginBtnClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const email = idRef.current?.value;
        const pw = pwRef.current?.value;
        
        if (email == "" || pw == "" || email == undefined || pw == undefined) {
            alert("ID 또는 PW를 입력해주세요.");
            return;
        }

        const res = await signinBasic(email, pw);
        const accessToken = res.headers['authorization'];
        const refreshToken = res.headers['authorization-refresh'];

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        navigate("/");
    }

    return (
        <div>
            <h2 className="text-blue-500 text-xl font-bold">Login</h2>
            <input type="text" placeholder="Input Your Email" ref={idRef} /> <br/>
            <input type="password" placeholder="Input Your Password" ref={pwRef} /> <br/>
            <button onClick={e => onLoginBtnClick(e)}>Submit</button>
        </div>
    )
}


export default LoginComponent;