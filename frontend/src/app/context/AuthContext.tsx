'use client'
// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Define the shape of your context data
interface AuthContextType {
  userName: string | null;
  isLoggedIn: boolean;
  logOut: () => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps your app and makes the auth object available to any child component that calls useAuth().

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const getMe = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 确保请求包含 cookies
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null; // 或者返回一个错误信息
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const token = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!token.ok) {
        throw new Error(`Error: ${token.status}`);
      }
      setisLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getMe();
        if (userData) {
          setUserName(userData.name || null);

        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // 可以在这里处理错误，比如设置为未登录状态
      }
    };
    fetchUserData();
  }, [isLoggedIn]); // 如果不依赖于外部状态，这里可以是空数组
  

  // Dummy log in/out functionality
  const logOut = async () => {
    await fetch('http://localhost:3000/api/users/logout', { method: 'POST', credentials: 'include' });
    setUserName(null);
  };

  const value = {
    userName,
    isLoggedIn,
    login,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
