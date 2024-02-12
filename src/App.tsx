import React, { useState, useReducer, useContext, useEffect, useRef, useCallback } from "react"
import { signin, signup } from "./api/user.api";



const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      <div>
        <input type="text" placeholder="ID" onChange={e => setEmail(e.target.value)}/> <br/>
        <input type="password" placeholder="PW" onChange={e => setPassword(e.target.value)}/> <br/>
        <button onClick={() => signup(email, password)}>
          회원가입
        </button>
      </div>

      <hr/>

      <div>
        <input type="text" ref={idRef} /> <br/>
        <input type="password" ref={pwRef} /> <br/>
        <button onClick={() => signin(idRef.current?.value, pwRef.current?.value)}>
          로그인
        </button>
      </div>
    </React.Fragment>
  )
}


export default App