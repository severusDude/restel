export function FilterCard() {
  return (
    <>
      <div className="flex-[5] bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 h-fit   top-4 filter-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">Filter</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Reset</button>
      </div>
      
      {/* Harga Per Malam Dropdown */}
      <div className="mb-4 border-b border-gray-100 pb-4">
        <button className="filter-dropdown flex justify-between items-center w-full text-left">
          <p className="text-sm font-medium text-gray-700">Harga Per Malam</p>
          <span className="text-gray-500 transform transition-transform">▼</span>
        </button>
        <div className="filter-content hidden mt-2 pl-2">
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="price1" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Rp 0 - Rp 500.000</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="price2" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Rp 500.000 - Rp 1.000.000</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="price3" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Rp 1.000.000 - Rp 2.000.000</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="price4" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Rp 2.000.000+</label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating Dropdown */}
      <div className="mb-4 border-b border-gray-100 pb-4">
        <button className="filter-dropdown flex justify-between items-center w-full text-left">
          <p className="text-sm font-medium text-gray-700">Rating</p>
          <span className="text-gray-500 transform transition-transform">▼</span>
        </button>
        <div className="filter-content hidden mt-2 pl-2">
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="rating5" className="mr-2 rounded text-blue-600" />
              <label className="flex items-center text-sm text-gray-600">
                <span className="text-yellow-400 mr-1">★★★★★</span> 5
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="rating4" className="mr-2 rounded text-blue-600" />
              <label className="flex items-center text-sm text-gray-600">
                <span className="text-yellow-400 mr-1">★★★★☆</span> 4+
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="rating3" className="mr-2 rounded text-blue-600" />
              <label className="flex items-center text-sm text-gray-600">
                <span className="text-yellow-400 mr-1">★★★☆☆</span> 3+
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lokasi Dropdown */}
      <div className="mb-4 border-b border-gray-100 pb-4">
        <button className="filter-dropdown flex justify-between items-center w-full text-left">
          <p className="text-sm font-medium text-gray-700">Lokasi</p>
          <span className="text-gray-500 transform transition-transform">▼</span>
        </button>
        <div className="filter-content hidden mt-2 pl-2">
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="location1" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Pusat Kota</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="location2" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Dekat Bandara</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="location3" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Dekat Pantai</label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fasilitas Dropdown */}
      <div className="mb-2">
        <button className="filter-dropdown flex justify-between items-center w-full text-left">
          <p className="text-sm font-medium text-gray-700">Fasilitas</p>
          <span className="text-gray-500 transform transition-transform">▼</span>
        </button>
        <div className="filter-content hidden mt-2 pl-2">
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="facility1" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">WiFi Gratis</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="facility2" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Kolam Renang</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="facility3" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Sarapan</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="facility4" className="mr-2 rounded text-blue-600" />
              <label className="text-sm text-gray-600">Parkir Gratis</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}