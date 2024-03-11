import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DashBoard from './pages/Dashboard';


const App = () => {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
