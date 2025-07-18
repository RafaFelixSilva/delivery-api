import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style.css';
import { Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        //validation
        if (!email || !password) {
            alert('Please, fill in all fields.');
            return;
        }

        console.log('Loggin in with: ', email, password);

        navigate('/home');
    };

    return (
        <div className="signup-container">
            <h2>Login</h2>
            <form>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" onClick={() => navigate('/profile')}>Log In</button>
                <button type="button" className="cancel" onClick={() => navigate('/signup')}>Create Account</button>
            </form>

            <div className="login-link">Forgot your password? <Link to="/forgot-password">Recover</Link></div>
        </div>
    )
}