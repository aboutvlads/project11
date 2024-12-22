import React from 'react';
import { Eye } from 'lucide-react';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
}

export default function Input({ type, placeholder, value, onChange, name, required }: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-[#000000] placeholder-[#696969] focus:ring-2 focus:ring-[#000000] focus:border-transparent outline-none transition-all"
      />
      {type === 'password' && (
        <Eye className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#696969] cursor-pointer" />
      )}
    </div>
  );
}
