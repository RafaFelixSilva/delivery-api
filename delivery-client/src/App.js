
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} /> 
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/about' element={<About />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/edit-profile' element={<EditProfile />} />
            </Routes>    
        </Router>
    );
}

export default App;