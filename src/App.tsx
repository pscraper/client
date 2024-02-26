import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginComponent from './components/Login';
import TestComponent from './components/Test';
import HomeComponent from './components/Home';


const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </div>
  )
}

export default App
