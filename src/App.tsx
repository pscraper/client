import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import { isValidSessionId } from './api/user.api';



const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId !== null) {
      isValidSessionId(sessionId)
        .then(res => {
          if (!res) localStorage.removeItem("session_id");
        })
        .catch(err => {
          console.error(err);
        })
    }

    navigate("/home");
  }, [])

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
