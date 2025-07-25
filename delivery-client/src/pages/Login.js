import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../style.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please, fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });

            const customer = response.data;

            if (customer && customer.id) {
                localStorage.setItem('customer', JSON.stringify(customer));
                alert('Login successful.');
                navigate('/profile');
            } else {
                alert('Invalid credentials or missing user ID.');
            }

        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                console.error("Backend response data:", error.response.data);
                alert(error.response.data.message || "Invalid email or password.");
            } else {
                alert("Network or server error.");
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Log In</button>
                <button type="button" className="cancel" onClick={() => navigate('/signup')}>Create Account</button>
            </form>

            <div className="login-link">
                Forgot your password? <Link to="/forgot-password">Recover</Link>
            </div>
        </div>
    );
}
