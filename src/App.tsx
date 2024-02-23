import { useState, useEffect } from 'react';
import { signup, signin, signinBasic, getMyInfo, getUserInfo } from './api/user.api';
import { searchPatch } from './api/patch.api';
import './App.css';


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.clear();
    // sessionStorage.clear();
  }, []);
  
  const onSignupClick = async (email: string, password: string) => {
    const res = await signup(email, password);
    console.log(res);
  }

  const onSigninClick = async (email: string, password: string) => {
    const res = await signin(email, password);
    localStorage.setItem("token_type", res.token_type);
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("refresh_token", res.refresh_token);
    console.log(res);
  }

  const onSigninBasicClick = async (email: string, password: string) => {
    const res = await signinBasic(email, password);
    console.log(res);
  }

  const getUserInfoClick = async () => {
    const res = await getUserInfo();
    console.log(res); 
  }

  const getMyInfoClick = async () => {
    const res = await getMyInfo();
    console.log(res);
  }
  
  const onSearchPatch = async () => {
    const res = await searchPatch();
    console.log(res);
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/> 
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/> 
        <button onClick={() => onSigninBasicClick(email, password)}>로그인</button>
      </div>

      <button onClick={getUserInfoClick}>유저 정보</button>
      <button onClick={getMyInfoClick}>내 정보</button>
      <button onClick={onSearchPatch}>패치 검색</button>
    </div>
  )
}

export default App
