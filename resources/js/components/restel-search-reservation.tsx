import { Input } from "@/components/search-reservation-input";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

export function SearchReservation() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [capacity, setCapacity] = useState("1");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redirect to rooms search page with query parameters
    window.location.href = route('rooms.filter', {
      capacity: capacity !== "" ? parseInt(capacity) : 1,
      check_in: checkInDate,
      check_out: checkOutDate
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <form className="flex flex-wrap md:flex-nowrap" onSubmit={handleSearch}>
        <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-100">
          <Input 
            type="date"
            label="Tanggal Check-in"
            size="md"
            placeholder="dd/mm/yyyy"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-100">
          <Input 
            type="date"
            label="Tanggal Check-out"
            size="md"
            placeholder="dd/mm/yyyy"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/3 p-4">
          <Input 
            type="number"
            label="Jumlah Tamu"
            size="md"
            placeholder="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            min="1"
          />
        </div>

        <div className="w-full md:w-auto flex items-end p-4 md:pl-0">
          <button 
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-8 py-3 flex items-center justify-center transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Cari
          </button>
        </div>
      </form>
    </div>
  );
}