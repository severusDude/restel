import { ChangeEvent } from 'react';

export interface InputProps {
  label: string;
  size: "md" | "sm";
  type: "text" | "email" | "password" | "number" | "date";
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  className?: string;
}

export function Input({ 
  label, 
  size, 
  type, 
  placeholder, 
  value,
  onChange,
  min,
  max,
  className,
  ...props 
}: InputProps) {
  const inputSize: Record<typeof size, string> = {
    sm: "w-full border border-gray-300 rounded-lg px-4 py-2 pl-9 focus:outline-none focus:ring-1 focus:ring-blue-500",
    md: "w-full border border-gray-300 rounded-lg px-4 py-2 pl-9 focus:outline-none focus:ring-1 focus:ring-blue-500"
  }
  
  // Choose the right icon based on input type
  const getIcon = () => {
    switch(type) {
      case 'date':
        return (
          <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        );
      case 'number':
        return (
          <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        );
      default:
        return (
          <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        );
    }
  };
  
  return (
    <div className="flex-1 relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input 
          type={type} 
          placeholder={placeholder} 
          className={`${inputSize[size]} ${className || ''}`}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          {...props}
        />
        {getIcon()}
      </div>
    </div>
  )
}