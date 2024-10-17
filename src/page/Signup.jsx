import React from 'react';
import SignupSignIn from '../compentents/SignupSignIn/SignupSignIn';
import Header from '../compentents/header/Header';

const Signup = () => {
  return (
    <>
     <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}

      {/* Signup form container */}
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg mt-6">
        <SignupSignIn />
      </div>
    </div>
    </>
  );
}

export default Signup;
