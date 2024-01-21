// context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the shape of your context data
interface AuthContextType {
  userName: string | null;
  isLoggedIn: boolean;
  logOut: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps your app and makes the auth object available to any child component that calls useAuth().

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  
  const [userName, setUserName] = useState<string | null>(null);
  
  // Dummy log in/out functionality
  const logOut = async () => {
    await fetch('http://localhost:3000/api/users/logout', { method: 'POST' });
    setUserName(null);
  };

  const value = {
    userName,
    isLoggedIn: !!userName,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
