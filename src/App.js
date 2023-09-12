import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';

function App() {
  // const user = localStorage.getItem("token");
  return (
    <Routes>
      <Route path= "/login" exact element={ <Login /> } />
      <Route path= "/" exact element={ <Navigate replace to="/login" /> } />
      <Route path= "/home" exact element={ <Home /> } />
    </Routes>
  );
}

export default App;
