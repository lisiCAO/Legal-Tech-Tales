
import React from 'react';
import RegisterForm from './../components/RegisterForm'; 
import Layout from './../layout'; 


const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-center text-2xl font-bold my-6">New User Registration</h1>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;