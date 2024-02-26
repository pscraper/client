import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/user.api";


const LoginComponent = () => {
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

        const res = await signin(email, pw);

        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("token_type", res.token_type);
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