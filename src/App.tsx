import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';


const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        setIsLogin(true);
        navigate("/");
      } else {
        setIsLogin(false);
        navigate("/login");
      }
  }, []);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
