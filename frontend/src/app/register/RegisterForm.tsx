'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.name.trim() === '') {
      setError("Username cannot be empty.");
      return;
    }
    if (formData.name.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    setError(''); 
    try {
      const response = await fetch(`http://localhost:3000/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-cream">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <div className="bg-custom-orange text-white p-2 rounded mb-4">{error}</div>}
      <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Desired username
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Your email
          </label>
          <input
            name="email" 
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            name="password" 
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Password (repeat)
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-custom-pink hover:bg-custom-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
