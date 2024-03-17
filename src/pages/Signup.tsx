import React, { useRef } from "react";
import { signup } from "../api/user.api";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const pwCheckRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSignupBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!emailRef || !pwRef || !pwCheckRef) {
            alert("입력 정보 확인");
            return;
        }

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

        signup(formData)
        .then(_ => {
            navigate("/login");
        })
        .catch(err => {
            alert(err);
            return;
        })
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