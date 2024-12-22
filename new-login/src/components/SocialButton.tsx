import React from 'react';
import { Facebook } from 'lucide-react';
import { colors } from '../constants/colors';

interface SocialButtonProps {
  provider: 'Google' | 'Facebook';
}

export default function SocialButton({ provider }: SocialButtonProps) {
  const icon = provider === 'Facebook' ? (
    <Facebook className="h-5 w-5 text-[#1877F2] group-hover:text-white" />
  ) : (
    <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
  );

  return (
    <button 
      type="button"
      className="group w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#e5e5e5] rounded-lg text-[#000000] hover:bg-[#000000] hover:text-white hover:border-[#000000] transition-all"
    >
      {icon}
      <span className="flex-1 text-center">Continue with {provider}</span>
    </button>
  );
}