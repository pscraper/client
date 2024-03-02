import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from './store';
import { UserResponse } from './spec/spec';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';


const App = () => {
  const navigate = useNavigate();
  const [user, _] = useRecoilState(userState);

  useEffect(() => {
    console.log(user);
    user.id == -1 ? navigate("/login") : navigate("/home");
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
