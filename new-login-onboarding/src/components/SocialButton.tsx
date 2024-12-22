import React from 'react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function SocialButton({ icon, children, className = '', ...props }: SocialButtonProps) {
  return (
    <button
      className={`
        w-full px-6 py-3 rounded-xl
        border-2 border-[#E5E5E5] 
        flex items-center justify-center gap-3
        text-[#1B1B1B] font-medium
        hover:border-[#1B1B1B] transition-colors
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}