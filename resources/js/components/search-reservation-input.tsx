interface InputProps {
  label: string;
  size: "md" | "sm";
  type: "text" | "email" | "password" | "number" | "date";
  placeholder: string;
}

export function Input({ label, size, type, placeholder }: InputProps) {
  const inputSize: Record<typeof size, string> = {
    sm: "w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500",
    md: "w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
  }
  
  return (
    <>
      <div className="flex-1 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <div className="relative">
            <input type={type} placeholder={placeholder} className={inputSize[size]} />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
        </div>
    </>
  )
}