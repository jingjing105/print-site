import React from 'react';
import Navbar from './Navbar'; 
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'; // Import the login page
import ForgotPassword from './ForgotPassword'; 
import SignUp from './SignUp'
import './App.css';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/signup" element={<SignUp />}/>
    </Routes>
</Router>
  );
}

export default App;
