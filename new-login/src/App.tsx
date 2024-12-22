import React from 'react';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <img
          src="https://cdn.prod.website-files.com/675c4bb1a6111f64bc92535b/675c4ff2a1636ad4ee500785_Untitled%20design%20(1).svg"
          alt="Logo"
          className="h-8 mb-8 mx-auto"
        />
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;