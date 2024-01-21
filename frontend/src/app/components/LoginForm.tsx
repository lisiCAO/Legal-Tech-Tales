
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './../context/AuthContext';
import Link from 'next/link';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();
  const auth = useAuth();
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    auth?.login(credentials);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
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
            value={credentials.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
        <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
            <Link  href={"/register"}>
                No account? Register here.
            </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
