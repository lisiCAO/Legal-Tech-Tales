'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();
  const auth = useAuth();
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    auth?.login(credentials);
  };
  const [error, setError] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    if (name === 'password' && value.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-card">
      <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-card">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-foreground text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            className="shadow appearance-none border-custom rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-foreground text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            className="shadow appearance-none border-custom rounded w-full py-2 px-3 text-foreground mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-custom-button hover:bg-custom-button-hover text-button-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Login
          </button>
        </div>
        <div className="mt-4">
          <Link href="/register" className="inline-block align-baseline font-bold text-sm text-link hover:text-link-hover cursor-pointer">
              No account? Register here.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;