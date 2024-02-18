import { useState, useEffect } from 'react';
import { signup, signin, getUserInfo } from './api/user.api';
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
  }

  const getUserInfoClick = async () => {
    const res = await getUserInfo();
    console.log(res); 
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/> 
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/> 
        <button onClick={() => onSignupClick(email, password)}>회원가입</button>
      </div>

      <div>
        <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/> 
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/> 
        <button onClick={() => onSigninClick(email, password)}>로그인</button>
      </div>

      <button onClick={getUserInfoClick}>유저 정보</button>
    </div>
  )
}

export default App
