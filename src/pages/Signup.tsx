import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/user.api";
import { HttpStatusCode } from "axios";


const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);    
    const pwRef = useRef<HTMLInputElement>(null);    
    const pwCheckRef = useRef<HTMLInputElement>(null);    
    const fileRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<string>();
    const navigate = useNavigate();

    const handleFileupload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = await e.target.files[0];
        const file_string = URL.createObjectURL(file);
        setFile(file_string);
    }

    const handleSignupBtn = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const pw = pwRef.current?.value;
        const pwCheck = pwCheckRef.current?.value;
        const fileCheck = fileRef.current?.value;
        
        if (
            email == undefined || 
            email == "" ||
            pw == undefined || 
            pw == "" ||
            pwCheck == undefined || 
            pwCheck == "" ||
            fileCheck == undefined || 
            fileCheck == "" 
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

        navigate("/home");
    }

    return (
        <div className="signup-container">
            <input type="text" ref={emailRef} placeholder="Sign up Email" /> <br/>
            <input type="password" ref={pwRef} placeholder="Sign up Password" /> <br/>
            <input type="password" ref={pwCheckRef} placeholder="패스워드 확인" /> <br/>
            <input type="file" ref={fileRef} accept="image/*" onChange={e => handleFileupload(e)} />
            <button type="submit" onClick={e => handleSignupBtn(e)}>Signup</button>

            <img src={file} />
        </div>
    )
}


export default Signup;