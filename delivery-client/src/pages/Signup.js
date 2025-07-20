import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style.css';
import '../media-query.css';

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/customer', {
                name: formData.name,
                contact: formData.phone,
                email: formData.email,
                password: formData.password
            });

            const customerId = response.data?.id;
            if (customerId) {
                localStorage.setItem('customerId', customerId);
                alert("Account created successfully.");
                navigate('/profile');
            } else {
                alert("Signup succeeded but no ID was returned.");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Failed to create account. Please try again.");
        }
    };

    return (
        <div className='signup-container'>
            <h2>Create Your Account</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Full Name' value={formData.name} onChange={handleChange} required />
                <input type='email' name='email' placeholder='Email Address' value={formData.email} onChange={handleChange} required />
                <input type='tel' name='phone' placeholder='Phone Number' value={formData.phone} onChange={handleChange} required />
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
                <input type='password' name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required />

                <button type='submit'>Sign Up</button>
                <button type='button' className='cancel' onClick={() => navigate('/home')}>Cancel</button>

                <div className='login-link'>
                    Already have an account? <a href='/login'>Log In</a>
                </div>
            </form>
        </div>
    );
}
