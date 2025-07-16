import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({fullname: '', email: '', phone: '', password: '', confirm: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirm) {
            alert("Passwords do not match.");
            return;
        }

        const res = await fetch('http://localhost:3000/customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: form.fullname,
                contact: form.phone,
                active: true,
                email: form.email,
                password: form.password
            })
        });

        if (res.ok) {
            alert("Account created!");
            navigate('/home');
        } else {
            alert("Failed to create account.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <input name="confirm" type="password" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} required />
            <button type="submit">Sign Up</button>
        </form>
    );
}