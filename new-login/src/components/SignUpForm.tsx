import React, { useState } from 'react';
import SocialButton from './SocialButton';
import Input from './Input';

interface FormData {
  email: string;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-2xl font-semibold text-center mb-6 text-[#000000]">
        Sign Up For Free
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email*"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#fdf567] text-black py-3 rounded-lg text-lg font-medium hover:bg-[#f0e955] transition-colors"
        >
          Get started
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e5e5e5]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-[#696969]">or continue with</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <SocialButton provider="Google" />
          <SocialButton provider="Facebook" />
        </div>

        <p className="text-sm text-center text-[#696969] mt-6">
          By clicking "Get started," you agree to our{' '}
          <a href="#" className="text-[#000000] hover:text-[#696969]">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-[#000000] hover:text-[#696969]">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}