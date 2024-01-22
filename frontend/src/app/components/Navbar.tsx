'use client'
// components/NavBar.tsx
import React from 'react';
import Link from 'next/link';
import { useAuth } from './../context/AuthContext';

const NavBar: React.FC = () => {
  const auth = useAuth();

  return (
    <nav className="bg-custom-nav text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/articles" className="text-xl font-bold">My Blog
        </Link>
        <div>
          {auth?.isLoggedIn ? (
            <>
              <span>You are logged in as {auth.userName}.</span>
              <button
                onClick={auth.logOut}
                className="text-white bg-red-500 hover:bg-red-700 ml-4 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
