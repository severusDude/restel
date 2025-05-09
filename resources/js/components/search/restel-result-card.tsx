import React from 'react';
import { Input } from '@/components/search-reservation-input';

export function ResultCard() {
  return (
    <>
      {/* Results Section  */}
      <div className="flex-[7] overflow-y-auto">
        {/* Search Summary */}
          <div className="bg-white rounded-x  l shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 search-inputs">
              <Input 
                type="text"
                label="Kota Tujuan"
                size="sm"
                placeholder="Misal: Jakarta, Bali"
              />

              <Input 
                    type="date"
                    label="Tanggal Menginap"
                    size="sm"
                    placeholder="13 Mei 2025"
              />

              <Input 
                    type="text"
                    label="Jumlah Kamar"
                    size="sm"
                    placeholder="1 Kamar"
              />

              <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-[42px] self-end flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span className="ml-2 md:hidden">Cari</span>
          </button>
            </div>
          </div>
          
          <div className="pb-6">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-0">124 Kamar ditemukan</h2>
            <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
              <select className="block w-full sm:w-auto appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base">
                <option>Sort: Popular</option>
                <option>Harga Terendah</option>
                <option>Harga Tertinggi</option>
                <option>Rating Tertinggi</option>
              </select>
            </div>
          </div>
        
        <hr className="my-3 md:my-4 border-gray-200" />
        
        {/* Hotel Card */}
        <div className="rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 mb-6 hotel-card">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/3 bg-gray-200 h-48 md:h-auto flex items-center justify-center hotel-image">
              <span className="text-gray-500">Image</span>
            </div>
            
            {/* Content */}
            <div className="md:w-2/3 p-4 md:p-5 hotel-content">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">Hotel Grand Tasikmalaya</h3>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="flex text-yellow-400 text-sm mr-2">
                      ★★★★☆
                    </div>
                    <span className="text-xs md:text-sm text-gray-500">4.2 (128 reviews)</span>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">BEST DEAL</div>
              </div>
              
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis adipisci fuga eius repudiandae sit iure ipsa laborum, facere architecto vel reiciendis laudantium fugit totam quasi excepturi dolore illum repellat.</p>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
                <div>
                  <span className="text-xs md:text-sm text-gray-500 block">Mulai dari</span>
                  <span className="text-lg md:text-xl font-bold text-blue-600">Rp 750.000</span>
                  <span className="text-xs md:text-sm text-gray-500">/malam</span>
                </div>
                <button className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </>
  )
}