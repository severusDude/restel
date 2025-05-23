import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Room } from '@/types';
import { AppShell } from '@/Components/app-shell';

interface Props extends PageProps {
  rooms: Room[];
  filters: {
    min_price?: number;
    max_price?: number;
    capacity?: number;
    type?: string;
    location?: string;
  };
}

export default function SearchResults({ auth, rooms, filters }: Props) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.min_price || 0,
    filters.max_price || 5000000
  ]);
  const [capacity, setCapacity] = useState<number>(filters.capacity || 1);
  const [roomType, setRoomType] = useState<string>(filters.type || '');
  const [location, setLocation] = useState<string>(filters.location || '');
  
  // Formatted price display
  const [minPriceDisplay, setMinPriceDisplay] = useState<string>(`Rp ${(filters.min_price || 0).toLocaleString()}`);
  const [maxPriceDisplay, setMaxPriceDisplay] = useState<string>(`Rp ${(filters.max_price || 5000000).toLocaleString()}`);

  // Update formatted price when price range changes
  useEffect(() => {
    setMinPriceDisplay(`Rp ${priceRange[0].toLocaleString()}`);
    setMaxPriceDisplay(`Rp ${priceRange[1].toLocaleString()}`);
  }, [priceRange]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = route('rooms.filter', {
      min_price: priceRange[0],
      max_price: priceRange[1],
      capacity: capacity,
      type: roomType,
      location: location
    });
  };

  return (
    <AppShell>
      <Head title="Hasil Pencarian" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-2">
          <Link
            href={route('rooms.index')}
            className="inline-flex items-center mr-4 text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Kembali ke Daftar</span>
          </Link>
          <h1 className="text-3xl font-bold">Hasil Pencarian</h1>
        </div>
        <p className="text-gray-600 mb-6">Ditemukan {rooms.length} kamar sesuai kriteria Anda</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Filter Kamar</h2>
              
              <form onSubmit={handleFilter}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Rentang Harga (per malam)
                  </label>
                  
                  <div className="px-2 mb-2">
                    <label className="text-xs text-gray-600 block mb-1">Harga Minimal: {minPriceDisplay}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000000"
                      step="100000"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value < priceRange[1]) {
                          setPriceRange([value, priceRange[1]]);
                        }
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    
                    <label className="text-xs text-gray-600 block mt-3 mb-1">Harga Maksimal: {maxPriceDisplay}</label>
                    <input
                      type="range"
                      min="0"
                      max="5000000"
                      step="100000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > priceRange[0]) {
                          setPriceRange([priceRange[0], value]);
                        }
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">{minPriceDisplay}</span>
                    <span className="text-sm text-gray-600">{maxPriceDisplay}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Kapasitas (minimum)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Tipe Kamar
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Semua Tipe</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Family">Family</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Lokasi Kamar
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Masukkan lokasi kamar"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                >
                  Perbarui Hasil
                </button>
              </form>
              
              <div className="mt-4 pt-4 border-t">
                <Link
                  href={route('rooms.index')}
                  className="w-full block text-center py-2 text-blue-500 hover:underline"
                >
                  Hapus Semua Filter
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {rooms.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-500 mb-4">Tidak ada kamar yang tersedia sesuai kriteria Anda.</p>
                <Link
                  href={route('rooms.index')}
                  className="text-blue-500 hover:underline"
                >
                  Lihat Semua Kamar
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          className="h-full w-full object-cover"
                          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                          alt={room.name}
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{room.name}</h3>
                            <p className="text-gray-600 mb-2">{room.location}</p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {room.type}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-4 line-clamp-2">{room.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.facilities && room.facilities.slice(0, 3).map((facility) => (
                            <span 
                              key={facility.id}
                              className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                            >
                              {facility.name}
                            </span>
                          ))}
                          {room.facilities && room.facilities.length > 3 && (
                            <span className="text-gray-500 text-xs">
                              +{room.facilities.length - 3} lainnya
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div>
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                              </svg>
                              <span className="text-gray-600 text-sm">{room.capacity} tamu</span>
                            </div>
                            <span className="text-xl font-bold text-blue-600 mt-1 block">Rp {room.price.toLocaleString()}<span className="text-sm text-gray-500 font-normal"> / malam</span></span>
                          </div>
                          
                          <Link
                            href={route('rooms.show', room.slug)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Lihat Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
} 