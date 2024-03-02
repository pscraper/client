import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from './store';
import { getUserBySessionId } from './api/user.api';
import Home from './pages/Home';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';



const App = () => {
  const navigate = useNavigate();
  const [_, setUser] = useRecoilState(userState);

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId === null) navigate("/login");
    else {
      getUserBySessionId(sessionId)
      .then(res => {
        if (res.status == 200) {
          setUser(res.data);
          navigate("/home");
        }
      })
      .catch(_ => {
        console.log("세션 만료");
        navigate("/login");
      })
    }
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
