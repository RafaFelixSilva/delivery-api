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

    const [loading, setLoading] = useState(false);       // controla estado do botão
    const [error, setError] = useState('');              // mensagem de erro

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setError(''); // limpa erro ao digitar
    };

    const validateEmail = (email) => {
        // Regex simples para validar email (melhor que nada)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação simples
        if (!formData.name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!formData.phone.trim()) {
            setError("Please enter your phone number.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/customer', {
                name: formData.name,
                contact: formData.phone,
                email: formData.email,
                password: formData.password
            });

            const customer = response.data;

            if (customer?.id) {
                localStorage.setItem('customer', JSON.stringify(customer));
                alert("Account created successfully.");
                navigate('/profile');
            } else {
                setError("Signup succeeded but unexpected response format.");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            // Se backend devolver erro com mensagem, exiba
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='signup-container'>
            <h2>Create Your Account</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <input type='text' name='name' placeholder='Full Name' value={formData.name} onChange={handleChange} required />
                <input type='email' name='email' placeholder='Email Address' value={formData.email} onChange={handleChange} required />
                <input type='tel' name='phone' placeholder='Phone Number' value={formData.phone} onChange={handleChange} required />
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
                <input type='password' name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required />

                <button type='submit' disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>
                <button type='button' className='cancel' onClick={() => navigate('/home')} disabled={loading}>Cancel</button>

                <div className='login-link'>
                    Already have an account? <a href='/login'>Log In</a>
                </div>
            </form>
        </div>
    );
}
