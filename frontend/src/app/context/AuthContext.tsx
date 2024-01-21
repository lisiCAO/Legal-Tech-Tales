'use client'
// context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
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
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const currentUser = await getMe(); // 等待 getMe 函数响应
        if (currentUser && currentUser.name) {
          setUserName(currentUser.name); // 使用返回的数据中的 name 属性
          router.push('/articles');
        } else {
          throw new Error('Failed to fetch user data');
        }
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  
  // Dummy log in/out functionality
  const logOut = async () => {
    await fetch('http://localhost:3000/api/users/logout', { method: 'POST' });
    setUserName(null);
  };

  const value = {
    userName,
    isLoggedIn: !!userName,
    login,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
