import React from 'react';
import LoginForm from './LoginForm'; 

const Login = () => {
  return (
        <div className="container mx-auto px-4">
          <h1 className="text-center text-2xl font-bold my-6">User Login</h1>
          <LoginForm />
        </div>
  );
};

export default Login;
