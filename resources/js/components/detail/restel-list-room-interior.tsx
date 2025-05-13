export function ListRoomInterior() {
  return (
    <>
      <div className="max-w-7xl mx-auto mt-10 h-64 relative overflow-hidden">
        {/* Scroll container with precise measurements */}
        <div className="h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex h-full items-center">
            {/* Left peek item (10% width) */}
            <div className="flex-shrink-0 w-[10%] h-full flex items-center justify-end pr-1">
              <div className="w-full h-5/6 bg-gray-200 rounded-lg flex items-center justify-center opacity-80">
                <span className="text-2xl font-bold text-gray-600">3</span>
              </div>
            </div>
            
            {/* Main item (80% width) */}
            <div className="flex-shrink-0 w-[80%] h-full px-2 snap-center">
              <div className="w-full h-full bg-blue-600 rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-5xl font-bold text-white">4</span>
              </div>
            </div>
            
            {/* Right peek item (10% width) */}
            <div className="flex-shrink-0 w-[10%] h-full flex items-center justify-start pl-1">
              <div className="w-full h-5/6 bg-gray-200 rounded-lg flex items-center justify-center opacity-80">
                <span className="text-2xl font-bold text-gray-600">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}