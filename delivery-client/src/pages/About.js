import React from "react";
import { Link } from "react-router-dom";
import '../style.css';

export default function About() {
    return (
        <div className="about-container">
            <header>
                <h1>About Our Services</h1>
                <p className="subheading">Learn more about what we offer</p>
            </header>

            <main>
                <section className="service-section">
                    <h2>🚚 Fast Deliveries</h2>
                    <p>We prioritize speed and efficiency, ensuring your packages arrive on time, every time.</p>
                </section>

                <section className="service-section">
                    <h2>🔒 Secure Packaging</h2>
                    <p>All times are handled with care packed securely to avoid damage in transit.</p>
                </section>

                <section className="service-section">
                    <h2>📍 Real-Time Tracking</h2>
                    <p>Stay updated with live tracking features that keep you informed about your delivery status.</p>
                </section>

                <section className="service-section">
                    <h2>📞 24/7 Support</h2>
                    <p>Our customer support is always available to help with any questions or issues.</p>
                </section>

                <div className="back-home">
                    <Link to='/home' className="btn-primary">Back to Home</Link>
                </div>
            </main>
        </div>
    );
}