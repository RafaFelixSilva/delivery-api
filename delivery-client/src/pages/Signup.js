import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import '../media-query.css';

export default function Signup() {
    const navigate = useNavigate();
// parei aqui
    const handleChange = (e) => {
        e.preventDefault();
        alert("Account created successfully.")
    };

    return (
        <div className='signup-container'>
            <h2>Create Your Account</h2>
            <form>
                <input type='text' name='fullname' placeholder='Full Name' required />
                <input type='email' name='email' placeholder='Email Address' required />
                <input type='tel' name='phone' placeholder='Phone Number' required />
                <input type='password' name='password' placeholder='Password' required />
                <input type='password' name='confirm_password' placeholder='Confirm password' required />

                <button type='submit' onClick={() => navigate('/profile')}>Sign Up</button>
                <button type='button' className='cancel' onClick={() => navigate('/home')}>Cancel</button>

                <div className='login-link'>
                    Already have an account? <a href='/login'>Log In</a>
                </div>
            </form>
        </div>
    );
}