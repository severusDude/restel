import { useState, useEffect } from 'react';

interface ListRoomInteriorProps {
  images?: string[];
}

export function ListRoomInterior({ images = [] }: ListRoomInteriorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // If no images are provided, use these default placeholders
  const defaultImages = [
    "https://source.unsplash.com/random/1200x800/?hotel,room,1",
    "https://source.unsplash.com/random/1200x800/?hotel,room,2",
    "https://source.unsplash.com/random/1200x800/?hotel,room,3",
    "https://source.unsplash.com/random/1200x800/?hotel,room,4",
    "https://source.unsplash.com/random/1200x800/?hotel,room,5"
  ];

  const displayImages = images.length > 0 ? images : defaultImages;
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Calculate indices for the left, main, and right images
  const leftIndex = currentIndex === 0 ? displayImages.length - 1 : currentIndex - 1;
  const rightIndex = currentIndex === displayImages.length - 1 ? 0 : currentIndex + 1;

  return (
    <>
      <div className="max-w-7xl mx-auto mt-10 h-64 relative overflow-hidden">
        {/* Left arrow */}
        <button 
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Right arrow */}
        <button 
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Scroll container with precise measurements */}
        <div className="h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex h-full items-center">
            {/* Left peek item (10% width) */}
            <div className="flex-shrink-0 w-[10%] h-full flex items-center justify-end pr-1">
              <div className="w-full h-5/6 bg-gray-100 rounded-lg overflow-hidden relative">
                <img 
                  src={displayImages[leftIndex]} 
                  alt="Room interior" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
            
            {/* Main item (80% width) */}
            <div className="flex-shrink-0 w-[80%] h-full px-2 snap-center">
              <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={displayImages[currentIndex]} 
                  alt="Room interior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right peek item (10% width) */}
            <div className="flex-shrink-0 w-[10%] h-full flex items-center justify-start pl-1">
              <div className="w-full h-5/6 bg-gray-100 rounded-lg overflow-hidden relative">
                <img 
                  src={displayImages[rightIndex]} 
                  alt="Room interior" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Image indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {displayImages.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}