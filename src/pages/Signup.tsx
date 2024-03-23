import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/user.api";


const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const pwCheckRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSignupBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const pw = pwRef.current?.value;
        const pwCheck = pwCheckRef.current?.value;

        if (!email || !pw || !pwCheck || pw !== pwCheck) {
            alert("입력 정보 확인");
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", pw);
        const result = await signup(formData)
        
        if (result.status == 201) navigate("/login");
        else if (result.status == 409) alert("중복된 이메일");
    }


    return (
        <form>
            <input type="email" ref={emailRef} placeholder="Email" />
            <input type="password" ref={pwRef} placeholder="Password" />
            <input type="password" ref={pwCheckRef} placeholder="Password Check" />
            <button type="submit" onClick={e => handleSignupBtnClick(e)}>Signup</button>
        </form>
    )
}


export default Signup;