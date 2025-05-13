import { Input } from "@/components/search-reservation-input";

export function SearchReservation() {
  return (
    <>
      <div className="absolute -bottom-14 left-0 right-0 mx-auto w-[70%] bg-white shadow-xl rounded-xl px-6 py-4 flex flex-col md:flex-row gap-4 border border-gray-100">
        <Input
          type="text"
          label="Kota Tujuan"
          size="md"
          placeholder="Misal: Jakarta, Bali"
        />
        
        <Input 
          type="date"
          label="Tanggal Menginap"
          size="md"
          placeholder="13 Mei 2025"
        />
        
        <Input 
          type="text"
          label="Jumlah Kamar"
          size="md"
          placeholder="1 Kamar"
        />

      <button className="px-6 self-end bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 transition-colors duration-200 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        Cari
      </button>
    </div>
    </>
  )
}