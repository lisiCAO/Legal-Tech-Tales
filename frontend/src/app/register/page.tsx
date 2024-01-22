import React from 'react';
import RegisterForm from './../components/RegisterForm'; 
const Register = () => {
  return (
      <div className="container mx-auto px-4">
        <h1 className="text-center text-2xl font-bold my-6">New User Registration</h1>
        <RegisterForm />
      </div>
  );
};

export default Register;