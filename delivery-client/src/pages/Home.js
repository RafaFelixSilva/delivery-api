// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../style.css';
import { Link } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate(); 

  return (
    <div className="signup-container">
      <h2>Welcome to Delivery App</h2>

      <p style={{textAlign:'center', marginTop:'20px', color:'#333'}}>Your one-stop solution for fast and reliable deliveries.</p>

      <section>
        <h3 style={{fontSize:'18px', marginTop:'10px', color:'#333'}}>🚀 Features:</h3>
        <ul style={{paddingLeft:'20px', marginBottom:'20px', color:'#555'}}>
          <li>📦 Real-time order tracking</li>
          <li>🚀 Fast and secure delivery options</li>
          <li>📅 Easy scheduling and calendar integration</li>
          <li>💬 24/7 Customer support</li>
        </ul>
      </section>

      <button onClick={() => navigate('/signup')}>Create Account</button>
      <button className='cancel' onClick={() => navigate('/login')}>Log In</button>

      <div className='login-link'>
        Learn more <Link to='/about'>about our services</Link>
      </div>
    </div>
  );
}
