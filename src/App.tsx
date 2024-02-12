import React, { useState, useReducer, useContext, useEffect, useRef, useCallback } from "react"
import { signin, signup, getAllUser, deleteUser } from "./api/user.api";


interface User {
  user_id: number,
  user_email: string,
  user_password: string
}


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const signUp = (email: string, password: string) => {
    signup(email, password)
      ?.then(res => {
        if (res.status == 200) {
          localStorage.setItem('user_id', res.data['user_id']);
          localStorage.setItem('user_email', res.data['user_email']);
          localStorage.setItem('user_password', res.data['user_password']);
        }
        
        const user = res.data;
        setUsers([...users, { user_id: user.user_id, user_email: user.user_email, user_password: user.user_password}])
      })
  };

  const deleteSpecificUser = (email: string, password: string) => {
    deleteUser(email, password)
      ?.then(res => {
        if (res.status !== 200) {
          throw Error("");
        }

        const deleted = res.data;
        const remains = users.filter(user => user.user_id !== deleted.user_id);
        setUsers(remains);
      })
      .catch(err => {
        console.log(err);
        return;
      })
  }

  useEffect(() => {
    getAllUser()
    .then(res => {
      if (res.status == 200) {
        setUsers(res.data);
      }
    })
    .catch(err => {
      console.log(err);
      const user_email = localStorage.getItem("user_email");
      const user_password = localStorage.getItem("user_password");
      
      if (user_email !== null && user_password !== null) {
        return signin(user_email, user_password);
      }
    })
  }, []);

  return (
    <React.Fragment>
      <div>
        <input type="text" placeholder="ID" onChange={e => setEmail(e.target.value)}/> <br/>
        <input type="password" placeholder="PW" onChange={e => setPassword(e.target.value)}/> <br/>
        <button onClick={() => signUp(email, password)}>
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

      <div>
        <ul>
          {users && users.map(user => {
            return (
              <li key={user.user_id}>
                <p>User ID: {user.user_id}</p>
                <p>User Email: {user.user_email}</p>
                <p>User Password: {user.user_password}</p>
                <button onClick={() => deleteSpecificUser(user.user_email, user.user_password)}>삭제</button>
              </li>
            )
          })}
        </ul>
      </div>
    </React.Fragment>
  )
}


export default App