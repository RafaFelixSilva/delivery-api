import React from "react";
import { Link } from "react-router-dom";
import '../style.css';

export default function Profile() {
    // Fake user data
    const user = JSON.parse(localStorage.getItem('customer'));

    if (!user) {
        return (
            <div className="profile-container">
                <h2>No user data found</h2>
                <p>Please sign up or log in again.</p>
                <Link to="/signup" className="btn-primary">Go to Signup</Link>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <header>
                <h1>Your Profile</h1>
                <p className="subheading">Manage your account information</p>
            </header>

            <main>
                <div className="profile-card">
                    <div className="profile-item">
                        <span className="label">Name: </span>
                        <span>{user.name}</span>
                    </div>
                    <div className="profile-item"> 
                        <span className="label">Email: </span>
                        <span>{user.email}</span>
                    </div>
                    <div className="profile-item">
                        <span className="label">Phone: </span>
                        <span>{user.phone}</span>
                    </div>
                    <div className="profile-item">
                        <span className="label">Address: </span>
                        <span>{user.address}</span>
                    </div>
                    <div className="profile-item">
                        <span className="label">Joined: </span>
                        <span>{user.joined}</span>
                    </div>
                </div>

                 <div className="actions">
                        <Link to='/edit-profile' className="btn-primary">Edit Profile </Link>
                        <Link to='/home' className="btn-secondary">Back to Home</Link>
                    </div>
            </main>
        </div>
    );
}