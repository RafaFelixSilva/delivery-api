// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; 


export default function Home() {
    const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 text-white">
      <header className="mb-10">
        <h1 className="text-5xl font-bold mb-2">Welcome to DeliveryApp</h1>
        <p className="text-lg max-w-xl text-center opacity-90">
          Your one-stop solution for fast and reliable deliveries.
        </p>
      </header>

      <main className="w-full max-w-4xl bg-white bg-opacity-20 rounded-xl shadow-lg p-8">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Explore Our Features</h2>
          <ul className="list-disc list-inside space-y-2 text-white">
            <li>📦 Real-time order tracking</li>
            <li>🚀 Fast and secure delivery options</li>
            <li>📅 Easy scheduling and calendar integration</li>
            <li>💬 24/7 Customer support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
          <p className="mb-6">
            Sign up or log in to start managing your deliveries with ease.
          </p>
          <button onClick={() => navigate('/')} className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-100 transition">
            Go to Signup
          </button>
        </section>
      </main>

      <footer className="mt-12 text-sm opacity-70">
        &copy; 2025 DeliveryApp. All rights reserved.
      </footer>
    </div>
  );
}
