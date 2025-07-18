import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import '../style.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        console.log(`Password reset link sent to ${email}`);
        alert('If your email is registered, a reset link has been sent.');

        navigate('/login');
    };

    return (
        <div className="signup-container">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleReset}>
                <input type="email" placeholder="Enter your registered email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <button type="submit">Send Reset Link</button>
                <button type="button" className="cancel" onClick={() => navigate('/login')}>Back to Login</button>
            </form>
        </div>
    );
}