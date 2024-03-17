import React, { useRef } from "react";
import { signinBasic } from "../api/user.api";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleLoginBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            alert("로그인 정보를 입력해주세요");
            return;
        }

        signinBasic(email, password)
        .then(res => {
            if (res) {
                const accessToken = res.headers['authorization'];
                const refreshToken = res.headers['authorization-refresh'];
                const timeInfo = res.data.last_login_date.toString().split("T");
                const lastDate = timeInfo[0] + " " + timeInfo[1].split(".")[0];
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
                localStorage.setItem("email", email);
                localStorage.setItem("last_login", lastDate);
                navigate("/");
            }
        })
        .catch(_ => {
            alert("일치하지 않는 ID/PW");
        })
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-dvh">
            <h1 className="text-25 text-black font-semibold">로그인이 필요한 서비스입니다</h1>

            <form className="border border-gray-100 mt-50">
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input ref={emailRef} type="text" className="grow pl-5" placeholder="Email" />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input ref={passwordRef} type="password" className="grow pl-5" placeholder="password" />
                </label>

                <button className="btn" onClick={e => handleLoginBtnClick(e)}>
                    Login
                </button>
            </form>

            <div>
                <Link to="/signup">계정이 없으신가요?</Link>
            </div>
        </div>
    )
}


export default Login;